import { fetchQuestionnaire } from './fetch-questionnaire';

import * as env from 'env-var';
import { createFhirQuestionnaire } from '@navikt/fhir';
import Client from 'fhirclient/lib/Client';
import {
  IBundle,
  IPatient,
  IPractitioner,
  QuestionnaireStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import queryString from 'querystring';
import { fetchQuestionnaireResponse } from './fetch-questionnaire-response';
import { headers } from './common';
import { fhirclient } from 'fhirclient/lib/types';
import Resource = fhirclient.FHIR.Resource;

const serverUrl = env.get('FHIR_SERVER_ADDRESS').required().asUrlString();
// @ts-ignore
const client: Client = new Client({ fhir: undefined }, { serverUrl });
const questionnaireUrl = 'http://fhir.nav.no/canonical/Questionnaire/test-test-test';
const patient: IPatient = {
  resourceType: 'Patient',
  id: 'test-patient-1',
};
const practitioner: IPractitioner = {
  resourceType: 'Practitioner',
  id: 'test-practitioner-1',
};
beforeAll(async () => {
  const questionnaireSearchString = queryString.stringify({
    url: questionnaireUrl,
  });
  const responseSearchString = queryString.stringify({
    questionnaire: questionnaireUrl,
  });
  const resourcesToCleanUp = await Promise.all([
    client.request({
      url: `Questionnaire?${questionnaireSearchString}`,
      method: 'GET',
      headers,
    }),
    client.request({
      url: `QuestionnaireResponse?${responseSearchString}`,
      method: 'GET',
      headers,
    }),
  ]);
  const deletes: Promise<void>[] = [];
  resourcesToCleanUp.forEach((searchResult: IBundle) => {
    searchResult.entry?.forEach((entry) => {
      if (entry.resource?.resourceType && entry.resource?.id) {
        deletes.push(client.delete([entry.resource.resourceType, entry.resource.id].join('/')));
      }
    });
  });
  await Promise.all(deletes);
  console.log('Cleaned up ', deletes.length, ' entries.');
});

it('should fetch Questionnaire', async () => {
  const questionnaire = createFhirQuestionnaire(questionnaireUrl, []);
  questionnaire.status = QuestionnaireStatusKind._active;
  const newQuestionnaire = await fetchQuestionnaire(client, questionnaire);
  expect(newQuestionnaire.resourceType).toBe('Questionnaire');
  expect(newQuestionnaire.meta?.versionId).toBe('1');

  const oldQuestionnaire = await fetchQuestionnaire(client, questionnaire);
  expect(oldQuestionnaire.id).toBe(newQuestionnaire.id);
  expect(oldQuestionnaire.meta?.versionId).toBe('1');
});

it('should fetch QuestionnaireResponse', async () => {
  const questionnaire = createFhirQuestionnaire(questionnaireUrl, []);
  questionnaire.status = QuestionnaireStatusKind._active;

  const [newQuestionnaire] = await Promise.all([
    fetchQuestionnaire(client, questionnaire),
    client.update(patient as Resource),
    client.update(practitioner as Resource),
  ]);
  const qr1 = await fetchQuestionnaireResponse(client, patient, practitioner, newQuestionnaire);
  expect(qr1.resourceType).toBe('QuestionnaireResponse');
  expect(qr1.meta?.versionId).toBe('1');
  const qr2 = await fetchQuestionnaireResponse(client, patient, practitioner, newQuestionnaire);
  expect(qr2.resourceType).toBe('QuestionnaireResponse');
  expect(qr2.meta?.versionId).toBe('1');

  expect(qr1.id).toBe(qr2.id);
});
