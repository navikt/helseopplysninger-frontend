import { fhirclient } from 'fhirclient/lib/types';
import {
  IPatient,
  IPractitioner,
  IQuestionnaireResponse,
  IRelatedPerson,
} from '@ahryman40k/ts-fhir-types/lib/R4';

/**
 * Function to set the answers that should be atomatically fetched from the
 * sesrver, instead of being typed in by the user.
 * @param response the json response template to fill out
 * @param patient the patient that the doctor is currently logged in to in the EHR
 * @param user the user of the EHR, typically a doctor
 */
export const setAutomaticAnswers = (
  response: IQuestionnaireResponse,
  patient: IPatient,
  user: IPatient | IPractitioner | IRelatedPerson
) => {
  setSubject(response, patient);
  setSource(response, user);
};

/**
 *
 * @param response Function to set the subject (typically patient) in
 * the json template.
 * @param patient the patient we are logged in at in the EHR
 */
export const setSubject = (response: IQuestionnaireResponse, patient: IPatient) => {
  response.subject ? (response.subject.reference = `Patient/${patient.id}`) : null;
};

/**
 * Function to set the source (typically Practitioner) in the json template
 * @param item an object from the item array
 * @param user the user of the EHR, typically a doctor
 */
export const setSource = (
  response: IQuestionnaireResponse,
  user: IPatient | IPractitioner | IRelatedPerson
) => {
  response.source ? (response.source.reference = `Practitioner/${user.id}`) : null;
};
