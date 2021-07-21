import { bootstrapServer, initSession } from '@navikt/hops-common';
import { authRoutes } from './app/routes/auth';

bootstrapServer(async (app) => {
  initSession(app);
  authRoutes(app);
}, 8000).then();
