import React from 'react';

import {Route} from 'react-router-dom';
import {HelloWorldRoute} from "./routes/hello-world-route";
import {PatientRoute} from "./routes/patient-route";
import {PatientContextProvider} from "./contexts/PatientContext";

export function App() {
    return (
        <>
            <Route path="/" exact component={HelloWorldRoute}/>
            <Route path="/patient/:patientId" exact>
                <PatientContextProvider>
                    <PatientRoute/>
                </PatientContextProvider>
            </Route>
        </>
    );
}

export default App;
