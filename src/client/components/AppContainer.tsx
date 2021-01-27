import React, {useContext} from "react";
import {FhirContext} from "../context/FhirContext";
import AppError from "./AppError";
import AppLoading from "./AppLoading";
import PatientBox from "./PatientBox";

interface AppContainerProps {
    headline?: string;
}

const AppContainer: React.FunctionComponent<AppContainerProps> = props => {
    const fhirContext = useContext(FhirContext);
    const status = fhirContext.error ? "error" : fhirContext.patient ? "ok" : "loading";
    return (
        <div className="app-container">
            <div className="App">
                <h1 className="app-header">
                    {props.headline}
                </h1>
                <PatientBox patient={fhirContext.patient}/>
            </div>
            {
                {
                    'error': <AppError error={fhirContext.error }/>,
                    'loading': <AppLoading/>,
                    'ok': <div className="view-container">
                        {props.children}
                    </div>
                }[status]
            }
        </div>);
}
export default AppContainer;
