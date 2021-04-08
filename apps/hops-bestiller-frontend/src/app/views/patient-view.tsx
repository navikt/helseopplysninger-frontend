import React from "react";
import {usePatientContext} from "../contexts/PatientContext";
import PrettyPrint from "../components/generic/PrettyPrint";
import PatientEventTable from "./patient-view/PatientEventTable";
import {AppContainer} from "../components/AppContainer";
import {Column, Container, Row} from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import {PatientInfoBox} from "../components/PatientInfobox";
import StatusPresensBox from "./patient-view/StatusPresensBox";
import {useParams} from "react-router";
import OrderPatientInfo from "./patient-view/OrderPatientInfo";
import {PatientPanel} from "../components/PatientPanel";
import PatientEventBox from "./patient-view/PatientEventBox";
import {nextId, prevId} from "../utils/navigation";

export const PatientView = () => {
    const {view, eventId} = useParams<any>()
    const {events, statusPresens, patientId} = usePatientContext();

    const nextEventId = nextId(events,eventId);
    const prevEventId = prevId(events,eventId);
    return (
        <AppContainer>
            <Container fluid>
                <Row>
                    <Column md={"12"}>
                        <PatientInfoBox name={"Kari Nordmann / Frode Fastlege"}/>
                    </Column>
                </Row>
                <Row>
                    <Column md={"6"}>
                        <PatientPanel
                            isForm={["order"].includes(view)}
                            showBackArrow={["order", "event", "nytt-notat"].includes(view)}
                        >
                            {
                                {
                                    'table': <PatientEventTable events={events} patientId={patientId}/>,
                                    'pretty': <PrettyPrint data={events}/>,
                                    'order': <OrderPatientInfo patientId={patientId}/>,
                                    'event': <PatientEventBox eventId={eventId}
                                                              nextEventId={nextEventId}
                                                              prevEventId={prevEventId}/>
                                }[view]
                            }
                        </PatientPanel>
                    </Column>
                    <Column md={"6"}>

                        <Panel>
                            {view !== "pretty" ?
                                <StatusPresensBox statusPresens={statusPresens}/> :
                                <PrettyPrint data={statusPresens}></PrettyPrint>
                            }
                        </Panel>


                    </Column>
                </Row>
            </Container>
        </AppContainer>
    );
}
