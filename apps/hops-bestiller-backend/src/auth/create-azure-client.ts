import {custom, Issuer} from 'openid-client';

import {azureAd} from '../config';
import httpProxy from '../proxy/http-proxy';
import logger from "../utils/logger";

const createAzureClient = async () => {
    if (httpProxy.agent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxy.agent
        });
    }
    const issuer = await Issuer.discover(azureAd.discoveryUrl);
    logger.info(`Discovered issuer ${issuer.issuer}`);
    return new issuer.Client({
        client_id: azureAd.clientId,
        redirect_uris: [azureAd.redirectUri],
        token_endpoint_auth_method: azureAd.tokenEndpointAuthMethod,
        token_endpoint_auth_signing_alg: azureAd.tokenEndpointAuthSigningAlg,
    }, azureAd.clientJwks);
};



export default createAzureClient;
