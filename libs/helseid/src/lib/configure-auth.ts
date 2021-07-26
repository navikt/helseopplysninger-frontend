import passport from 'passport';
import { Client, Strategy } from 'openid-client';
import { Express } from 'express';
import createClient from './create-client';
import { User } from './user';
import { getHelseIdConfig } from './helseid-config';
import helseidStrategy from './helseid-strategy';
import { createAuthEndpoints } from './create-auth-endpoints';
import bodyParser from 'body-parser';

export const configureAuthentication = async (
  app: Express
): Promise<Strategy<User, Client>> => {
  app.use(passport.initialize());
  app.use(passport.session());
  const config = getHelseIdConfig();
  const client = await createClient(config);
  const strategy = await helseidStrategy(client);

  passport.use('helseid', strategy);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  createAuthEndpoints(app, passport, strategy);
  return strategy;
};
