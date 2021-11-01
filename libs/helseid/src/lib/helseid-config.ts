import * as env from 'env-var';
import { JSONWebKeySet } from 'jose';
import { xmlRsaKeyToJwk } from '../utils/xml-rsa-key-to-jwk';

export type HelseIDConfig = {
  authority: string;
  clientId: string;
  clientSecret: string;
  jwks: JSONWebKeySet;
  redirectUris: string[];
  grantTypes: string;
  scopes: string;
  postLogoutRedirectUris: string;
};

export function getHelseIdConfig(): HelseIDConfig {
  const rsaPrivateKey = env.get('HELSEID_RSA_PRIVATE_KEY').asString();
  const jwks: JSONWebKeySet = { keys: [xmlRsaKeyToJwk(rsaPrivateKey)] };

  return {
    authority: env.get('HELSEID_AUTHORITY').required().asString(),
    clientId: env.get('HELSEID_CLIENT_ID').required().asString(),
    clientSecret: env.get('HELSEID_CLIENT_SECRET').asString(),
    grantTypes: env.get('HELSEID_GRANT_TYPES').asString(),
    jwks,
    redirectUris: env.get('HELSEID_REDIRECT_URIS').required().asArray(','),
    scopes: env.get('HELSEID_SCOPES').required().asString(),
    postLogoutRedirectUris: env.get('HELSEID_POST_LOGOUT_REDIRECT_URIS').asString(),
  };
}
