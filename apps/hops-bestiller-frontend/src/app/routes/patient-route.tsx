import React from "react";
import {usePatientContext} from "../contexts/PatientContext";

export const PatientRoute = () => {
    const patient = usePatientContext();

    return (
        <>
            <h2>Patient route</h2>
            <pre style={{fontSize: 10}}>
            {JSON.stringify(patient, null, 1)}
            </pre>
        </>
    );
}
