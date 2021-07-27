import { Client, ClientMetadata, Issuer } from 'openid-client';
import { HelseIDConfig } from './helseid-config';

export async function createClient(options: HelseIDConfig): Promise<Client> {
  const issuer = await Issuer.discover(options.authority);
  const metadata: ClientMetadata = {
    client_id: options.clientId,
    client_secret: options.clientSecret,
    redirect_uris: options.redirectUris,
    response_types: ['code'],
  };
  return new issuer.Client(metadata, options.jwks);
}
