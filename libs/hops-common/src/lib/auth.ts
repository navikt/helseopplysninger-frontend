import { IdTokenClaims, TokenSet } from 'openid-client';

export type AuthUrls = {
  loginUrl: string;
  callbackUrl: string;
  errorUrl: string;
  logoutUrl: string;
  indexUrl: string;
  unauthenticatedUrl: string;
};
export interface AuthUser {
  claims: IdTokenClaims;
  tokenSets: {
    self: TokenSet;
  };
}
