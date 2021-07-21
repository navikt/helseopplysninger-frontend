import React from 'react';
import { PatientEvent } from '@navikt/bestiller-types';
import { Tabell, Tabellrad } from '@navikt/helse-frontend-tabell';
import '@navikt/helse-frontend-tabell/lib/main.css';
import EtikettBase from 'nav-frontend-etiketter';
import './PatientEventTable.less';
import Periode from '../../components/generic/Periode';
import Icon from '../../components/generic/Icon';
import Nobr from '../../components/generic/Nobr';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useAppContext } from '../../contexts/AppContext';

interface Props {
  patientId: string;
  events: PatientEvent[];
}

const PatientEventTable: React.FunctionComponent<Props> = ({ events }) => {
  const { goto } = useAppContext();
  const rader: Tabellrad[] = [];
  events.forEach((event) => {
    rader.push({
      celler: [
        <Periode periode={event.periode} />,
        <Nobr onClick={goto.viewPath('event', event.id)}>
          <Icon type={event.type.icon} /> {event.type.tekst}
        </Nobr>,
        event.status && (
          <EtikettBase mini type={event.status.type}>
            {event.status.tekst}
          </EtikettBase>
        ),
        <div onClick={goto.viewPath('event', event.id)}>
          <HoyreChevron style={{ float: 'right' }} />
        </div>,
      ],
    });
  });

  const headere = ['Periode', 'Type', 'Status', ''];
  return (
    <>
      <h2>Hendelser</h2>
      <Tabell
        headere={headere}
        className={'patient-event-table'}
        beskrivelse={'Pasient Hendelser'}
        rader={rader}
      />
      <br />
      <Hovedknapp
        className={'knapp-bestill-helseopplysninger'}
        onClick={goto.viewPath('order')}
      >
        Bestill helseopplysninger
      </Hovedknapp>
      <Flatknapp onClick={goto.viewPath('nytt-notat')}>Skriv notat</Flatknapp>
    </>
  );
};
export default PatientEventTable;
