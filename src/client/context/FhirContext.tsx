import React, {useEffect, useState} from "react";
import Client from "fhirclient/lib/Client";
import {fhirclient} from "fhirclient/lib/types";
import {fetchQuestionnaireResponseList} from "../../api/questionnaire";

type ContextProps = {
    client: Client,
    patient: fhirclient.FHIR.Patient,
    error: Error
};
export const FhirContext = React.createContext<Partial<ContextProps>>({});

export const useFhirContext = function (): Partial<ContextProps> {
    const context = React.useContext(FhirContext)
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
}
export const FhirContextProvider = (props: any) => {
    const [client, setClient] = useState<Client>();
    const [patient, setPatient] = useState<fhirclient.FHIR.Patient>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        async function fetchData() {
            const questionaire = await fetchQuestionnaireResponseList();
            /*
            await oauth2.init({
                clientId: "whatever-you-want",
                scope: "launch launch/patient patient/read offline_access openid fhirUser",
                completeInTarget: true,
                redirectUri:INDEX
            });

            const oauth2Client = await oauth2.ready();
            setClient(oauth2Client);
            if (oauth2Client) {
                const rawPatient = await oauth2Client.patient.read();
                setPatient(rawPatient)
            }
             */
        }

        fetchData().catch(e => {
            setError(e)
            console.log(e.message);
        })

    }, []);

    const context = {
        client,
        error,
        patient,
    };
    return (
        <FhirContext.Provider value={context}>
            {props.children}
        </FhirContext.Provider>
    );
};
