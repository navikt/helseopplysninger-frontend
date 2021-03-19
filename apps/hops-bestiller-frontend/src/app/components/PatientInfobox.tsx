import React from 'react';
import {Female} from "@navikt/ds-icons";
import "./PatientInfobox.less"

export const PatientInfoBox = ({name}) => {
    return (
        <div className={"patient-info-box"}><Female/> {name}</div>
    );
}
