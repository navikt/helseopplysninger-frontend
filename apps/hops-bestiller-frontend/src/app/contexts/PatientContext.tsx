import {useParams} from "react-router";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BackendPaths} from "@navikt/hops-types";

const PatientContext = React.createContext({
    statusPresens: null,
    events: [],
})

interface ParamTypes {
    patientId: string
}


const PatientContextProvider = (props: any) => {
    let {patientId} = useParams<ParamTypes>()
    const [patient, setPatient] = useState({
        statusPresens: null,
        events: [],
    });
    useEffect(() => {
        async function fetch() {
            // @TODO parallelize
            const statusRes = await axios.get(BackendPaths.PATIENT_STATUS_PRESENS.replace(":patientId", patientId));
            const eventRes = await axios.get(BackendPaths.PATIENT_EVENTS.replace(":patientId", patientId));
            setPatient({
                statusPresens: statusRes.data,
                events: eventRes.data,
            });
        }

        if (patientId) fetch().then(null);
    }, [patientId]);
    console.log("I was rendered", patientId);
    return (
        <PatientContext.Provider value={patient}>
            {props.children}
        </PatientContext.Provider>
    );
}

const usePatientContext = () => useContext(PatientContext);
export {usePatientContext, PatientContextProvider}
