import React, {useState} from "react";
import {usePatientContext} from "../contexts/PatientContext";
import SimpleTabs from "../components/generic/SimpleTabs";
import PrettyPrint from "../components/generic/PrettyPrint";
import PatientEventTable from "../components/PatientEventTable";
import {AppContainer} from "../components/AppContainer";
import {Column, Container, Row} from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import {PatientInfoBox} from "../components/PatientInfobox";
import StatusPresensBox from "../components/StatusPresensBox";

export const PatientRoute = () => {
    //const [view, setView] = useState();
    const {events, statusPresens, patientId} = usePatientContext();

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
                        <SimpleTabs>
                            <PatientEventTable events={events} patientId={patientId}></PatientEventTable>
                            <PrettyPrint data={events}></PrettyPrint>
                        </SimpleTabs>
                    </Column>
                    <Column md={"6"}>
                        <SimpleTabs>
                            <Panel>
                                <StatusPresensBox statusPresens={statusPresens}/>
                            </Panel>
                            <PrettyPrint data={statusPresens}></PrettyPrint>
                        </SimpleTabs>
                    </Column>
                </Row>
            </Container>
        </AppContainer>
    );
}
