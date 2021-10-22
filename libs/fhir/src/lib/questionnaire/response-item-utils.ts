import {
  IQuestionnaire_AnswerOption,
  IQuestionnaire_Item,
  IQuestionnaireResponse_Item,
  Questionnaire_ItemTypeKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { v4 as uuidv4 } from 'uuid';

export const questionnaireResponseItemToString = (
  responseItem: IQuestionnaireResponse_Item
): string => {
  return responseItem.answer?.map((answer) => answer.valueString).join('') || '';
};

export const questionnaireResponseItemToBoolean = (
  responseItem: IQuestionnaireResponse_Item
): boolean => {
  if (responseItem.answer && responseItem.answer.length > 0) {
    return responseItem.answer[0].valueBoolean || false;
  } else {
    return false;
  }
};

export const questionnaireResponseItemStringAnswer = (
  responseItem: IQuestionnaireResponse_Item,
  answer: string
): IQuestionnaireResponse_Item => {
  responseItem.answer = [{ valueString: answer }];
  return responseItem;
};

export const questionnaireAnswerOptionDisplayValue = (
  option: IQuestionnaire_AnswerOption
): string => {
  if (typeof option.valueString === 'string') {
    return option.valueString;
  } else if (option.valueCoding) {
    if (option.valueCoding.display) {
      return option.valueCoding.display;
    } else if (option.valueCoding.code) {
      return option.valueCoding.code;
    } else {
      return JSON.stringify(option.valueCoding);
    }
  } else {
    return JSON.stringify(option);
  }
};

export const questionnaireAnswerOptionisSelected = (
  option: IQuestionnaire_AnswerOption,
  responseItem: IQuestionnaireResponse_Item
): boolean => {
  if (responseItem.answer && responseItem.answer === [option]) {
    return true;
  } else if (!responseItem.answer && option.initialSelected) {
    return true;
  } else {
    return false;
  }
};
/**
 * Recursively creates response items.
 * @param questionnaireItem
 */
export const createQuestionnaireResponseItem = (
  questionnaireItem: IQuestionnaire_Item
): IQuestionnaireResponse_Item => {
  const { linkId, text, definition } = questionnaireItem;
  const responseItem: IQuestionnaireResponse_Item = {
    id: uuidv4(),
    linkId,
    text,
    definition,
  };
  if (questionnaireItem.type === Questionnaire_ItemTypeKind._group) {
    responseItem.item = [];
    (questionnaireItem.item || []).forEach((item) => {
      responseItem.item?.push(createQuestionnaireResponseItem(item));
    });
  } else {
    responseItem.answer = [];
  }
  return responseItem;
};
