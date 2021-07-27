import passport from 'passport';
import { Express } from 'express';
import { createClient } from './create-client';
import { HelseIDConfig } from './helseid-config';
import { helseidStrategy } from './helseid-strategy';
import { createAuthEndpoints } from './create-auth-endpoints';
import { STRATEGY_NAME } from './constants';
import { AuthUrls, AuthUser } from '@navikt/hops-common';

import { Client, Strategy } from 'openid-client';

export const configureAuthentication = async (
  app: Express,
  config: HelseIDConfig,
  urls: AuthUrls
): Promise<Strategy<AuthUser, Client>> => {
  app.use(passport.initialize());
  app.use(passport.session());
  const client = await createClient(config);
  const strategy = await helseidStrategy(client, config);

  passport.use(STRATEGY_NAME, strategy);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  createAuthEndpoints(app, passport, strategy, urls);
  return strategy;
};
