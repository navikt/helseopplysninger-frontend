import React from 'react';

import {Route} from 'react-router-dom';
import {HelloWorldView} from "./views/hello-world-view";
import {PatientView} from "./views/patient-view";
import {PatientContextProvider} from "./contexts/PatientContext";

export function App() {
    return (
        <>
            <Route path="/" exact component={HelloWorldView}/>
            <Route path={[
                "/patient/:patientId",
                "/patient/:patientId/:view",
                "/patient/:patientId/:view/:eventId"
            ]} exact>
                <PatientContextProvider>
                    <PatientView/>
                </PatientContextProvider>
            </Route>
        </>
    );
}

export default App;
