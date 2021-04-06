import React from "react";
import Lenke from "nav-frontend-lenker";
import {BackendPaths} from "@navikt/hops-types";
import {Hovedknapp} from "nav-frontend-knapper";
import {Column, Container, Row} from "nav-frontend-grid";

export const LoginView = () => {
    return <Container>
        <Row>
            <Column>
            <br/>
            </Column>
        </Row>
        <Row style={{textAlign:"center"}}>
            <Lenke href={BackendPaths.LOGIN_PATH}>
                <Hovedknapp>Logg inn</Hovedknapp>
            </Lenke>
        </Row>
    </Container>
}
