import React from 'react';
import { Link } from 'react-router-dom';
import { Cell, ContentContainer, Grid, Panel } from '@navikt/ds-react';

export const HelloWorldView = () => {
  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12} sm={12} lg={12}>
          <Panel>
            <header>
              <h1>Bestilling av Helseopplysninger</h1>
            </header>
            <div role="navigation">
              <ul>
                <li>
                  <Link to="/patient/patient-123/table">Pasient 123</Link>
                </li>
              </ul>
            </div>
          </Panel>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
