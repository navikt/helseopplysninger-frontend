// @ts-ignore
import {QUESTIONNAIRE, QUESTIONNAIRE_RESPONSE, QUESTIONNAIRE_RESPONSES} from "../paths-server.json";
import {IQuestionnaire, IQuestionnaireResponse} from "@ahryman40k/ts-fhir-types/lib/R4";
import {fetchData, postData} from "./utils/client";

export async function fetchQuestionnaire(id: string): Promise<IQuestionnaire> {
    return await fetchData(QUESTIONNAIRE, {id})
}

export async function fetchQuestionnaireResponse(id: string): Promise<IQuestionnaireResponse> {
    return await fetchData(QUESTIONNAIRE_RESPONSE, {id})
}

export async function saveQuestionnaireResponse(id: string, data: IQuestionnaireResponse) {
    return await postData(QUESTIONNAIRE_RESPONSE, {id}, data);
}

export async function fetchQuestionnaireResponseList(): Promise<IQuestionnaireResponse[]> {
    return await fetchData(QUESTIONNAIRE_RESPONSES);
}
