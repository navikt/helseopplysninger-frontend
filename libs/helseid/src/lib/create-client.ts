import { Client, ClientMetadata, Issuer } from 'openid-client';
import { HelseIDConfig } from './helseid-config';

export async function createClient(options: HelseIDConfig): Promise<Client> {
  const issuer = await Issuer.discover(options.authority);
  const metadata: ClientMetadata = {
    client_id: options.clientId,
    grant_type: options.grantTypes,
    redirect_uris: options.redirectUris,
    token_endpoint_auth_method: 'private_key_jwt',
    token_endpoint_auth_signing_alg: 'RS256',
    response_types: ['code'],
    post_logout_redirect_uris: options.postLogoutRedirectUris,
  };
  return new issuer.Client(metadata, options.jwks);
}
