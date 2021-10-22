import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import { logger } from '../logger';
import { internalRoutes } from './internal-routes';
import { once } from 'events';

export const bootstrapServer = async (
  routes: (app: Express) => Promise<any>,
  port: number
): Promise<Server> => {
  process.on('uncaughtException', (err) => {
    logger.fatal(err.message, {
      stack_trace: err.stack,
    });
    process.exit(1);
  });
  try {
    logger.info('Bootstrap: Started');
    const app = express();
    app.use(express.json());
    const selectedPort = process.env.SERVER_PORT || port;
    await routes(app);
    logger.info('Bootstrap: Application routes loaded');
    internalRoutes(app);
    const server = await startServer(app, selectedPort);
    server.on('error', logger.error);
    await once(server, 'listening');
    return server;
  } catch (err) {
    logger.fatal(err.message, {
      stack_trace: err.stack,
    });
    process.exit(1);
  }
};

export const startServer = async (app: Express, port: string | number): Promise<Server> => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      server.on('error', logger.error);
      logger.info(`Bootstrap: Server listening on port ${port}`);
      resolve(server);
    });
  });
};
