import { TokenSet } from 'openid-client';
import { AuthUrls, logger, NaisPaths } from '@navikt/hops-common';
import { NextFunction, Request, Response } from 'express';

const hasValidAccessToken = async (req, key) => {
  if (req?.user?.tokenSets) {
    return (await new TokenSet(req.user.tokenSets[key]).expired()) === false;
  }
  return false;
};
export const ensureAuth = (authUrls: AuthUrls, openUrls: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session);
    const whitelist = openUrls || [];
    whitelist.push(authUrls.errorUrl);
    whitelist.push(authUrls.callbackUrl);
    whitelist.push(authUrls.unauthenticatedUrl);
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
        req.session.destroy((err) =>
          logger.error('Failed to destroy session', err)
        );
        res.redirect(authUrls.loginUrl);
      }
    } else {
      req.session['redirectTo'] = req.url;
      res.status(401).send('unauthorized');
    }
  };
};
