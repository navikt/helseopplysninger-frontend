import { IdTokenClaims, TokenSet } from 'openid-client';

export interface User {
  claims: IdTokenClaims;
  tokenSets: {
    self: TokenSet;
  };
}
