import { Express } from 'express';
import { configureAuthentication, ensureAuth } from '@navikt/helseid';
import { AuthPaths } from '@navikt/hops-common';
import { ensureBasicAuth } from './basic-auth';
import { isOnNais } from '@navikt/hops-common';

export async function authRoutes(app: Express): Promise<void> {
  const urls: AuthPaths = {
    callbackPath: '/callback',
    errorPath: '/auth/error',
    loginPath: '/auth/login',
    logoutPath: '/auth/logout',
    indexPath: '/api/session',
    unauthenticatedPath: '/auth/unauthenticated',
    statusPath: '/api/status',
  };
  await configureAuthentication(app, urls);
  app.use(ensureAuth(urls, ['/api/session', '/api/test']));
  if (isOnNais()) {
    app.use('/api/*', ensureBasicAuth);
    app.use('/auth/*', ensureBasicAuth);
  }
  app.get(urls.unauthenticatedPath, (req, res) =>
    res.send({
      what: urls.unauthenticatedPath,
    })
  );
  app.get(urls.errorPath, (req, res) =>
    res.send({
      what: urls.errorPath,
    })
  );

  app.get('/api', (req, res) => res.send('Should be logged in'));
  app.get('/api/session', (req, res) => res.send(req.session));
}
