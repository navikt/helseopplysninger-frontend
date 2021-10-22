// @ts-ignore
//import {QUESTIONNAIRE, QUESTIONNAIRE_RESPONSE, QUESTIONNAIRE_RESPONSES} from "../paths-server.json";
import { IQuestionnaire, IQuestionnaireResponse } from '@ahryman40k/ts-fhir-types/lib/R4';
import { resolveUrlTemplate } from './resolve-url-template';
import axios from 'axios';
import { BestillingInterface } from '../../types/bestilling-interface';

export async function fetchData(path: string, params?: { [key: string]: string }): Promise<any> {
  const url = params ? resolveUrlTemplate(path, params) : path;
  const result = await axios.get(url);
  return result.data;
}

export async function fetchQuestionnaireResponseList(): Promise<IQuestionnaireResponse[]> {
  return await fetchData('/fetchQuestionnaireResponseList');
}
export async function ListBestilling(): Promise<BestillingInterface[]> {
  const result = await axios.get('/fgsd');
  return result.data;
}
