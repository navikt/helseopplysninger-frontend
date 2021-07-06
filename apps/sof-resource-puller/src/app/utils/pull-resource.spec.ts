import pullResource from "./pull-resource";
import {IBundle} from "@ahryman40k/ts-fhir-types/lib/R4";

test("it should pull a resource", async () => {

    const url = new URL(`${process.env.FHIR_SERVER_ADDRESS}/CapabilityStatement`);
    const result = await pullResource(url,"token123") as IBundle;
    expect(result.resourceType).toBe("Bundle");
})
