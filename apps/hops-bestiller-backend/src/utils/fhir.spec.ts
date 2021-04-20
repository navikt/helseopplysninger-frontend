import {
    createFhirBestilling,
    createFhirMessageBundle,
    createFhirQuestionnaire,
    createFhirTask,
    fhirBestilling
} from "./fhir";
import {BundleTypeKind, Questionnaire_ItemTypeKind} from "@ahryman40k/ts-fhir-types/lib/R4";

test("it should create bundle", async () => {
    const result = createFhirMessageBundle([
        createFhirTask("Fyll ut dette!", {
            system: "123",
            value: "abc"
        }),
        createFhirQuestionnaire("test", [
            {
                linkId: "id-for-item",
                type: Questionnaire_ItemTypeKind._string,
                text: "Utydpende informasjon om funksjonsevne"
            }
        ])
    ], "dfd");
    expect(result.resourceType).toBe("Bundle");
})
test("it should create bestillings bundle", async () => {
    const bestillingData:fhirBestilling = {
        description: "Dette er en forespørsel",
        patientIdentifier: {
            system: "urn:oid:2.16.578.1.12.4.1.4.1",
            value: "15097902396"
        },
        practionerIdentifier: {
            system: "urn:oid:2.16.578.1.12.4.1.4.1",
            value: "15097902396"
        },
        questionnaireItems: [            {
            linkId: "id-for-item",
            type: Questionnaire_ItemTypeKind._string,
            text: "Utydpende informasjon om funksjonsevne"
        }],
        saksbehandlerIdentifier: "ABC123"

    }
    const result = createFhirBestilling(bestillingData);
    expect(result.resourceType).toBe("Bundle");
})
