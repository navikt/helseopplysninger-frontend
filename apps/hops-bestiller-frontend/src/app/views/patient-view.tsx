import React from 'react';
import { usePatientContext } from '../contexts/PatientContext';
import PrettyPrint from '../components/generic/PrettyPrint';
import PatientEventTable from './patient-view/PatientEventTable';
import { AppContainer } from '../components/AppContainer';
import { PatientInfoBox } from '../components/PatientInfobox';
import StatusPresensBox from './patient-view/StatusPresensBox';
import { useParams } from 'react-router';
import OrderPatientInfo from './patient-view/OrderPatientInfo';
import { PatientPanel } from '../components/PatientPanel';
import PatientEventBox from './patient-view/PatientEventBox';
import { nextId, prevId } from '../utils/navigation';
import { Cell, ContentContainer, Grid, Panel } from '@navikt/ds-react';

export const PatientView = () => {
  const { view, eventId } = useParams<any>();
  const { events, statusPresens, patientId } = usePatientContext();

  const nextEventId = nextId(events, eventId);
  const prevEventId = prevId(events, eventId);
  return (
    <AppContainer>
      <ContentContainer>
        <Grid>
          <Cell xs={12} sm={12} lg={12}>
            <PatientInfoBox name={'Kari Nordmann / Frode Fastlege'} />
          </Cell>
        </Grid>
        <Grid>
          <Cell xs={6} sm={6} lg={6}>
            <PatientPanel
              isForm={['order'].includes(view)}
              showBackArrow={['order', 'event', 'nytt-notat'].includes(view)}
            >
              {
                {
                  table: <PatientEventTable events={events} patientId={patientId} />,
                  pretty: <PrettyPrint data={events} />,
                  order: <OrderPatientInfo patientId={patientId} />,
                  event: (
                    <PatientEventBox
                      eventId={eventId}
                      nextEventId={nextEventId}
                      prevEventId={prevEventId}
                    />
                  ),
                }[view]
              }
            </PatientPanel>
          </Cell>
          <Cell xs={6} sm={6} lg={6}>
            <Panel>
              {view !== 'pretty' ? (
                <StatusPresensBox statusPresens={statusPresens} />
              ) : (
                <PrettyPrint data={statusPresens}></PrettyPrint>
              )}
            </Panel>
          </Cell>
        </Grid>
      </ContentContainer>
    </AppContainer>
  );
};
