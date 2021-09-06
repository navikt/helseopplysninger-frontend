import {
  IBundle,
  IPatient,
  IQuestionnaire,
  IQuestionnaireResponse,
  IQuestionnaireResponse_Item,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';

// TODO:
// It is currently a problem that setSaved(true) is called before answers
// is set, because it happens async. This problem must be solved, so that answers
// from the server is rendered correctly when you enter questionnaire.

type setAnswersType = React.Dispatch<React.SetStateAction<any>>;
type setSavedType = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * Function to set the answers state based on a response
 * @param response IQuestionnaireResponse for the current patient
 * and questionnaire that is in progress.
 * @param setAnswers Function to set the answers-state
 */
const setAllAnswers = (
  response: IQuestionnaireResponse,
  setAnswers: setAnswersType,
  setSaved: setSavedType
) => {
  const fetchedAnswers = new Map<string, string | boolean>();
  response.item?.map((question: IQuestionnaireResponse_Item) => {
    if (question.answer && question.linkId) {
      question.answer[0].valueDate
        ? fetchedAnswers.set(question.linkId, question.answer[0].valueDate)
        : question.answer[0].valueString
        ? fetchedAnswers.set(question.linkId, question.answer[0].valueString)
        : null;
    }
  });
  setAnswers(fetchedAnswers);
  setSaved(true);
};

/**
 * Function to get answers allready saved to the server and
 * update the answers-map based on this.
 * @param client client connected to the FHIR-server
 * @param patient The patient we are currently on in the EHR
 * @param setAnswers function to set the answers-map
 */
export const getAnswersFromServer = async (
  client: Client,
  patient: IPatient,
  setAnswers: setAnswersType,
  questionnaire: IQuestionnaire,
  setSaved: setSavedType
) => {
  const response = (await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=Questionnaire/${questionnaire.id}&status=in-progress`
  )) as IBundle;
  if (response.total !== 0 && response.entry && response.entry[0].resource) {
    setAllAnswers(
      response.entry[0].resource as IQuestionnaireResponse,
      setAnswers,
      setSaved
    );
  }
};
