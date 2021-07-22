import * as express from 'express';
import { Express } from 'express';
import { isOnNais } from './utils';
import session, { MemoryStore, Store } from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { logger } from './logger';
import { Server } from 'http';
import * as promClient from 'prom-client';

function getRedisHost() {
  return 'redis.' + process.env.NAIS_NAMESPACE + '.svc.cluster.local';
}

function getSessionStore(session): Store {
  if (isOnNais()) {
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient({ host: getRedisHost() });
    return new RedisStore({
      client: redisClient,
    });
  } else {
    return new MemoryStore();
  }
}

export const initSession = (app: Express) => {
  app.set('trust proxy', 1);
  app.use(require('cookie-parser')());
  app.use(
    session({
      store: getSessionStore(session),
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

export const bootstrapServer = async (
  routes: (app: Express) => Promise<any>,
  port: number
): Promise<Server> => {
  try {
    logger.info('Bootstrap: Started');
    const app = express();
    app.use(express.json());
    await routes(app);
    logger.info('Bootstrap: Routes started');
    internalRoutes(app);
    return await startServer(app, port);
  } catch (e) {
    logger.fatal(e.message, {
      stack_trace: e.stack,
    });
    process.exit(1);
  }
};

export const startServer = async (
  app: Express,
  port: number
): Promise<Server> => {
  const selectedPort = process.env.SERVER_PORT || port;
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port, () => {
        logger.info(`Bootstrap: Server listening on port ${selectedPort}`);
      })
      .once('listening', () => resolve(server))
      .once('error', reject);
    server.on('error', logger.error);
  });
};

export enum NaisPaths {
  IS_ALIVE_PATH = '/internal/health',
  IS_READY_PATH = '/internal/health',
  PROMETHEUS_PATH = '/internal/prometheus',
}

export const internalRoutes = (app: Express) => {
  promClient.collectDefaultMetrics();
  logger.info('InternalRoutes: Loaded');
  app.get(NaisPaths.IS_ALIVE_PATH, (req, res) => {
    res.send({ message: 'Ready' });
  });

  app.get(NaisPaths.IS_READY_PATH, (req, res) => {
    res.send({ message: 'Ready' });
  });

  app.get(NaisPaths.PROMETHEUS_PATH, async (req, res) => {
    const metrics = await promClient.register.metrics();
    res.contentType(promClient.register.contentType);
    res.send(metrics);
  });
};
