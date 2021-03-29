import React from "react";
import {PatientEvent} from "@navikt/hops-types";
import {Tabell, Tabellrad} from "@navikt/helse-frontend-tabell";
import "@navikt/helse-frontend-tabell/lib/main.css";
import EtikettBase from "nav-frontend-etiketter";
import "./PatientEventTable.less"
import Periode from "../../components/generic/Periode";
import Icon from "../../components/generic/Icon";
import Nobr from "../../components/generic/Nobr";
import {HoyreChevron} from "nav-frontend-chevron";
import {Flatknapp, Hovedknapp} from "nav-frontend-knapper";
import Lenke from "nav-frontend-lenker";
import {generateViewPath, goToViewPath} from "../../utils/navigation";

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
                <Nobr onClick={goToViewPath("event",event.id)}>
                    <Icon type={event.type.icon}/> {event.type.tekst}
                </Nobr>
                ,
                event.status && (<EtikettBase mini type={event.status.type}>{event.status.tekst}</EtikettBase>),
                "",
                <div onClick={goToViewPath("event",event.id)}><HoyreChevron style={{float: "right"}}/></div>
            ]
        })
    });
    const headere = ["Periode", "Type", "Status", "Aksjoner", ""];
    return (
        <>
            <h2>Hendelser</h2>
            <Tabell
                headere={headere}
                className={"patient-event-table"}
                beskrivelse={"Pasient Hendelser"}
                rader={rader}
            />
            <br/>
            <Hovedknapp className={"knapp-bestill-helseopplysninger"} onClick={goToViewPath("order")}>Bestill
                helseopplysninger</Hovedknapp>
            <Flatknapp onClick={goToViewPath("nytt-notat")}>Skriv notat</Flatknapp>
        </>
    )
}

export default PatientEventTable;
