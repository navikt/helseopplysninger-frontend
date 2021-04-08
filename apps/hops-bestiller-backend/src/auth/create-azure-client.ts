import {ClientMetadata, Issuer} from 'openid-client';
import {azureAd} from '../config';
import logger from "../utils/logger";

const createAzureClient = async () => {
    const issuer = await Issuer.discover(azureAd.discoveryUrl);
    logger.info(`Discovered issuer ${issuer.issuer}`);
    const jwks = azureAd.clientJwks;
    const metadata: ClientMetadata = {
        client_id: azureAd.clientId,
        client_secret: azureAd.clientSecret,
        redirect_uris: [azureAd.redirectUri],
        token_endpoint_auth_method: 'client_secret_post',
    }
    return new issuer.Client(metadata, jwks);
};


export default createAzureClient;
