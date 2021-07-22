import fs from 'fs';
import * as env from 'env-var';
import { isOnNais } from './utils';
import {
  Consumer,
  Kafka,
  KafkaMessage,
  Producer,
  RecordMetadata,
} from 'kafkajs';
import { logger } from './logger';

let kafkaClient;
export const getKafkaClient = () => {
  if (!kafkaClient) {
    const kafkaConfig: { brokers: string[]; ssl?: any; clientId?: string } = {
      clientId: env.get('NAIS_CLIENT_ID').default('local').asString(),
      brokers: env.get('KAFKA_BROKERS').required().asArray(','),
    };

    if (isOnNais()) {
      // Henter SSL-config på nais.
      const caPath = env.get('KAFKA_CA_PATH').required().asString();
      const keyPath = env.get('KAFKA_PRIVATE_KEY_PATH').required().asString();
      const certPath = env.get('KAFKA_CERTIFICATE_PATH').required().asString();

      kafkaConfig.ssl = {
        rejectUnauthorized: false,
        ca: [fs.readFileSync(caPath, 'utf-8')],
        key: fs.readFileSync(keyPath, 'utf-8'),
        cert: fs.readFileSync(certPath, 'utf-8'),
      };
    }
    kafkaClient = new Kafka(kafkaConfig);
  }
  return kafkaClient;
};

export const kafkaConsume = async (
  consumer: Consumer,
  topic,
  onMessage: (m: KafkaMessage) => void
): Promise<Consumer> => {
  logger.info('Trying to subscribed to Kafka-topic: ' + topic);
  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { size, key } = message;
      logger.debug('KafkaReceivedMessage' + key, { topic, partition, size });
      onMessage(message);
    },
  });
  return consumer;
};
export const kafkaProduce = async (
  producer: Producer,
  topic: string,
  message: any
): Promise<RecordMetadata[]> => {
  await producer.connect();
  const metadata = await producer.send({
    topic,
    messages: [
      {
        key: null,
        value: JSON.stringify(message),
      },
    ],
  });
  await producer.disconnect();

  return metadata;
};
