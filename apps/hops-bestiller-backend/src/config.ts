import 'dotenv/config';
import logger from './utils/logger';
import fs from 'fs';
import {PoolConfig} from "pg";
import {ClientAuthMethod} from "openid-client";

const envVar = (name, required = true) => {
    if (!process.env[name] && required) {
        logger.error(`Missing required environment variable '${name}'`);
        process.exit(1);
    }
    return process.env[name];
};

const server = {
    // port for your application
    port: envVar('SERVER_PORT', false) || 2022,
    ingress: envVar('APP_INGRESS', true),
    // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
    proxy: envVar('HTTP_PROXY', false),

    // should be set to a random key of significant length for signing session ID cookies
    sessionKey: envVar('SESSION_KEY', false) || 'sadfasdf',

    // name of the cookie, set to whatever your want
    cookieName: 'security-blueprints-login',
};

const azureAd = {
    // automatically provided by NAIS at runtime
    discoveryUrl: envVar('AZURE_APP_WELL_KNOWN_URL', true),
    clientId: envVar('AZURE_APP_CLIENT_ID', true),
    clientSecret: envVar('AZURE_APP_CLIENT_SECRET', true),
    clientJwks: JSON.parse(envVar('AZURE_APP_JWKS', true)),

    // not provided by NAIS, must be configured
    // where the user should be redirected after authenticating at the third party
    // should be "$host + /oauth2/callback", e.g. http://localhost:3000/oauth2/callback
    redirectUri: envVar('APP_INGRESS', true) + '/api/oauth2/callback',

    // not provided by NAIS, must be configured
    // where your application should redirect the user after logout
    logoutRedirectUri: envVar('APP_INGRESS', true) + '/api/logget-out',

    // leave at default
    tokenEndpointAuthMethod: 'private_key_jwt' as ClientAuthMethod,
    responseTypes: ['code'],
    responseMode: 'query',
    tokenEndpointAuthSigningAlg: 'RS256',
};

const reverseProxy = {
    clientId: envVar('DOWNSTREAM_API_CLIENT_ID', false),
    path: envVar('DOWNSTREAM_API_PATH', false) || 'downstream',
    url: envVar('DOWNSTREAM_API_URL', false),
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
    reverseProxy,
    server,
    kafkaConfig,
    kafkaTopics,
};
