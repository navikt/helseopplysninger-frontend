import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';

import { getHelseIdConfig } from './helseid-config';
import { User } from './user';

export default async function helseidStrategy(
  client: Client
): Promise<Strategy<UserinfoResponse, Client>> {
  const config = getHelseIdConfig();
  const verify = (
    tokenSet: TokenSet,
    done: (err: any, user?: User) => void
  ) => {
    if (tokenSet.expired()) {
      return done(undefined, undefined);
    }
    const user: User = {
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
