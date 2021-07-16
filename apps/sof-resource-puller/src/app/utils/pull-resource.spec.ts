import pullResource from "./pull-resource";
import {IBundle} from "@ahryman40k/ts-fhir-types/lib/R4";
import {nockFhirResource} from "@navikt/hops-testutils";
import {fixtures} from "@navikt/fixtures";
import {createFhirCanonical} from "@navikt/fhir";

test("it should pull a resource", async () => {
    const patient = fixtures().Patient;
    nockFhirResource(patient)
    const result = await pullResource(
        new URL(process.env.FHIR_SERVER_ADDRESS),
        createFhirCanonical(patient), "token123") as IBundle;
    expect(result.resourceType).toBe("Patient");
})
