import React from "react";
import {Checkbox, CheckboxGruppe, Select} from "nav-frontend-skjema";
import "./OrderPatientInfo.less"
import {Hovedknapp,Flatknapp} from "nav-frontend-knapper";
import {goToViewPath} from "../../utils/navigation";
import Lenke from "nav-frontend-lenker";


const OrderPatientInfo: React.FunctionComponent<any> = ({}) => {
    return (
        <div className={"order-patient-info"}>
            <h2>Bestill helseopplysninger</h2>
            <Select bredde={"m"} label={"Hva skal opplysningene brukes til?"}>
                <option>Vedtak $ 11-5</option>
                <option>Legeerklæring</option>
                <option>Attføringsattest</option>
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
            <Hovedknapp className={"knapp-order-patient-info"}>Send melding</Hovedknapp>
            <Flatknapp onClick={goToViewPath("table")} >Avbryt</Flatknapp>
        </div>
    );
}

export default OrderPatientInfo;
