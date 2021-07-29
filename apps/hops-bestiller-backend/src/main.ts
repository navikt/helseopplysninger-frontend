import defaults from './routes/defaults';
import { initPassport } from './config/init-passport';
import { database, kafkaTopics } from './config';
import { bootstrapServer, getKafkaClient, initSession, kafkaConsume } from '@navikt/hops-common';
import runMigrations from './database/run-migration';
import { join } from 'path';
import patient from './routes/patient';
import bestill from './routes/bestill';
import { attachWsServer, wsBroadcast } from './ws/wsServer';
import { waitOnDatabase } from './database/wait-on-database';

bootstrapServer(async (app) => {
  const kafkaConsumer = getKafkaClient().consumer({ groupId: 'bestiller-local' });
  await waitOnDatabase(database);
  await initSession(app);
  await initPassport(app);
  [bestill, defaults, patient].forEach((f) => f(app));
  await runMigrations(join(__dirname, 'migrations/user'));
  await kafkaConsume(kafkaConsumer, kafkaTopics.bestillinger, (message) => {
    wsBroadcast(JSON.parse(message.value.toString()));
  });
}, 2022).then(attachWsServer);
