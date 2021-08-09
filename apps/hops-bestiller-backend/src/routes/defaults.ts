import { Express } from 'express';
import getUserInfoFromRequest from '../auth/get-user-info-from-request';
import { azureAd } from '../config';
import { BackendPaths } from '@navikt/bestiller-types';
import { fullUrl } from '@navikt/hops-common';

function defaults(app: Express): void {
  app.get(BackendPaths.PATH, (req: any, res) => {
    res.send({
      timestamp: new Date().toISOString(),
      application: 'hops-bestiller-backend!',
      isAuthenticated: req.isAuthenticated(),
      azureAdClientId: azureAd.clientId,
      loginUrl: fullUrl(req, '/api/oauth2/login'),
      user: req.user || null,
    });
  });

  app.get(BackendPaths.USER_PATH, (req, res) => {
    if (req.user) {
      res.send(getUserInfoFromRequest(req));
    } else {
      res.status(401).send({
        innlogget: false,
      });
    }
  });
}

export default defaults;
