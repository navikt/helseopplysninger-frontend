import { useParams } from 'react-router';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  BackendPaths,
  PatientEvent,
  StatusPresens,
} from '@navikt/bestiller-types';

interface ParamTypes {
  patientId: string;
  eventId?: string;
  view?: string;
}

interface ContextProps {
  patientId?: string;
  patientData?: {
    name: string;
  };
  practitioner?: {
    id: string;
    name: string;
  };
  statusPresens?: StatusPresens;
  events: PatientEvent[];
}

const PatientContext = React.createContext<Partial<ContextProps>>({
  statusPresens: null,
  events: [],
});

const PatientContextProvider = (props: any) => {
  let { patientId, eventId } = useParams<ParamTypes>();

  const [patient, setPatient] = useState<ContextProps>({
    patientId: patientId,
    statusPresens: null,
    events: [],
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    async function fetch() {
      // @TODO parallelize
      const statusRes = await axios.get(
        BackendPaths.PATIENT_STATUS_PRESENS.replace(':patientId', patientId)
      );
      const eventRes = await axios.get(
        BackendPaths.PATIENT_EVENTS.replace(':patientId', patientId)
      );
      setPatient({
        patientId: patientId,
        statusPresens: statusRes.data,
        events: eventRes.data,
      });
    }

    if (patientId) fetch().then(null);
  }, [patientId]);
  useEffect(() => {
    async function fetch() {
      const eventRes = await axios.get(
        BackendPaths.PATIENT_EVENT.replace(':eventId', eventId)
      );
      setSelectedEvent(eventRes.data);
    }

    if (eventId) fetch().then(null);
  }, [eventId]);

  return (
    <PatientContext.Provider value={patient}>
      {props.children}
    </PatientContext.Provider>
  );
};

const usePatientContext = () => useContext(PatientContext);
export { usePatientContext, PatientContextProvider };
