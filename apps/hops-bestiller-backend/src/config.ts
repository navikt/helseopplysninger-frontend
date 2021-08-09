import 'dotenv/config';
import { logger } from '@navikt/hops-common';
import { PoolConfig } from 'pg';

const envVar = (name, required = true) => {
  if (!process.env[name] && required) {
    logger.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
};

const server = {
  port: envVar('SERVER_PORT', false) || 2022,
  sessionKey: envVar('SESSION_KEY', false) || 'sadfasdf',
  cookieName: 'security-blueprints-login',
};

const azureAd = {
  discoveryUrl: envVar('AZURE_APP_WELL_KNOWN_URL', true),
  clientId: envVar('AZURE_APP_CLIENT_ID', true),
  clientSecret: envVar('AZURE_APP_CLIENT_SECRET', true),
  clientJwks: JSON.parse(envVar('AZURE_APP_JWKS', true)),
  redirectPath: '/api/oauth2/callback',
  logoutRedirectPath: '/api/logget-out',
  tokenEndpointAuthMethod: 'private_key_jwt',
  responseTypes: ['code'],
  responseMode: 'query',
  tokenEndpointAuthSigningAlg: 'RS256',
};

const database: PoolConfig = {
  user: envVar('DB_USERNAME', true),
  host: envVar('DB_HOST', true),
  database: envVar('DB_DATABASE', true),
  password: envVar('DB_PASSWORD', true),
  port: parseInt(envVar('DB_PORT', true)),
};

let kafkaTopics = {
  bestillinger: envVar('KAFKA_TOPIC_BESTILLING', true),
};

export { azureAd, database, server, kafkaTopics };
