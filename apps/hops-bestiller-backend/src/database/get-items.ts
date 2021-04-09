import {IQuestionnaire_Item, Questionnaire_ItemTypeKind} from "@ahryman40k/ts-fhir-types/lib/R4";

const items = require("../../../../fixtures/items.json");

export const getFhirItems = (): IQuestionnaire_Item[] => {
    return items.map(item => Object.assign(item, {
        type: Questionnaire_ItemTypeKind._string,
        repeats: false
    }))
}
