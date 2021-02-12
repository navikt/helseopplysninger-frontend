import prepResponseItems from "./prep-response-items";
import {fixtures} from "@navikt/fixtures";

test('prepResponseItems', () => {
    fixtures().Questionnaire.forEach(questionnaire => {
        const questionnaireItems = questionnaire.item || []
        const {
            localResponseItems,
            findResponseItemsByLinkId
        } = prepResponseItems(questionnaire.item || [], []);
        expect(localResponseItems.length).toBe(questionnaireItems.length);
        localResponseItems.forEach(responseItem => {
            expect(responseItem.id).toBeDefined();
            expect(responseItem.linkId).toBeDefined();
            expect(findResponseItemsByLinkId(responseItem.linkId)[0]).toBe(responseItem);
        })
    });
});
