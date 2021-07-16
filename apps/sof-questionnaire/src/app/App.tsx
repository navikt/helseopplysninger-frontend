import * as React from "react";
import './App.less';
import {BrowserRouter, Route} from "react-router-dom";
import TestTest from "./views/TestTest";
import BestillingSkjema from "./views/BestillingsSkjema";
import BestillingsListe from "./views/BestillingsListe";
import {QuestionnaireResponseContextProvider} from "./context/QuestionnaireResponseContext";
import {FhirContextProvider} from "./context/FhirContext";

function App() {
    return (
        <BrowserRouter>
            <FhirContextProvider>
                <Route exact path={"/questionnaire"}>
                    <h1 style={{"color": "black"}}>INDEX</h1>
                    <BestillingsListe/>
                </Route>
                <Route exact path={"/questionnaire/utfylling/:id"}>
                    <h1 style={{"color": "blue"}}>BESTILLINGS_SKJEMA</h1>
                    <QuestionnaireResponseContextProvider>
                        <BestillingSkjema/>
                    </QuestionnaireResponseContextProvider>
                </Route>
                <Route exact path={"/questionnaire/test-test"}>
                    <h1 style={{"color": "black"}}>TEST_TEST</h1>
                    <TestTest/>
                </Route>
            </FhirContextProvider>
        </BrowserRouter>
    );
}

export default App;
