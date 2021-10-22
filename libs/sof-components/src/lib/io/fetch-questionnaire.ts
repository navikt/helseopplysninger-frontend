import Client from 'fhirclient/lib/Client';
import { IBundle, IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import queryString from 'querystring';
import { headers } from './common';
export const fetchQuestionnaire = async (client: Client, jsonQuestionnaire: IQuestionnaire) => {
  // checks if
  const searchParams = queryString.stringify({
    url: jsonQuestionnaire.url,
    version: jsonQuestionnaire.version,
    status: 'active',
  });
  const response = (await client.request({
    url: `Questionnaire?${searchParams}`,
    method: 'GET',
    headers,
  })) as IBundle;

  if (response.total === 0) {
    // If not, save a questionnaire to the server and return it to the user
    return (await client.request({
      url: `Questionnaire`,
      method: 'POST',
      body: JSON.stringify(jsonQuestionnaire),
      headers,
    })) as IQuestionnaire;
  } else {
    // @ts-ignore
    return response.entry[0].resource as IQuestionnaire;
  }
};
