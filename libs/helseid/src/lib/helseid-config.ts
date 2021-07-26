import * as env from 'env-var';
import { join } from 'path';
import { JSONWebKey, JSONWebKeySet } from 'jose';
import { readFileSync } from 'fs';

export type HelseIDConfig = {
  jwks: JSONWebKeySet;
  authority: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
  redirectUris: string;
  loginUrl: string;
  callbackUrl: string;
  logoutUrl: string;
};

export function getHelseIdConfig(): HelseIDConfig {
  return {
    authority: env.get('HELSEID_AUTHORITY').asString(),
    clientId: env.get('HELSEID_CLIENT_ID').asString(),
    clientSecret: env.get('HELSEID_CLIENT_SECRET').asString(),
    jwks: {
      keys: [env.get('HELSEID_JWKS').asJsonObject() as JSONWebKey],
    },
    redirectUris: env.get('HELSEID_REDIRECT_URIS').asString(),
    scopes: env.get('HELSEID_SCOPES').asString(),
    loginUrl: '/',
    callbackUrl: '/callback',
    logoutUrl: '/logout',
  };
}

function resolveHome(filepath) {
  if (filepath[0] === '~') {
    return join(process.env.HOME, filepath.slice(1));
  }
  return filepath;
}

function getJSONWebKeySet(filepath): JSONWebKeySet {
  const resolved = resolveHome(filepath);
  const fileContent = readFileSync(resolved, 'utf-8');
  const jwk = JSON.parse(fileContent);
  const jwks: JSONWebKeySet = {
    keys: [],
  };
  jwks.keys.push(jwk);
  return jwks;
}
