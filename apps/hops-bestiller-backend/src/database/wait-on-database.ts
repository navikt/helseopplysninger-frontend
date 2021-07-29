import waitOn from 'wait-on';
import dbPool from './connection';
import { logger } from '@navikt/hops-common';

export const waitOnDatabase = async (databaseConfig) => {
  await waitOn({
    resources: [['tcp', databaseConfig.host, databaseConfig.port].join(':')],
    timeout: 30000, // total timeout før vi forventer at databasen skal være oppe
    delay: 3000, // venter 3 sekunder før vi prøver cloudsql
    interval: 1000, // spørr bare hvert sekund
  });
  const result = await dbPool.query('SELECT NOW() as message');
  logger.info('Bootstrap, db connected servertime: ' + result.rows[0].message);
};
