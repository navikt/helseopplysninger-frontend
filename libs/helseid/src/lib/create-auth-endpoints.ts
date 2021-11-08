import { PassportStatic } from 'passport';
import { Client, generators, Strategy } from 'openid-client';

import { Express } from 'express';
import { STRATEGY_NAME } from './constants';
import { AuthPaths, AuthStatus, AuthUser, fullUrl, logger } from '@navikt/hops-common';

export const createAuthEndpoints = (
  app: Express,
  passport: PassportStatic,
  strategy: Strategy<AuthUser, Client>,
  authPaths: AuthPaths
) => {
  // @ts-ignore
  const client: Client = strategy._client;

  app.get('/auth', (req, res) => {
    const fullUrls = {};
    Object.keys(authPaths).forEach((key) => {
      fullUrls[key] = fullUrl(req, authPaths[key]);
    });
    res.send(fullUrls);
  });
  app.get(authPaths.loginPath, (req, res) => {
    return passport.authenticate(STRATEGY_NAME, {
      state: generators.state(),
    })(req, res);
  });

  app.get(
    authPaths.callbackPath,
    passport.authenticate(STRATEGY_NAME, {
      failureRedirect: authPaths.errorPath,
    }),
    (req: any, res) => {
      if (req.session.redirectTo) {
        res.redirect(req.session.redirectTo);
      } else {
        res.redirect(authPaths.indexPath);
      }
    }
  );

  app.get(authPaths.logoutPath, (req, res) => {
    req.logout();
    res.redirect(authPaths.unauthenticatedPath);
    /*
    res.redirect(
      // @ts-ignore
      strategy._client.endSessionUrl({
        post_logout_redirect_uri: fullUrl(req, urls.unauthenticatedUrl),
      })
    );
     */
  });

  app.get(authPaths.statusPath, (req, res) => {
    const status: AuthStatus = {
      isAuthenticated: req.isAuthenticated(),
      loginUrl: fullUrl(req, authPaths.loginPath),
      logoutUrl: fullUrl(req, authPaths.logoutPath),
    };
    res.send(status);
  });
};
