import * as React from "react";
import './App.less';
import {BrowserRouter, Route} from "react-router-dom";
import TestTest from "./views/TestTest";
import {BESTILLINGS_SKJEMA, INDEX, TEST_TEST} from "../paths-client.json"
import BestillingSkjema from "./views/BestillingsSkjema";
import BestillingsListe from "./views/BestillingsListe";
import {isomorphic} from "../utils/isomorphic";
import {QuestionnaireResponseContextProvider} from "./context/QuestionnaireResponseContext";
import {UserContextProvider} from "./context/UserContext";

function App() {
    console.log(isomorphic("from client"));
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Route exact path={INDEX}>
                    <h1 style={{"color": "black"}}>INDEX</h1>
                    <BestillingsListe/>
                </Route>
                <Route exact path={BESTILLINGS_SKJEMA}>
                    <h1 style={{"color": "blue"}}>BESTILLINGS_SKJEMA</h1>
                    <QuestionnaireResponseContextProvider>
                        <BestillingSkjema/>
                    </QuestionnaireResponseContextProvider>
                </Route>
                <Route exact path={TEST_TEST}>
                    <h1 style={{"color": "black"}}>TEST_TEST</h1>
                    <TestTest/>
                </Route>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
