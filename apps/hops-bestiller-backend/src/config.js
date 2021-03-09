import 'dotenv/config';

const envVar = (name, required = true) => {
  if (!process.env[name] && required) {
    console.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
};

const server = {
  // port for your application
  port: envVar('PORT', false) || 2022,
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
  clientSecret: 'none',
  clientJwks: JSON.parse(envVar('AZURE_APP_JWKS', true)),

  // not provided by NAIS, must be configured
  // where the user should be redirected after authenticating at the third party
  // should be "$host + /oauth2/callback", e.g. http://localhost:3000/oauth2/callback
  redirectUri: envVar('APP_INGRESS', true) + '/oauth2/callback',

  // not provided by NAIS, must be configured
  // where your application should redirect the user after logout
  logoutRedirectUri: envVar('APP_INGRESS', true) + '/logget-out',

  // leave at default
  tokenEndpointAuthMethod: 'private_key_jwt',
  responseTypes: ['code'],
  responseMode: 'query',
  tokenEndpointAuthSigningAlg: 'RS256',
};

const reverseProxy = {
  clientId: envVar('DOWNSTREAM_API_CLIENT_ID', false),
  path: envVar('DOWNSTREAM_API_PATH', false) || 'downstream',
  url: envVar('DOWNSTREAM_API_URL', false),
};

export {
  server,
  azureAd,
  reverseProxy,
};
