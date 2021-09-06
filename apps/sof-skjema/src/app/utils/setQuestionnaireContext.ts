import {
  IBundle,
  IQuestionnaire,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';
import { setUUIDIdentifier } from './setIdentifier';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import questionnaireResponsePleiepenger from '../json-files/questionnaireResponsePleiepenger.json';
import questionnaireArbeidsuforhet from '../json-files/questionnaireArbeidsuforhet.json';
import questionnaireResponseArbeidsufor from '../json-files/questionnaireResponseArbeidsufor.json';

/**
 * Function to set the right questionnaire in the context when a link is clicked.
 * @param name The value to the name attribute in the questionnaire to render
 * @param version The value to the version attribute in the questionnaire to render
 * @param setQuestionnaire Function to set the questionnaire state in the fhir context
 * @param client The fhir client saved in the context
 * @param jsonQuestionnaire The questionnaire to save to the server if it is not there allready
 * @param setLoadingQuestionnaire function to set the state loading Questionnaire
 */
const setQuestionnaireContext = async (
  questionnaireName: string,
  questionnaireVersion: string,
  setQuestionnaire:
    | React.Dispatch<React.SetStateAction<IQuestionnaire | undefined>>
    | undefined,
  client: Client | undefined,
  jsonQuestionnaire: IQuestionnaire,
  setLoadingQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setQuestionnaire ? setQuestionnaire(undefined) : null; // reset questionnaire
  const response = (await client?.request(
    `Questionnaire?name=${questionnaireName}&version=${questionnaireVersion}&status=active`
  )) as IBundle;

  if (client && response.total !== 0 && response.entry && setQuestionnaire) {
    // If the questionnaire exist, save it in the context
    setQuestionnaire(response.entry[0].resource as IQuestionnaire);
    setLoadingQuestionnaire(false);
  } else if (client && jsonQuestionnaire.status === 'active') {
    // If not, save a questionnaire to the server and set this as the questionnaire in the contex
    const headers = {
      'Content-Type': 'application/fhir+json',
      Accept: '*/*',
    };
    await client
      ?.request({
        url: `Questionnaire`,
        method: 'POST',
        body: JSON.stringify(jsonQuestionnaire),
        headers,
      })
      .then((response) => {
        setUUIDIdentifier(response);
        setQuestionnaire ? setQuestionnaire(response) : null;
        setLoadingQuestionnaire(false);
      });
  } else {
    // If the questionnaire json file is not active yet, it should not be used
    // We will currently set a default questionnaire to be used if we e.g. are
    // unable to connect to the server. This will allow us to see the questionnaire
    // in DIPS even though the functionality does not work correctly yet.
    setQuestionnaire
      ? setQuestionnaire(jsonQuestionnaire as unknown as IQuestionnaire)
      : null;
    setLoadingQuestionnaire(false);
  }
};

/**
 * Function to choose correct questionnaire and questionnaireResponse to use
 * in the context. Currently it is only needed if the questionnaire is not in the
 * server, and a json file must be chosen. Otherwise, onecould just call
 * setQuestionnaireContext.
 */
export const chooseQuestionnaire = (
  questionnaireName: string,
  questionnaireVersion: string,
  setQuestionnaire:
    | React.Dispatch<React.SetStateAction<IQuestionnaire | undefined>>
    | undefined,
  client: Client | undefined,
  setLoadingQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>,
  setQuestionnaireResponse:
    | React.Dispatch<React.SetStateAction<IQuestionnaireResponse | undefined>>
    | undefined
) => {
  questionnaireName === 'pleiepengeskjema'
    ? (setQuestionnaireContext(
        questionnaireName,
        questionnaireVersion,
        setQuestionnaire,
        client,
        questionnairePleiepenger as unknown as IQuestionnaire,
        setLoadingQuestionnaire
      ),
      setQuestionnaireResponse &&
        setQuestionnaireResponse(
          questionnaireResponsePleiepenger as IQuestionnaireResponse
        ))
    : questionnaireName === 'arbeidsuførerklæring'
    ? (setQuestionnaireContext(
        questionnaireName,
        questionnaireVersion,
        setQuestionnaire,
        client,
        questionnaireArbeidsuforhet as unknown as IQuestionnaire,
        setLoadingQuestionnaire
      ),
      setQuestionnaireResponse &&
        setQuestionnaireResponse(
          questionnaireResponseArbeidsufor as IQuestionnaireResponse
        ))
    : null;
};
