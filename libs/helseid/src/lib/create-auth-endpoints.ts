import { PassportStatic } from 'passport';
import { Client, generators, Strategy } from 'openid-client';

import { Express } from 'express';
import { STRATEGY_NAME } from './constants';
import { AuthUrls, AuthUser } from '@navikt/hops-common';

export const createAuthEndpoints = (
  app: Express,
  passport: PassportStatic,
  strategy: Strategy<AuthUser, Client>,
  urls: AuthUrls
) => {
  app.get(
    urls.loginUrl,
    passport.authenticate(STRATEGY_NAME, { state: generators.state() })
  );
  app.get(
    urls.callbackUrl,
    passport.authenticate(STRATEGY_NAME, {
      failureRedirect: urls.errorUrl,
    }),
    (req: any, res) => {
      if (req.session.redirectTo) {
        res.redirect(req.session.redirectTo);
      } else {
        res.redirect(urls.indexUrl);
      }
    }
  );

  app.get(urls.logoutUrl, (req, res) => {
    req.logOut();
    res.redirect(
      // @ts-ignore
      strategy._client.endSessionUrl({
        post_logout_redirect_uri: urls.unauthenticatedUrl,
      })
    );
  });
};
