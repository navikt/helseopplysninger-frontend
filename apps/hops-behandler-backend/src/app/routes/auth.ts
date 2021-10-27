import { Express } from 'express';
import { configureAuthentication, ensureAuth } from '@navikt/helseid';
import { AuthUrls } from '@navikt/hops-common';
import { ensureBasicAuth } from './basic-auth';

export async function authRoutes(app: Express): Promise<void> {
  const urls: AuthUrls = {
    callbackUrl: '/callback',
    errorUrl: '/auth/error',
    loginUrl: '/auth/login',
    logoutUrl: '/auth/logout',
    indexUrl: '/api/session',
    unauthenticatedUrl: '/auth/unauthenticated',
  };
  await configureAuthentication(app, urls);
  app.use(ensureAuth(urls, ['/api/session', '/api/test']));
  //app.use('/api/*', ensureBasicAuth);
  //app.use('/auth/*', ensureBasicAuth);
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
