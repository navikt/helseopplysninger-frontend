import {IEncounter, IPatient, IPractitioner, IQuestionnaire} from "@ahryman40k/ts-fhir-types/lib/R4";

export function fixtures(): {
    Encounter: IEncounter,
    Patient: IPatient,
    Practitioner: IPractitioner,
    Questionnaire: IQuestionnaire[],
} {
    return require("../../../fixtures");
}
