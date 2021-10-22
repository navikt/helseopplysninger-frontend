import React from 'react';
import AppError from './AppError';
import AppLoading from './AppLoading';
import PatientBox from './PatientBox';
import { useFhirContext } from '@navikt/sof-components';

interface AppContainerProps {
  headline?: string;
}

const AppContainer: React.FunctionComponent<AppContainerProps> = (props) => {
  const fhirContext = useFhirContext();
  const status = fhirContext.error ? 'error' : fhirContext.patient ? 'ok' : 'loading';
  return (
    <div className="app-container">
      <div className="App">
        <h1 className="app-header">{props.headline}</h1>
        <PatientBox patient={fhirContext.patient} />
      </div>
      {
        {
          error: <AppError error={fhirContext.error} />,
          loading: <AppLoading />,
          ok: <div className="view-container">{props.children}</div>,
        }[status]
      }
    </div>
  );
};
export default AppContainer;
