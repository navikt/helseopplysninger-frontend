import questionnairePleiepenger from './questionnairePleiepenger.json';
import questionnaireArbeidsuforhet from './questionnaireArbeidsuforhet.json';
import { IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';

export const questionnaireResolver = async (params: any): Promise<IQuestionnaire> => {
  const { questionnaireName } = params;
  // @ts-ignore
  return {
    ['pleiepengeskjema']: questionnairePleiepenger,
    ['arbeidsuførerklæring']: questionnaireArbeidsuforhet,
  }[questionnaireName];
};
