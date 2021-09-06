import {
  IBundle,
  IPatient,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';
import axios from 'axios';
import { fhirclient } from 'fhirclient/lib/types';

/**
 * Function to SEND a questionnaire response to the server.
 **/

export const sendToServer = async (
  client: Client,
  patient: IPatient,
  questionnaireResponse: IQuestionnaireResponse
) => {
  const headers = { 'Content-Type': 'application/fhir+json', Accept: '*/*' };
  const response: IBundle = await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=${questionnaireResponse.questionnaire}&status=in-progress`
  );
  // If there already exist a QR saved on the server with status "in-progress",
  // the current QR's status updated to "completed".
  if (response.total && response.total !== 0 && response.entry) {
    const responseId: string | undefined = response.entry[0].resource?.id;
    questionnaireResponse.id = responseId;

    // TODO:
    // Get patients fødselsnummer and the doctors HPR number.
    // Was necessary to send to NAV, but this requirement is temporarily removed.

    // Updates the current QR with the information above
    await client.request({
      url: `QuestionnaireResponse/${responseId}`,
      method: 'PUT',
      body: JSON.stringify(questionnaireResponse),
      headers,
    });

    // Sends the updated and final QR to NAV
    if (client.state.serverUrl && client.getAuthorizationHeader()) {
      await axios
        .post('/resource-puller/pull-resource', {
          serverUrl: client.state.serverUrl,
          reference: `QuestionnaireResponse/${responseId}`,
          authHeader: client.getAuthorizationHeader(),
        })
        .then((res) => {
          console.log('Sending completed', res.data, res.status);
        })
        .catch((err) => {
          console.log('Error with sending', err);
        });
    } else console.log('No connection found, try restarting server');
  }
};
