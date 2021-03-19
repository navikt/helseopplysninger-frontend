import React from "react";
import {PatientEvent} from "@navikt/hops-types";
import {Tabell, Tabellrad} from "@navikt/helse-frontend-tabell";
import "@navikt/helse-frontend-tabell/lib/main.css";
import EtikettBase from "nav-frontend-etiketter";
import "./PatientEventTable.less"
import Periode from "./generic/Periode";
import Icon from "./generic/Icon";
import Nobr from "./generic/Nobr";
import {HoyreChevron} from "nav-frontend-chevron";
import {Hovedknapp} from "nav-frontend-knapper";
import Lenke from "nav-frontend-lenker";

interface Props {
    patientId: string;
    events: PatientEvent[]
}

const PatientEventTable: React.FunctionComponent<Props> = ({events}) => {
    const rader: Tabellrad[] = [];
    events.forEach(event => {
        rader.push({
            celler: [
                <Periode periode={event.periode}/>,
                <Nobr><Icon type={event.type.icon}/> {event.type.tekst}</Nobr>,
                event.status && (<EtikettBase mini type={event.status.type}>{event.status.tekst}</EtikettBase>),
                "",
                <HoyreChevron style={{float: "right"}}/>
            ]
        })
    });
    const headere = ["Periode", "Type", "Status", "Aksjoner", ""];
    return (
        <>
            <h3>Hendelser</h3>
            <Tabell
                headere={headere}
                className={"patient-event-table"}
                beskrivelse={"Pasient Hendelser"}
                rader={rader}
            />
            <br/>
            <Hovedknapp className={"knapp-bestill-helseopplysninger"}>Bestill helseopplysninger</Hovedknapp>
            <Lenke href={"#"}>Skriv notat</Lenke>
        </>
    )
}

export default PatientEventTable;
