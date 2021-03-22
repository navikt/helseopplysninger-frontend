import {StatusPresens} from "@navikt/hops-types";
import React from "react";
import {EtikettInfo} from "nav-frontend-etiketter";
import "./StatusPresensBox.less"
import FormattedDate from "./generic/FormattedDate";
import HorisontalTr from "./generic/HorisontalTr";

interface Props {
    statusPresens: StatusPresens
}

const StatusPresensBox: React.FunctionComponent<Props> = ({statusPresens}) => {

    return (
        <div className={"status-presens-box"}>
            <div className={"status-presens-box-header"}>
                <h3>Status Presens</h3>
                <EtikettInfo>{statusPresens && statusPresens.status.navn}</EtikettInfo>
            </div>
            <table className={"status-presens-table"}>
                {statusPresens && statusPresens.diagnoser.map(diagnose =>
                    <HorisontalTr header={diagnose.type}>
                        <div className={"diagnose"}>{diagnose.tekst}</div>
                        <div className={"sist-endret"}>Sist Endret <FormattedDate date={diagnose.endret}/></div>
                    </HorisontalTr>
                )}
                {statusPresens && statusPresens.opplysninger.map(opp =>
                    <HorisontalTr header={opp.type}>
                        <ul>{opp.states[0].tekst.map(t => <li>{t}</li>)}</ul>
                        <div className={"sist-endret"}>Sist Endret <FormattedDate date={opp.states[0].endret}/></div>
                    </HorisontalTr>
                )}
            </table>

        </div>
    );
}

export default StatusPresensBox;
