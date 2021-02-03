import {IQuestionnaire, Questionnaire_ItemTypeKind} from "@ahryman40k/ts-fhir-types/lib/R4";

const questionnaire: IQuestionnaire = {
    resourceType: "Questionnaire",
    item: [
        {
            linkId: "spist_middag",
            type: Questionnaire_ItemTypeKind._boolean,
            text: "Spiste du middag?"
        },
        {
            linkId: "hva_hadde_du_til_middag",
            type: Questionnaire_ItemTypeKind._string,
            text: "Hva hadde du tilmiddag?"
        },
        {
            linkId: "perioder",
            type: Questionnaire_ItemTypeKind._group,
            definition: "Dette er definisjonen av perioder",
            prefix: "3.4",
            text: "Perioder",
            repeats: true,
        },
    ]
};

export default questionnaire;
