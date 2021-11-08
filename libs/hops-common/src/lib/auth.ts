import { IdTokenClaims, TokenSet } from 'openid-client';

export type AuthPaths = {
  loginPath: string;
  callbackPath: string;
  errorPath: string;
  logoutPath: string;
  indexPath: string;
  unauthenticatedPath: string;
  statusPath: string;
};

export interface AuthUser {
  claims: IdTokenClaims;
  tokenSets: {
    self: TokenSet;
  };
}

export interface AuthStatus {
  isAuthenticated: boolean;
  loginUrl: string;
  logoutUrl: string;
}
