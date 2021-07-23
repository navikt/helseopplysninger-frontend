import { Express } from 'express';
import { logger } from '../logger';
import * as promClient from 'prom-client';

export enum NaisPaths {
  IS_ALIVE_PATH = '/internal/is-alive',
  IS_READY_PATH = '/internal/is-ready',
  PROMETHEUS_PATH = '/internal/prometheus',
}

export const internalRoutes = (app: Express) => {
  promClient.collectDefaultMetrics();

  logger.info('InternalRoutes loaded');

  app.get(NaisPaths.IS_ALIVE_PATH, (req, res) => {
    logger.debug(NaisPaths.IS_ALIVE_PATH + ' pinged.');
    res.send({ message: 'Alive' });
  });

  app.get(NaisPaths.IS_READY_PATH, (req, res) => {
    logger.debug(NaisPaths.IS_READY_PATH + ' pinged.');
    res.send({ message: 'Ready' });
  });

  app.get(NaisPaths.PROMETHEUS_PATH, async (req, res) => {
    const metrics = await promClient.register.metrics();
    res.contentType(promClient.register.contentType);
    res.send(metrics);
  });
};
