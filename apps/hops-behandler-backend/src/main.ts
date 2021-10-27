import { bootstrapServer, initSession } from '@navikt/hops-common';
import { authRoutes } from './app/routes/auth';
import { fhirRoutes } from './app/routes/fhir-routes';

bootstrapServer(async (app) => {
  await initSession(app, true);
  await authRoutes(app);
  await fhirRoutes(app);
}, 8000).then();
