import {IQuestionnaireResponse, QuestionnaireResponseStatusKind} from "@ahryman40k/ts-fhir-types/lib/R4";
import {OID_DNR, OID_FNR, OID_HPR_NR} from "./constants";


function validateQuestionnaireResponse(questionnaireResponse: IQuestionnaireResponse): string[] {
    const errors = [];
    if (questionnaireResponse.resourceType !== "QuestionnaireResponse")
        errors.push("Resource need to be of type QuestionnaireResponse");
    if (questionnaireResponse.item?.length === 0)
        errors.push("QuestionnaireResponse need atleast one item");
    if (!questionnaireResponse.questionnaire?.startsWith("Questionnaire"))
        errors.push("QuestionnaireResponse `questionnaire` need to be a canonical reference");
    if (questionnaireResponse.status !== QuestionnaireResponseStatusKind._completed)
        errors.push("QuestionnaireResponse `status` need to be completed.");
    if (questionnaireResponse.subject?.type !== "Patient")
        errors.push("QuestionnaireResponse `subject` need to be a logical reference to Patient");
    if (![OID_FNR, OID_DNR].includes(questionnaireResponse.subject?.identifier?.system))
        errors.push("QuestionnaireResponse `subject` need to be using norwegian FNR or DNR.");
    if (![OID_FNR, OID_HPR_NR].includes(questionnaireResponse.source?.identifier?.system))
        errors.push("QuestionnaireResponse `source` need to be using Norwegian FNR or HPR NR.");
    return errors
}

export {
    validateQuestionnaireResponse
}
