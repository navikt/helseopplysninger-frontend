import React from "react";
import {fhirclient} from "fhirclient/lib/types";

interface PatientBoxProps {
    patient?: fhirclient.FHIR.Patient
}

const PatientBox: React.FunctionComponent<PatientBoxProps> = ({patient }) => {
    return patient ? (
        <div>
            Pasient: { patient.id}
        </div>
    ):(<div>nothing</div>);
}

export default PatientBox;
