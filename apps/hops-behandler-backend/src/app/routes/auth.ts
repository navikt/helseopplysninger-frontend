import { Express } from 'express';
import {
  getAuthorizationUrl,
  getCodeVerifier,
  getOpenIdClient,
  HelseIDConfig,
} from '@navikt/helseid';
import { JWT } from 'jose';

const helseIdOptions: HelseIDConfig = {
  authority: process.env.HELSEID_AUTHORITY,
  clientId: process.env.HELSEID_CLIENT_ID,
  clientSecret: process.env.HELSEID_CLIENT_SECRET,
  codeVerifier: getCodeVerifier(),
  jwksFilepath: process.env.HELSEID_JWKS_FILE,
  redirectUris: process.env.HELSEID_REDIRECT_URIS,
  scopes: process.env.HELSEID_SCOPES,
};

export function authRoutes(app: Express): void {
  app.get('/api', async (req, res) => {
    const authorizationUrl = await getAuthorizationUrl(helseIdOptions);
    res.send({
      message: 'Welcome to behandlerportalen-backend!',
      authUrl: authorizationUrl,
    });
  });

  app.get('/callback', async (req, res) => {
    const client = await getOpenIdClient(helseIdOptions);
    const code_verifier = getCodeVerifier();
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(
      helseIdOptions.redirectUris,
      params,
      {
        code_verifier,
      }
    );
    res.send(JWT.decode(tokenSet.id_token));
  });
}
