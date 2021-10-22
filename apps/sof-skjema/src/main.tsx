import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import SkjemaPage from './app/components/SkjemaPage';
import { LandingPage } from './app/components/LandingPage';
import { FhirContextProvider, QuestionnaireResponseContextProvider } from '@navikt/sof-components';
import { questionnaireResolver } from './app/json-files/questionnaire-resolver';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <FhirContextProvider>
        <Route path="/skjema/:questionnaireName" component={SkjemaPage} exact>
          <QuestionnaireResponseContextProvider questionnaireResolver={questionnaireResolver}>
            <SkjemaPage />
          </QuestionnaireResponseContextProvider>
        </Route>
        <Route path="/" component={LandingPage} exact />
      </FhirContextProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
