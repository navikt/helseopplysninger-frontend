import {
  IPatient,
  IPractitioner,
  IQuestionnaire,
  IQuestionnaireResponse,
  IRelatedPerson,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { setAutomaticAnswers } from './setAutomaticAnswers';
import Client from 'fhirclient/lib/Client';
import { saveToServer } from './saveToServer';
import { sendToServer } from './sendToServer';

/**
 * Function to set a an answer in a questionnaire response, if the
 * answer is a string.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
export const setValueString = (item: any, value: string) => {
  item.answer[0].valueString = value;
};

/**
 * Function to set an answer in a questionnaire respose, if the
 * answer should be a date. Can also handle several answers.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
export const setValueDate = (item: any, value: string) => {
  let listOfDates: string[] = [];
  if (value) {
    // if value is not empty, start with an empty list:
    item.answer = [];

    if (value[0] === '[') {
      // If item is a string representing a list of dates,
      // the string must be parsed:
      listOfDates = JSON.parse(value);
    } else {
      // if it is just one date, make a list with the date
      // so that we can iterate trough it later
      listOfDates = [value];
    }

    for (let i: number = 0; i < listOfDates.length; i++) {
      // check that the date is on the form YYYY-MM-DD, and push the date to the answer-list
      if (
        /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2]))(-(0[1-9]|[1-2][0-9]|3[0-1]))/.test(
          listOfDates[i]
        )
      ) {
        item.answer.push({ valueDate: listOfDates[i] });
      } else {
        throw new Error(
          'The value is either non existent or it is not on the right format. The format should be YYYY-MM-DD'
        );
      }
    }
  } else {
    item.answer = [{ valueDate: '' }]; // reset dates if no date is given
  }
};

/**
 * Function to set a an answer in a questionnaire response, if the
 * answer is a boolean.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
export const setValueBoolean = (item: any, value: boolean) => {
  item.answer[0].valueBoolean = value;
};

/**
 * Function to set a an answer in a questionnaire response, if the
 * answer is an integer.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
export const setValueInteger = (item: any, value: string) => {
  const intValue = typeof value === 'string' ? parseInt(value) : value;
  item.answer[0].valueInteger = intValue;
};

/**
 * Function to save answers in a json file.
 * @param answers a map of answers on the form [linkId: value]
 * @param questionnaireResponse is the json file with the template of the response
 */
export const saveAnswers = async (
  answers: Map<string, string | boolean>,
  questionnaireResponse: IQuestionnaireResponse,
  patient: IPatient,
  user: IPatient | IPractitioner | IRelatedPerson,
  client: Client,
  questionnaire: IQuestionnaire,
  buttonId: string
) => {
  answers.forEach((value, key) => {
    //Get the correct object from questionnaireResponse.item:
    const item = questionnaireResponse.item?.find((e: any) => e.linkId === key)
      ? questionnaireResponse.item.find((e: any) => e.linkId === key)
      : null;

    // Set the correct answer in the object
    if (item && item.answer && item.answer[0] && typeof value === 'string') {
      'valueString' in item.answer[0]
        ? setValueString(item, value)
        : 'valueDate' in item.answer[0]
        ? setValueDate(item, value)
        : 'valueInteger' in item.answer[0]
        ? setValueInteger(item, value)
        : null;
    } else if (item && item.answer && typeof value === 'boolean') {
      'valueBoolean' in item.answer[0] ? setValueBoolean(item, value) : null;
    }
  });
  setAutomaticAnswers(questionnaireResponse, patient, user);

  // Checks which button is clicked on, and saves or sends based on the information
  if (buttonId.includes('save')) {
    saveToServer(questionnaireResponse, client, patient, questionnaire);
    console.log('saving...');
  } else if (buttonId.includes('send')) {
    console.log('sending...');
    sendToServer(client, patient, questionnaireResponse);
  } else console.log('Something went wrong...');
  return questionnaireResponse;
};
