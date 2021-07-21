import pullResourceRoute from './app/routes/pull-resource-route';
import indexRoute from './app/routes/index-route';
import { bootstrapServer } from '@navikt/hops-common';

bootstrapServer(async (app) => {
  pullResourceRoute(app);
  indexRoute(app);
}, 3333).then();
