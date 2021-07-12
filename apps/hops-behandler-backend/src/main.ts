/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import {getAuthorizationUrl, getCodeVerifier, getOpenIdClient, HelseIDConfig} from '@navikt/helseid';
import {JWT} from "jose";
import internalRoutes from "./app/routes/internals";

const app = express();
const helseIdOptions: HelseIDConfig = {
    authority: process.env.HELSEID_AUTHORITY,
    clientId: process.env.HELSEID_CLIENT_ID,
    clientSecret: process.env.HELSEID_CLIENT_SECRET,
    codeVerifier: getCodeVerifier(),
    jwksFilepath: process.env.HELSEID_JWKS_FILE,
    redirectUris: process.env.HELSEID_REDIRECT_URIS,
    scopes: process.env.HELSEID_SCOPES,
}
app.get('/api', async (req, res) => {
    const authorizationUrl = await getAuthorizationUrl(helseIdOptions)
    res.send({
        message: 'Welcome to behandlerportalen-backend!',
        authUrl: authorizationUrl
    });
});

app.get("/callback", async (req, res) => {
    const client = await getOpenIdClient(helseIdOptions)
    const code_verifier = getCodeVerifier()
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(helseIdOptions.redirectUris, params, {code_verifier});
    console.log('received and validated tokens %j', tokenSet);
    console.log('validated ID Token claims %j', tokenSet.claims());
    console.log("id_token", tokenSet.id_token);
    res.send(JWT.decode(tokenSet.id_token))
});
internalRoutes(app);
const port = process.env.port || 8000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
