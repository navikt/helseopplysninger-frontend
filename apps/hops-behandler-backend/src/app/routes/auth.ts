import { Express } from 'express';
import {
  configureAuthentication,
  ensureAuth,
  getHelseIdConfig,
} from '@navikt/helseid';
import { AuthUrls } from '@navikt/hops-common';

export async function authRoutes(app: Express): Promise<void> {
  const config = getHelseIdConfig();
  const urls: AuthUrls = {
    callbackUrl: '/callback',
    errorUrl: '/auth/error',
    loginUrl: '/auth/login',
    logoutUrl: '/auth/logout',
    indexUrl: '/api/session',
    unauthenticatedUrl: '/auth/unauthenticated',
  };
  await configureAuthentication(app, config, urls);
  app.use(ensureAuth(urls, ['/api/session', '/api/test']));
  app.get(urls.unauthenticatedUrl, (req, res) =>
    res.send({
      what: urls.unauthenticatedUrl,
    })
  );
  app.get(urls.errorUrl, (req, res) =>
    res.send({
      what: urls.errorUrl,
    })
  );
  app.get('/api', (req, res) => res.send('Should be logged in'));
  app.get('/api/session', (req, res) => res.send(req.session));
  app.get('/api/test', (req, res) => {
    req.session['test-session'] = req.query.hello;
    res.redirect('/api');
  });
}
