import { Express } from 'express';
import passport from 'passport';
import createAzureClient from '../auth/create-azure-client';
import createStrategy from '../auth/strategy';
import bodyParser from 'body-parser';
import { BackendPaths } from '@navikt/bestiller-types';

export async function initPassport(app: Express): Promise<void> {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());
  const azureAuthClient = await createAzureClient();
  const strategyName = 'azureOidc';
  passport.use(strategyName, createStrategy(azureAuthClient));
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  app.use((req, res, next) => {
    next();
  });

  app.get(
    BackendPaths.LOGIN_PATH,
    (req, res, next) => {
      passport.authenticate(strategyName, {
        successRedirect: '/',
        failureRedirect: '/error',
      })(req, res, next);
    },
    (req, res) => {
      res.send({ result: 'succeeded' });
    }
  );

  app.get(
    BackendPaths.CALLBACK_PATH,
    (req, res, next) => {
      passport.authenticate(strategyName, {
        successRedirect: '/',
        failureRedirect: '/error',
      })(req, res, next);
    },
    (req, res) => {
      res.redirect(BackendPaths.PATH);
    }
  );
}
