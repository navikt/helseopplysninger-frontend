import prepResponseItems from "./prep-response-items";
import questionnaireJson from "../../../../fixtures/questionnaires/legeerklæring.json";
import {IQuestionnaire} from "@ahryman40k/ts-fhir-types/lib/R4";


test('prepResponseItems', () => {
    const questionnaire: IQuestionnaire = questionnaireJson as IQuestionnaire;
    const questionnaireItems = questionnaire.item || []
    const {
        localResponseItems,
        findResponseItemsByLinkId
    } = prepResponseItems(questionnaire.item || [], []);
    expect(localResponseItems.length).toBe(questionnaireItems.length);
    localResponseItems.forEach(responseItem => {
        expect(responseItem.id).toBeDefined();
        expect(responseItem.linkId).toBeDefined();
        expect(findResponseItemsByLinkId(responseItem.linkId)).toBe(responseItem);
    })


});
