import React from 'react';
import { BackendPaths } from '@navikt/bestiller-types';
import { Button, Cell, ContentContainer, Grid, Link } from '@navikt/ds-react';

export const LoginView = () => {
  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12}>
          <br />
        </Cell>
      </Grid>
      <Grid style={{ textAlign: 'center' }}>
        <Link href={BackendPaths.LOGIN_PATH}>
          <Button variant={'primary'}>Logg inn</Button>
        </Link>
      </Grid>
    </ContentContainer>
  );
};
