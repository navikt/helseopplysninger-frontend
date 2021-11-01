import { bootstrapServer, initSession } from '@navikt/hops-common';
import { authRoutes } from './app/routes/auth';
import { fhirRoutes } from './app/routes/fhir-routes';
import { serverConfig } from './app/server-config';
import { fkrRoutes } from './app/routes/fkr-routes';

bootstrapServer(async (app) => {
  await serverConfig(app);
  await initSession(app, true);
  await authRoutes(app);
  await fhirRoutes(app);
  await fkrRoutes(app);
}, 8000).then();
