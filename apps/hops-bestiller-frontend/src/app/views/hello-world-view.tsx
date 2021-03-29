import {Link} from "react-router-dom";
import React from "react";
import Panel from "nav-frontend-paneler";
import {Container, Row} from "nav-frontend-grid";


export const HelloWorldView = () => {
    return (<Container>
        <br/>
        <Row>
            <Panel>
                <header>
                    <h1>Bestilling av Helseopplysninger</h1>
                </header>
                <div role="navigation">
                    <ul>
                        <li>
                            <Link to="/patient/patient-123">Pasient 123</Link>
                        </li>
                    </ul>
                </div>
            </Panel>
        </Row>

    </Container>);
}
