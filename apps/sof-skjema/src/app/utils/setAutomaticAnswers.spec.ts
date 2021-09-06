import {
  HumanNameUseKind,
  IPatient,
  IQuestionnaireResponse,
  PractitionerGenderKind,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { setSource, setSubject } from './setAutomaticAnswers';
import { fhirclient } from 'fhirclient/lib/types';

const questionnaireResponse: IQuestionnaireResponse = {
  resourceType: 'QuestionnaireResponse',
  id: '',
  status: QuestionnaireResponseStatusKind._inProgress,
  questionnaire: 'Questionnaire/1339713',
  subject: {
    id: '',
    reference: '',
    type: 'Patient',
  },
  authored: '2021-07-19',
  source: {
    id: '',
    reference: '',
    type: 'Practitioner',
  },
};

const patient: IPatient = {
  resourceType: 'Patient',
  id: 'be54c000-e7e4-4f1b-9be8-2f5b13d91fb5',
  name: [
    {
      use: HumanNameUseKind._official,
      family: 'Kshlerin',
      given: ['Danae'],
      prefix: ['Mrs.'],
    },
    {
      use: HumanNameUseKind._maiden,
      family: 'Graham',
      given: ['Danae'],
      prefix: ['Mrs.'],
    },
  ],
};

const practitioner: fhirclient.FHIR.Practitioner = {
  resourceType: 'Practitioner',
  id: 'be54c000-e7e4-4f1b-9be8-2f5b13d91fb5',
  active: true,
  name: [
    {
      use: HumanNameUseKind._official,
      text: 'Mats Johannes Våge',
      family: 'Våge',
      given: ['Mats Johannes'],
    },
    {
      use: HumanNameUseKind._usual,
      given: ['Mats', 'Johannes'],
    },
  ],
  gender: PractitionerGenderKind._male,
  birthDate: '1976-04-09',
};

test('it should set the subject reference to a patient', () => {
  setSubject(questionnaireResponse, patient);
  expect(questionnaireResponse.subject?.reference).toBe(
    'Patient/be54c000-e7e4-4f1b-9be8-2f5b13d91fb5'
  );
});

test('it should set the source reference to a practitioner', () => {
  setSource(questionnaireResponse, practitioner);
  expect(questionnaireResponse.source?.reference).toBe(
    'Practitioner/be54c000-e7e4-4f1b-9be8-2f5b13d91fb5'
  );
});
