import session, { MemoryStore, Store } from 'express-session';
import cookieParser from 'cookie-parser';
import * as env from 'env-var';
import { isOnNais } from '../utils';
import { Express } from 'express';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { logger } from '../logger';

function getSessionStore(session, forceRedis): Store {
  const redisConfig: { host: string } = {
    host: env.get('REDIS_HOST').default('localhost').asString(),
  };
  if (isOnNais() || forceRedis) {
    logger.info('Using Redis session store at ' + redisConfig.host + '.');
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient(redisConfig);
    return new RedisStore({
      client: redisClient,
      ttl: 43200,
    });
  } else {
    logger.info('Using memory session store.');
    return new MemoryStore();
  }
}

export const initSession = (app: Express, forceRedis?: boolean) => {
  app.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(
    session({
      store: getSessionStore(session, forceRedis),
      name: 'helseopplysninger',
      resave: false,
      saveUninitialized: false,
      secret: 'sdafasdfasd',
      cookie: {
        httpOnly: true,
        secure: isOnNais(),
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
      },
    })
  );
};
