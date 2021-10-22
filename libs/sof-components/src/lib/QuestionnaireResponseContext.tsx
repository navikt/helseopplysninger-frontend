import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IQuestionnaire,
  IQuestionnaireResponse,
  IQuestionnaireResponse_Item,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { fhirclient } from 'fhirclient/lib/types';
import { useFhirContext } from '@navikt/sof-components';
import { fetchQuestionnaire } from './io/fetch-questionnaire';
import { fetchQuestionnaireResponse } from './io/fetch-questionnaire-response';
import { createFhirQuestionnaireResponse, createFhirReference } from '@navikt/fhir';

type ContextProps = {
  questionnaire: IQuestionnaire;
  questionnaireResponse: IQuestionnaireResponse;
  saveQuestionnaireResponseItems: (item: IQuestionnaireResponse_Item[]) => void;
};

type ContextProviderProps = {
  questionnaireResolver: (params: any) => Promise<IQuestionnaire>;
};
export const QuestionnaireResponseContext = React.createContext<Partial<ContextProps>>({
  saveQuestionnaireResponseItems: () => {},
});

export const useQuestionnaireResponseContext = function (): Partial<ContextProps> {
  const context = React.useContext(QuestionnaireResponseContext);
  if (context === undefined) {
    throw new Error('useQuestionnaireResponseContext must be used within a CountProvider');
  }
  return context;
};

export const QuestionnaireResponseContextProvider: FC<ContextProviderProps> = ({
  questionnaireResolver,
  children,
}) => {
  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire>();
  const [questionnaireResponse, setQuestionnaireResponse] = useState<IQuestionnaireResponse>();
  const { client, patient, user } = useFhirContext();
  const params = useParams<any>();

  useEffect(() => {
    async function fetchData() {
      const rawQuestionnaire = await questionnaireResolver(params);

      if (client && patient && rawQuestionnaire && user) {
        const [questionnaireResult, questionnaireResponseResult] = await Promise.all([
          fetchQuestionnaire(client, rawQuestionnaire),
          // @ts-ignore
          fetchQuestionnaireResponse(client, patient, user, rawQuestionnaire),
        ]);
        setQuestionnaire(questionnaireResult);
        if (questionnaireResponseResult) {
          setQuestionnaireResponse(questionnaireResponseResult);
        } else {
          const userRef = createFhirReference(user);
          const parientRef = createFhirReference(patient);
          const newQuestionnaireResponse = createFhirQuestionnaireResponse(
            questionnaireResult,
            userRef,
            parientRef,
            []
          );
          setQuestionnaireResponse(newQuestionnaireResponse);
        }
      }
    }

    fetchData().catch((e) => console.error(e.message));
  }, [params, client, patient, user]);

  const saveQuestionnaireResponseItems = async (item: IQuestionnaireResponse_Item[]) => {
    const resource = Object.assign(questionnaireResponse, { item }) as fhirclient.FHIR.Resource;
    await client?.update(resource);
    setQuestionnaireResponse(resource as IQuestionnaireResponse);
  };
  const context = {
    questionnaire,
    questionnaireResponse,
    saveQuestionnaireResponseItems,
  };
  return (
    <QuestionnaireResponseContext.Provider value={context}>
      {children}
    </QuestionnaireResponseContext.Provider>
  );
};
