import { bootstrapServer, initSession } from '@navikt/hops-common';
import { authRoutes } from './app/routes/auth';

bootstrapServer(async (app) => {
  await initSession(app);
  await authRoutes(app);
}, 8000).then();
