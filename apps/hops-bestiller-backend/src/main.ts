import defaults from './routes/defaults';
import { initPassport } from './config/init-passport';
import { database, kafkaTopics } from './config';
import {
  bootstrapServer,
  getKafkaClient,
  kafkaConsume,
  logger,
} from '@navikt/hops-common';
import dbPool from './database/connection';
import runMigrations from './database/run-migration';
import path from 'path';
import patient from './routes/patient';
import bestill from './routes/bestill';
import { attachWsServer, wsBroadcast } from './ws/wsServer';
import { waitOnDatabase } from './database/wait-on-database';

bootstrapServer(async (app) => {
  await waitOnDatabase(database);
  const result = await dbPool.query('SELECT NOW() as message');
  logger.info('Bootstrap, db connected servertime: ' + result.rows[0].message);
  await kafkaConsume(
    getKafkaClient().consumer({ groupId: 'bestiller-local' }),
    kafkaTopics.bestillinger,
    (message) => {
      wsBroadcast(JSON.parse(message.value.toString()));
    }
  );
  await initPassport(app);
  [bestill, defaults, patient].forEach((f) => f(app));
  await runMigrations(path.join(__dirname, 'migrations/user'));
}, 2022).then(attachWsServer);
