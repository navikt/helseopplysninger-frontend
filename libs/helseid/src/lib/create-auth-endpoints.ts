import { PassportStatic } from 'passport';
import { Client, generators, Strategy } from 'openid-client';
import { User } from './user';
import { Express } from 'express';
import { getHelseIdConfig } from './helseid-config';

export const createAuthEndpoints = (
  app: Express,
  passport: PassportStatic,
  strategy: Strategy<User, Client>
) => {
  const config = getHelseIdConfig();
  app.get(
    '/login',
    passport.authenticate('helseid', { state: generators.state() })
  );
  app.get(
    config.callbackUrl,
    passport.authenticate('helseid', {
      successRedirect: '/',
      failureRedirect: config.loginUrl,
    }),
    (req: any, res) => {
      if (req.session.redirectTo) {
        res.redirect(config.loginUrl);
      } else {
        res.redirect(config.loginUrl);
      }
    }
  );

  app.get(config.logoutUrl, (req, res) => {
    req.logOut();
    res.redirect(
      // @ts-ignore
      strategy._client.endSessionUrl({
        post_logout_redirect_uri: '/',
      })
    );
  });
};
