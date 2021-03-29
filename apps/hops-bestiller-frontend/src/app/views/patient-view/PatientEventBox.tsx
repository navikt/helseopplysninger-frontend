import React from "react";
import preview from "../../../assets/img.png"
import {Knapp} from "nav-frontend-knapper";
import {goToViewPath} from "../../utils/navigation";
import classNames from "classnames"
import "./PatientEventBox.less"

const PatientEventBox: React.FunctionComponent<any> = ({eventId, nextEventId, prevEventId}) => {
    return (
        <div className={"patient-event-box"}>
            <div style={{float: "right"}} className={"patient-event-box-navigation"}>
                <span className={classNames({"clickable":prevEventId})} onClick={goToViewPath("event", prevEventId)}>Forrige</span>
                <span className={classNames({"clickable":nextEventId})}  onClick={goToViewPath("event", nextEventId)}>Neste</span>
            </div>
            <h2>Sykemelding xyz</h2>
            <div>eventId: {eventId}</div>
            <hr/>
            <h3>Periode</h3>
            <div>21. september - 22. november 2020</div>
            <h3>Diagnose</h3>
            <div>H82 Svimmelhet/vertigo labyrintitt (ICD-10)</div>
            <hr/>
            <img src={preview}/>
            <hr/>
            <br/>
            <Knapp>Send Melding</Knapp>
            <br/>
        </div>
    );
}

export default PatientEventBox;
