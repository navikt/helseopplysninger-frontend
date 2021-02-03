import {IQuestionnaire_AnswerOption, IQuestionnaireResponse_Item} from "@ahryman40k/ts-fhir-types/lib/R4";

export const responseItemToString = (
    responseItem: IQuestionnaireResponse_Item,
): string => {
    return responseItem.answer?.map(answer => answer.valueString).join("") || "";
}

export const responseItemToBoolean = (
    responseItem: IQuestionnaireResponse_Item,
): boolean => {
    if (responseItem.answer && responseItem.answer.length > 0) {
        return responseItem.answer[0].valueBoolean || false;
    } else {
        return false;
    }
}


export const stringAnswer = (
    responseItem: IQuestionnaireResponse_Item,
    answer: string
): IQuestionnaireResponse_Item => {
    responseItem.answer = [{valueString: answer}]
    return responseItem;
}

export const optionDisplayValue = (option: IQuestionnaire_AnswerOption): string => {
    if (typeof option.valueString === "string") {
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
}

export const isSelected = (
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
}
