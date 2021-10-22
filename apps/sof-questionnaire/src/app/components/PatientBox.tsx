import React, { FC } from 'react';
import { IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';

interface PatientBoxProps {
  patient?: IPatient;
}

const PatientBox: FC<PatientBoxProps> = ({ patient }) => {
  return patient ? <div>Pasient: {patient.id}</div> : <div>nothing</div>;
};

export default PatientBox;
