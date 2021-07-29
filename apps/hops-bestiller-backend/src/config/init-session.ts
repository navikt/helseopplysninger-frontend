import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dbPool from '../database/connection';

/**
 *
 * Deprecated... kan slettes
 */
const cookieParser = require('cookie-parser');
const pgSession = connectPgSimple(session);
export const initSession = (app) => {
  app.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(
    session({
      store: new pgSession({
        pool: dbPool,
      }),
      name: 'session',
      resave: false,
      saveUninitialized: false,
      secret: 'sdafasdfasd',
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    })
  );
};
