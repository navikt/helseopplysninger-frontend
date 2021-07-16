import * as React from "react";
import {useEffect} from "react";
import logo from "../logo.svg";
import {ListBestilling} from "../utils/questionnaire";
import AppContainer from "../components/AppContainer";

function TestTest() {
    useEffect(() => {
        const dfs = async () => {
            const bestillinger = await ListBestilling();
            console.log(bestillinger);
        }
        dfs().then(() => {})
    }, []);

    return (
        <AppContainer>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </AppContainer>
    )
}

export default TestTest;
