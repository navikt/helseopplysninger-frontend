import { TokenSet } from 'openid-client';
import { AuthPaths, logger, NaisPaths } from '@navikt/hops-common';
import { NextFunction, Request, Response } from 'express';

const hasValidAccessToken = async (req, key) => {
  if (req?.user?.tokenSets) {
    return new TokenSet(req.user.tokenSets[key]).expired() === false;
  }
  return false;
};
export const ensureAuth = (authUrls: AuthPaths, openUrls: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const whitelist = openUrls || [];
    whitelist.push(authUrls.errorPath);
    whitelist.push(authUrls.callbackPath);
    whitelist.push(authUrls.unauthenticatedPath);
    whitelist.push(NaisPaths.PROMETHEUS_PATH);
    whitelist.push(NaisPaths.IS_ALIVE_PATH);
    whitelist.push(NaisPaths.IS_READY_PATH);
    if (whitelist.includes(req.path)) {
      next();
    } else if (req.isAuthenticated()) {
      const hasValidToken = await hasValidAccessToken(req, 'self');
      if (hasValidToken) {
        next();
      } else {
        req.session.destroy((err) => logger.error('Failed to destroy session', err));
        res.redirect(authUrls.loginPath);
      }
    } else {
      req.session['redirectTo'] = req.url;
      res.status(401).send('unauthorized');
    }
  };
};
