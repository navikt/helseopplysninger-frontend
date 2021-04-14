import {createFhirMessageBundle, createFhirQuestionaire, createFhirTask} from "./fhir";
import {Questionnaire_ItemTypeKind} from "@ahryman40k/ts-fhir-types/lib/R4";

test("it should create bundle", async () => {
    const result = createFhirMessageBundle([
        createFhirTask("Fyll ut dette!", "123abc"),
        createFhirQuestionaire("test", [
            {
                linkId: "id-for-item",
                type: Questionnaire_ItemTypeKind._string,
                text: "Utydpende informasjon om funksjonsevne"
            }
        ])
    ]);
    console.log(JSON.stringify(result));
    expect(1).toBe(1)
})
