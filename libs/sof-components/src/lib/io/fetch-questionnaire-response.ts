import Client from 'fhirclient/lib/Client';
import {
  IBundle,
  IPatient,
  IPractitioner,
  IQuestionnaire,
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import queryString from 'querystring';
import { QuestionnaireResponse } from '../../../../fhir/src/lib/QuestionnaireResponse';
import { createFhirCanonical, createFhirReference } from '@navikt/fhir';
import { headers } from './common';

/**
 * Function to get answers allready saved to the server and
 * update the answers-map based on this.
 * @param client client connected to the FHIR-server
 * @param patient The patient we are currently on in the EHR
 * @param practitioner
 * @param questionnaire
 */
export const fetchQuestionnaireResponse = async (
  client: Client,
  patient: IPatient,
  practitioner: IPractitioner,
  questionnaire: IQuestionnaire
) => {
  const searchParams = queryString.stringify({
    subject: createFhirCanonical(patient),
    questionnaire: questionnaire.url,
    status: QuestionnaireResponseStatusKind._inProgress,
  });
  const response = (await client.request({
    url: `QuestionnaireResponse?${searchParams}`,
    method: 'GET',
    headers,
  })) as IBundle;
  if (response.total !== 0 && response.entry && response.entry[0].resource) {
    return response.entry[0].resource as IQuestionnaireResponse;
  } else {
    const patientRef = createFhirReference(patient);
    const practitionerRef = createFhirReference(practitioner);
    const qr = new QuestionnaireResponse(
      questionnaire,
      { resourceType: 'QuestionnaireResponse' },
      patientRef,
      practitionerRef
    );
    return (await client.request({
      url: `QuestionnaireResponse`,
      method: 'POST',
      body: JSON.stringify(qr.getResponse()),
      headers,
    })) as IQuestionnaireResponse;
  }
};
