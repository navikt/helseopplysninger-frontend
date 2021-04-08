import 'dotenv/config';
import logger from './utils/logger';
import fs from 'fs';
import {PoolConfig} from "pg";

const envVar = (name, required = true) => {
    if (!process.env[name] && required) {
        logger.error(`Missing required environment variable '${name}'`);
        process.exit(1);
    }
    return process.env[name];
};

const server = {
    port: envVar('SERVER_PORT', false) || 2022,
    ingress: envVar('APP_INGRESS', true),
    sessionKey: envVar('SESSION_KEY', false) || 'sadfasdf',
    cookieName: 'security-blueprints-login',
};

const azureAd = {
    discoveryUrl: envVar('AZURE_APP_WELL_KNOWN_URL', true),
    clientId: envVar('AZURE_APP_CLIENT_ID', true),
    clientSecret: envVar('AZURE_APP_CLIENT_SECRET', true),
    clientJwks: JSON.parse(envVar('AZURE_APP_JWKS', true)),
    redirectUri: envVar('APP_INGRESS', true) + '/api/oauth2/callback',
    logoutRedirectUri: envVar('APP_INGRESS', true) + '/api/logget-out',
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
const kafkaConfig: { brokers: string[], ssl?: any } = {
    brokers: envVar('KAFKA_BROKERS', true).split(','),
};
let kafkaTopics = {
    bestillinger: envVar('KAFKA_TOPIC_BESTILLING', true),
};

if (process.env.KAFKA_SECURITY_ENABLED) {
    // Henter SSL-config på nais.
    kafkaConfig.ssl = {
        rejectUnauthorized: false,
        ca: [fs.readFileSync(envVar('KAFKA_CA_PATH', true), 'utf-8')],
        key: fs.readFileSync(envVar('KAFKA_PRIVATE_KEY_PATH', true), 'utf-8'),
        cert: fs.readFileSync(envVar('KAFKA_CERTIFICATE_PATH', true), 'utf-8'),
    };
}
export {
    azureAd,
    database,
    server,
    kafkaConfig,
    kafkaTopics,
};
