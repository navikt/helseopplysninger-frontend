import {
  IEncounter,
  IPatient,
  IPractitioner,
  IQuestionnaire,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import * as Encounter from '../fixtures/Encounter.json';
import * as Patient from '../fixtures/Patient.json';
import * as Practitioner from '../fixtures/Practitioner.json';
import * as Questionnaire1 from '../fixtures/questionnaires/med-perioder.json';
import * as Questionnaire2 from '../fixtures/questionnaires/legeerklæring.json';
import * as TestBrukerInfo from '../fixtures/bestiller/brukerinfo.json';

export const fixtures = {
  TestBrukerInfo: TestBrukerInfo,
  Encounter: Encounter as IEncounter,
  Patient: Patient as IPatient,
  Practitioner: Practitioner as IPractitioner,
  Questionnaire: [Questionnaire1 as IQuestionnaire, Questionnaire2 as IQuestionnaire],
};
