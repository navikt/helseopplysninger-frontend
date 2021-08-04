/**
 * 1. validate request.
 * 2. pull resources.
 * 3. validate resources.
 * 4. bundle resources.
 * 5. send bundle on kafka.
 */
import { pullQuestionnaire, pullQuestionnaireResponse } from '../utils/pull-questionnaire-response';
import { validateFhirCanonical, validateQuestionnaireResponse } from '@navikt/fhir';
import {
  IOperationOutcome,
  OperationOutcome_IssueCodeKind,
  OperationOutcome_IssueSeverityKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { validatePullResourceRequest } from '@navikt/sof-common';
import bundleResources from '../fhir/bundle-resources';
import { Producer } from 'kafkajs';
import { logger } from '@navikt/hops-common';
import { finishQuestionnaireResponse } from '../fhir/finish-questionnaire-response';

type Options = {
  serverUrl: URL;
  reference: string;
  authHeader: string;
  kafkaTopic: string;
  kafkaProducer: Producer;
};

async function pullBundleSendQuestionnaire(options: Options) {
  const { serverUrl, reference, authHeader, kafkaTopic, kafkaProducer } = options;
  const operationOutcome: IOperationOutcome = {
    resourceType: 'OperationOutcome',
    issue: [],
  };
  try {
    /**
     * First validate the incomming resources
     */
    validatePullResourceRequest(serverUrl, authHeader).forEach((errorMessage) => {
      operationOutcome.issue.push({
        severity: OperationOutcome_IssueSeverityKind._error,
        code: OperationOutcome_IssueCodeKind._invariant,
        diagnostics: errorMessage,
      });
    });
    validateFhirCanonical(reference).forEach((errorMessage) => {
      operationOutcome.issue.push({
        severity: OperationOutcome_IssueSeverityKind._error,
        code: OperationOutcome_IssueCodeKind._invariant,
        diagnostics: errorMessage,
      });
    });

    if (operationOutcome.issue.length === 0) {
      // No errors yet, trying to make the request
      const questionnaireResponse = await pullQuestionnaireResponse(
        serverUrl,
        reference,
        authHeader
      );

      validateQuestionnaireResponse(questionnaireResponse).forEach((errorMessage) => {
        operationOutcome.issue.push({
          severity: OperationOutcome_IssueSeverityKind._error,
          code: OperationOutcome_IssueCodeKind._invariant,
          diagnostics: errorMessage,
        });
      });
      validateFhirCanonical(questionnaireResponse.questionnaire).forEach((errorMessage) => {
        operationOutcome.issue.push({
          severity: OperationOutcome_IssueSeverityKind._error,
          code: OperationOutcome_IssueCodeKind._invariant,
          diagnostics: errorMessage,
        });
      });
      if (operationOutcome.issue.length === 0) {
        const questionnaire = await pullQuestionnaire(serverUrl, reference, authHeader);
        /**
         * Adding correlation id to QuestionnaireResponse
         */
        const questionnaireResponseRefined = finishQuestionnaireResponse(questionnaireResponse);
        const messageBundle = bundleResources([questionnaire, questionnaireResponseRefined]);
        await kafkaProducer.connect();
        const metadata = await kafkaProducer.send({
          topic: kafkaTopic,
          messages: [
            {
              key: messageBundle.id,
              value: JSON.stringify(messageBundle),
            },
          ],
        });
        await kafkaProducer.disconnect();
        logger.debug('KafkaMetadata', metadata);
        return questionnaireResponseRefined;
      }
    }
  } catch (e) {
    operationOutcome.issue.push({
      severity: OperationOutcome_IssueSeverityKind._fatal,
      code: OperationOutcome_IssueCodeKind._exception,
      diagnostics: e.message,
    });
    logger.error(e);
  }
  return operationOutcome;
}

export { pullBundleSendQuestionnaire };
