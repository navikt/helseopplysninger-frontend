import { pullBundleSendQuestionnaire } from './pull-bundle-send-questionnaire';
import { JWT } from 'jose';
import { mockKafkaProducer, nockFhirResource, testFhirQuestionnaire } from '@navikt/hops-testutils';
import { QuestionnaireResponseStatusKind } from '@ahryman40k/ts-fhir-types/lib/R4';
import { randomUUID } from 'crypto';
import { createFhirCanonical } from '@navikt/fhir';
import * as nock from 'nock';

test('it should pull bundle and send questionnaire', async () => {
  const authHeader = 'Bearer ' + JWT.sign({}, 'abc123');
  const resourceId = randomUUID();
  let { questionnaire, questionnaireResponse } = testFhirQuestionnaire(resourceId);
  questionnaireResponse.status = QuestionnaireResponseStatusKind._inProgress;

  nockFhirResource(questionnaire);
  nockFhirResource(questionnaireResponse);
  const kafkaSendFunc = jest.fn();
  const resource = await pullBundleSendQuestionnaire({
    serverUrl: new URL(process.env.FHIR_SERVER_ADDRESS),
    reference: createFhirCanonical(questionnaireResponse),
    authHeader: authHeader,
    kafkaTopic: process.env.KAFKA_TOPIC_BESTILLING,
    kafkaProducer: mockKafkaProducer(kafkaSendFunc),
  });

  expect(resource.resourceType).toBe('QuestionnaireResponse');
  expect(kafkaSendFunc).toHaveBeenCalled();
});
