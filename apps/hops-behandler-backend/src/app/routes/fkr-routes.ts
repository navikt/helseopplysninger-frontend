import { Express } from 'express';
import { fkrGet } from '@navikt/fkr-client';

export async function fkrRoutes(app: Express): Promise<void> {
  app.get('/api/fkr/patients', async (req, res) => {
    const patients = await fkrGet('Patient', {});
    res.send(patients.data);
  });
}
