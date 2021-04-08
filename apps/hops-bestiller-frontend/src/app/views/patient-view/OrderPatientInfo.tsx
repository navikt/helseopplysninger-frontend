import React, {useState} from "react";
import {Checkbox, CheckboxGruppe, Select} from "nav-frontend-skjema";
import "./OrderPatientInfo.less"
import {Flatknapp, Hovedknapp} from "nav-frontend-knapper";
import {goToViewPath} from "../../utils/navigation";
import {sendBestilling} from "../../commands/send-bestilling";

interface Props {
    patientId: string;
}

const OrderPatientInfo: React.FunctionComponent<Props> = ({patientId}) => {
    const [skjema, setSkjema] = useState({
        purpose: "hello world",
    });
    const onSubmit = async () => {
        await sendBestilling(patientId, skjema);
    }
    return (
        <div className={"order-patient-info"}>
            <h2>Bestill helseopplysninger</h2>
            <Select
                bredde={"m"}
                value={skjema.purpose}
                label={"Hva skal opplysningene brukes til?"}
                onChange={(e) => {
                    setSkjema(prevState => ({
                        ...prevState,
                        purpose: e.target.value
                    }))
                }}
            >
                <option value={"vedtak-11-5"}>Vedtak $ 11-5</option>
                <option value={"legeerklaering"}>Legeerklæring</option>
                <option value={"attforingsattest"}>Attføringsattest</option>
            </Select>
            <br/>
            <CheckboxGruppe legend="Hvilke opplysninger skal etterspørres?">
                <Checkbox label={"Oppdatert diagnose"}/>
                <Checkbox label={"Utydpende informasjon om funksjonsevne"}/>
                <Checkbox label={"Oppdatert behandlingsplan"}/>
                <Checkbox label={"Prognose for å komme tilbake til samme arbeidsgiver"}/>
                <Checkbox label={"Prognose for å komme tilbake til annen arbeidsgiver"}/>
            </CheckboxGruppe>
            <Select bredde={"m"} label={"Ytterligere spesifisering til legen"}>
                <option>Velg</option>
            </Select>
            <br/>
            <Hovedknapp className={"knapp-order-patient-info"} onClick={onSubmit}>Send melding</Hovedknapp>
            <Flatknapp onClick={goToViewPath("table")}>Avbryt</Flatknapp>
        </div>
    );
}

export default OrderPatientInfo;
