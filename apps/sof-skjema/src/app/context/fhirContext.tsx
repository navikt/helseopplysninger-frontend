import React, { useEffect, useState } from 'react';
import Client from 'fhirclient/lib/Client';
import { fhirclient } from 'fhirclient/lib/types';
import { oauth2 } from 'fhirclient';
import { useLocation } from 'react-router-dom';
import {
  IPatient,
  IQuestionnaire,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';

type ContextProps = {
  client: Client;
  patient: IPatient;
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson;
  questionnaire: IQuestionnaire;
  setQuestionnaire: React.Dispatch<
    React.SetStateAction<IQuestionnaire | undefined>
  >;
  questionnaireResponse: IQuestionnaireResponse;
  setQuestionnaireResponse: React.Dispatch<
    React.SetStateAction<IQuestionnaireResponse | undefined>
  >;
  error: Error;
};
export const FhirContext = React.createContext<Partial<ContextProps>>({});

export const useFhirContext = function (): Partial<ContextProps> {
  const context = React.useContext(FhirContext);
  if (context === undefined) {
    throw new Error('useFhirDispatch must be used within a FhirProvider');
  }
  return context;
};

export const FhirContextProvider = (props: any) => {
  const location = useLocation();
  const [client, setClient] = useState<Client>();
  const [patient, setPatient] = useState<IPatient>();
  const [user, setUser] = useState<
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
  >();
  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire>();
  const [questionnaireResponse, setQuestionnaireResponse] =
    useState<IQuestionnaireResponse>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function fetchData() {
      await oauth2.init({
        clientId: 'whatever-you-want',
        scope: 'launch launch/patient patient/read openid fhirUser',
        completeInTarget: true,
        redirectUri: location.pathname,
      });
      const oauth2Client = await oauth2.ready();




      setClient(oauth2Client);
      if (oauth2Client) {
        const rawPatient = await oauth2Client.patient.read();
        setPatient(rawPatient);
        const rawUser = await oauth2Client.user.read();
        setUser(rawUser);
      }
    }

    fetchData().catch((e) => {
      setError(e);
      console.log(e.message);
    });
  }, []);

  const context = {
    client,
    error,
    patient,
    user,
    questionnaire,
    setQuestionnaire,
    questionnaireResponse,
    setQuestionnaireResponse,
  };
  return (
    <FhirContext.Provider value={context}>
      {props.children}
    </FhirContext.Provider>
  );
};
