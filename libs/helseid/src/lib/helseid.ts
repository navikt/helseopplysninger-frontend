import {generators, Issuer} from "openid-client";
import {readFileSync} from "fs";
import {join} from "path";
import {JSONWebKeySet} from "jose";

let client;
export type HelseIDConfig = {
    jwksFilepath: string;
    authority: string;
    clientId: string;
    clientSecret: string;
    scopes: string;
    redirectUris: string;
    codeVerifier: string;
}
// this need to be placed into the user session.
const code_verifier = generators.codeVerifier();

function getCodeVerifier() {
    return code_verifier
}

function resolveHome(filepath) {
    if (filepath[0] === '~') {
        return join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

function getJSONWebKeySet(filepath): JSONWebKeySet {
    const resolved = resolveHome(filepath);
    const fileContent = readFileSync(resolved, "utf-8");
    const jwk = JSON.parse(fileContent)
    const jwks: JSONWebKeySet = {
        keys: []
    }
    jwks.keys.push(jwk);
    return jwks
}

async function getOpenIdClient(options: HelseIDConfig) {
    if (!client) {

        const jwks = getJSONWebKeySet(options.jwksFilepath)
        const issuer = await Issuer.discover(options.authority);
        client = new issuer.Client({
            client_id: options.clientId,
            client_secret: options.clientSecret,
        }, jwks);
    }
    return client;
}

async function getAuthorizationUrl(options: HelseIDConfig) {
    const code_challenge = generators.codeChallenge(options.codeVerifier);
    const client = await getOpenIdClient(options)
    return client.authorizationUrl({
        scope: options.scopes,
        redirect_uri: options.redirectUris,
        code_challenge,
        code_challenge_method: 'S256',
    });
}

export {
    getCodeVerifier,
    getAuthorizationUrl,
    getOpenIdClient
}
