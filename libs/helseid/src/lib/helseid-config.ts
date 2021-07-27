import * as env from 'env-var';
import { JSONWebKey, JSONWebKeySet } from 'jose';

export type HelseIDConfig = {
  authority: string;
  clientId: string;
  clientSecret: string;
  jwks: JSONWebKeySet;
  redirectUris: string[];
  scopes: string;
};

export function getHelseIdConfig(): HelseIDConfig {
  return {
    authority: env.get('HELSEID_AUTHORITY').asString(),
    clientId: env.get('HELSEID_CLIENT_ID').asString(),
    clientSecret: env.get('HELSEID_CLIENT_SECRET').asString(),
    jwks: { keys: [env.get('HELSEID_JWKS').asJsonObject() as JSONWebKey] },
    redirectUris: env.get('HELSEID_REDIRECT_URIS').asArray(','),
    scopes: env.get('HELSEID_SCOPES').asString(),
  };
}
