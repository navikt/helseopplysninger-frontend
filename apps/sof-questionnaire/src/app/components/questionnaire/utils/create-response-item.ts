import {
    IQuestionnaire_Item,
    IQuestionnaireResponse_Item,
    Questionnaire_ItemTypeKind
} from "@ahryman40k/ts-fhir-types/lib/R4";
import {v4 as uuidv4} from "uuid";

const createResponseItem = (
    questionnaireItem: IQuestionnaire_Item,
): IQuestionnaireResponse_Item => {
    const {linkId, text, definition} = questionnaireItem;
    const responseItem: IQuestionnaireResponse_Item = {
        id: uuidv4(),
        linkId,
        text,
        definition,
    }
    if (questionnaireItem.type === Questionnaire_ItemTypeKind._group) {
        responseItem.item = [];
    } else {
        responseItem.answer = [];
    }
    return responseItem;
}

export default createResponseItem;
