// @ts-ignore
//import {QUESTIONNAIRE, QUESTIONNAIRE_RESPONSE, QUESTIONNAIRE_RESPONSES} from "../paths-server.json";
import {IQuestionnaire, IQuestionnaireResponse} from "@ahryman40k/ts-fhir-types/lib/R4";
import {resolveUrlTemplate} from "./resolve-url-template";
import axios from "axios";
import {BestillingInterface} from "../../types/bestilling-interface";

export async function fetchData(
    path: string,
    params?: { [key: string]: string; }
): Promise<any> {
    const url = params ? resolveUrlTemplate(path, params) : path;
    const result = await axios.get(url);
    return result.data;
}

export async function postData(
    path: string,
    params: { [key: string]: string; } | undefined,
    data: any
): Promise<any> {
    const url = params ? resolveUrlTemplate(path, params) : path;
    const result = await axios.post(url, data);
    return result.data;
}

export async function fetchQuestionnaire(id: string): Promise<IQuestionnaire> {
    return await fetchData("/fetchQuestionnaire", {id})
}

export async function fetchQuestionnaireResponse(id: string): Promise<IQuestionnaireResponse> {
    return await fetchData("/fetchQuestionnaireResponse", {id})
}

export async function saveQuestionnaireResponse(id: string, data: IQuestionnaireResponse) {
    return await postData("/saveQuestionnaireResponse", {id}, data);
}

export async function fetchQuestionnaireResponseList(): Promise<IQuestionnaireResponse[]> {
    return await fetchData("/fetchQuestionnaireResponseList");
}
export async function ListBestilling(): Promise<BestillingInterface[]> {
    const result = await axios.get("/fgsd");
    return result.data;
}
