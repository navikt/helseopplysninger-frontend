import pullResourceRoute from './app/routes/pull-resource-route';
import indexRoute from './app/routes/index-route';
import { bootstrapServer } from '@navikt/hops-common';

bootstrapServer(async (app) => {
  await pullResourceRoute(app);
  await indexRoute(app);
}, 3333).then();
