import { IBundle, IQuestionnaire, IQuestionnaireResponse } from '@ahryman40k/ts-fhir-types/lib/R4';
import pullResource from './pull-resource';

export async function pullQuestionnaireResponse(
  serverUrl: URL,
  reference: string,
  authHeader: string
): Promise<IQuestionnaireResponse> {
  return (await pullResource(serverUrl, reference, authHeader)) as IQuestionnaireResponse;
}

export async function pullQuestionnaire(
  serverUrl: URL,
  questionnaireUrl: string,
  authHeader: string
): Promise<IQuestionnaire> {
  const bundle = (await pullResource(serverUrl, 'Questionnaire', authHeader, {
    url: questionnaireUrl,
  })) as IBundle;
  return bundle.entry[0].resource as IQuestionnaire;
}
