import {IIdentifier} from "@ahryman40k/ts-fhir-types/lib/R4";

export const getPatientIdentifier = (patientId): IIdentifier => {
    return {
        system: "urn:oid:2.16.578.1.12.4.1.4.1",
        value: "15097902396"
    }
}
