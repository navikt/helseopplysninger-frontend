import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';
import { HelseIDConfig } from './helseid-config';
import { AuthUser } from '@navikt/hops-common';

export async function helseidStrategy(
  client: Client,
  config: HelseIDConfig
): Promise<Strategy<UserinfoResponse, Client>> {
  const verify = (
    tokenSet: TokenSet,
    done: (err: any, user?: AuthUser) => void
  ) => {
    if (tokenSet.expired()) {
      return done(undefined, undefined);
    }
    const user: AuthUser = {
      claims: tokenSet.claims(),
      tokenSets: {
        self: tokenSet,
      },
    };
    return done(undefined, user);
  };
  const options = {
    client: client,
    params: {
      scope: config.scopes,
    },
    usePKCE: 'S256',
  };
  return new Strategy(options, verify);
}
