import React from 'react';

import {Route} from 'react-router-dom';
import {HelloWorldView} from "./views/hello-world-view";
import {PatientView} from "./views/patient-view";
import {PatientContextProvider} from "./contexts/PatientContext";
import {useAppContext} from "./contexts/AppContext";
import {LoginView} from "./views/login-view";
import {LoadingView} from "./views/loading-view";

export function App() {
    const {loading, user} = useAppContext();
    return (
        <div>
            {!loading && user.innlogget && (<>
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
            </>)}
            {!loading && !user.innlogget && (<LoginView/>)}
            {loading && (<LoadingView/>)}
        </div>
    );
}

export default App;
