import { bootstrapServer } from '@navikt/hops-common';
import { smartRoutes } from './app/smart-routes';
import * as cors from 'cors';
bootstrapServer(async (app) => {
  app.use(cors());
  await smartRoutes(app);
}, 5052).then();
