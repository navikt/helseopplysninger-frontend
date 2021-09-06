import {
  IdentifierUseKind,
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { setUUIDIdentifier } from './setIdentifier';

test('it should not change the identifier', () => {
  const questionnaireResponse: IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    id: '',
    identifier: {
      use: IdentifierUseKind._official,
      value: '123e4567-e89b-12d3-a456-426614174000',
    },
    status: QuestionnaireResponseStatusKind._inProgress,
    questionnaire: 'Questionnaire/1339713',
    subject: {
      id: '',
      reference: '',
      type: 'Patient',
    },
    authored: '2021-07-19',
    author: {
      id: '',
      reference: '',
      type: 'Practitioner',
    },
  };
  setUUIDIdentifier(questionnaireResponse);
  expect(questionnaireResponse.identifier?.value).toBe(
    '123e4567-e89b-12d3-a456-426614174000'
  );
});
