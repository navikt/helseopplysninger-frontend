import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './app/components/app';
import { FhirContextProvider } from './app/context/fhirContext';
import { LandingPage } from './app/components/LandingPage';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <FhirContextProvider>
        <Route path="/skjema/:questionnaireName" component={App} exact />
        <Route path="/" component={LandingPage} exact />
      </FhirContextProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
