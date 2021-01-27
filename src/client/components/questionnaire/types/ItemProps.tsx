import {IQuestionnaire_Item, IQuestionnaireResponse_Item} from "@ahryman40k/ts-fhir-types/lib/R4";

/**
 * Må legge med det orginale itemet fra Questionnaire slik at man kan støtte alternativer.
 * Må bruke ResponseItem
 *
 */
export interface ItemProps {
    questionnaireItem: IQuestionnaire_Item;
    responseItem: IQuestionnaireResponse_Item;
    setResponseItem: (responseItem: IQuestionnaireResponse_Item) => void;
}
