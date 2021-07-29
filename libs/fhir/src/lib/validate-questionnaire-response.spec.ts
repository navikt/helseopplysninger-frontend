import {
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { validateQuestionnaireResponse } from './validate-questionnaire-response';
import {
  createFhirPatientReference,
  createFhirPractitionerReference,
} from './fhir';

test('it should validate the questionnair response with errors', async () => {
  const resource: IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
  };
  const results = validateQuestionnaireResponse(resource);
  expect(results.length).toBeGreaterThan(1);
});
test('it should validate the questionnair response with no errors', async () => {
  const resource: IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    questionnaire: 'Questionnaire/questionnaire-123',
    status: QuestionnaireResponseStatusKind._inProgress,
    subject: createFhirPatientReference('123', 'Pelle Pasient'),
    source: createFhirPractitionerReference('123', 'Frode Fastlege'),
  };
  const results = validateQuestionnaireResponse(resource);
  expect(results.length).toBe(0);
});
