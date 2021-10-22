import { Express } from 'express';
import { BackendPaths } from '@navikt/bestiller-types';
import { bestillerFixtures } from '@navikt/fixtures';

function patientRoutes(app: Express): void {
  app.get(BackendPaths.PATIENT_EVENTS, (req, res) => {
    res.json(bestillerFixtures.events);
  });
  app.get(BackendPaths.PATIENT_STATUS_PRESENS, (req, res) => {
    res.send(bestillerFixtures.statusPresens);
  });
}

export default patientRoutes;
