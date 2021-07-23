import session, { MemoryStore, Store } from 'express-session';
import * as env from 'env-var';
import { isOnNais } from '../utils';
import { Express } from 'express';
import connectRedis from 'connect-redis';
import redis from 'redis';

function getSessionStore(session, forceRedis): Store {
  const redisConfig: { host: string } = {
    host: env.get('REDIS_HOST').default('localhost').asString(),
  };
  if (isOnNais() || forceRedis) {
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient(redisConfig);
    return new RedisStore({
      client: redisClient,
    });
  } else {
    return new MemoryStore();
  }
}

export const initSession = (app: Express, forceRedis?: boolean) => {
  app.set('trust proxy', 1);
  app.use(require('cookie-parser')());
  app.use(
    session({
      store: getSessionStore(session, forceRedis),
      name: 'session',
      resave: false,
      saveUninitialized: true,
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
