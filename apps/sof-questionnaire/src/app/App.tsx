import * as React from 'react';
import './App.less';
import { Route } from 'react-router-dom';
import TestTest from './views/TestTest';
import BestillingSkjema from './views/BestillingsSkjema';
import BestillingsListe from './views/BestillingsListe';

import { FhirContextProvider, QuestionnaireResponseContextProvider } from '@navikt/sof-components';
import { IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';

const questionnaireResolver = async (params): Promise<IQuestionnaire> => {
  return new Promise((resolve) => resolve({ resourceType: 'Questionnaire' }));
};

function App() {
  return (
    <FhirContextProvider>
      <Route exact path={'/questionnaire'}>
        <h1 style={{ color: 'black' }}>INDEX</h1>
        <BestillingsListe />
      </Route>
      <Route exact path={'/questionnaire/utfylling/:id'}>
        <h1 style={{ color: 'blue' }}>BESTILLINGS_SKJEMA</h1>
        <QuestionnaireResponseContextProvider questionnaireResolver={questionnaireResolver}>
          <BestillingSkjema />
        </QuestionnaireResponseContextProvider>
      </Route>
      <Route exact path={'/questionnaire/test-test'}>
        <h1 style={{ color: 'black' }}>TEST_TEST</h1>
        <TestTest />
      </Route>
    </FhirContextProvider>
  );
}

export default App;
