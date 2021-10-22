import React from 'react';
import { PatientEvent } from '@navikt/bestiller-types';
import { Tabell, Tabellrad } from '@navikt/helse-frontend-tabell';
import '@navikt/helse-frontend-tabell/lib/main.css';
import './PatientEventTable.less';
import Periode from '../../components/generic/Periode';
import Icon from '../../components/generic/Icon';
import Nobr from '../../components/generic/Nobr';
import { HoyreChevron } from 'nav-frontend-chevron';
import { useAppContext } from '../../contexts/AppContext';
import { Button, Tag } from '@navikt/ds-react';

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
        event.status && <Tag variant={event.status.type}>{event.status.tekst}</Tag>,
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
      <Button
        variant={'primary'}
        className={'knapp-bestill-helseopplysninger'}
        onClick={goto.viewPath('order')}
      >
        Bestill helseopplysninger
      </Button>
      <Button variant={'secondary'} onClick={goto.viewPath('nytt-notat')}>
        Skriv notat
      </Button>
    </>
  );
};
export default PatientEventTable;
