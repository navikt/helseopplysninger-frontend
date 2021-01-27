import {IQuestionnaire} from "@ahryman40k/ts-fhir-types/lib/R4";
import q1 from "./questionnaires/legeerklæring.json"
import q2 from "./questionnaires/med-enable-when.json"
import q3 from "./questionnaires/med-perioder.json"

export default (): IQuestionnaire[] => {
    const files: IQuestionnaire[] = [];
    files.push(q1 as IQuestionnaire);
    files.push(q2 as IQuestionnaire);
    files.push(q3 as IQuestionnaire);
    return files;
}
