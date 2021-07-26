import { TokenSet } from 'openid-client';
import { getHelseIdConfig } from './helseid-config';
import { logger, NaisPaths } from '@navikt/hops-common';

const hasValidAccessToken = async (req, key) => {
  if (req?.user?.tokenSets) {
    return (await new TokenSet(req.user.tokenSets[key]).expired()) === false;
  }
  return false;
};

export const ensureLoggedIn = async (req, res, next) => {
  const config = getHelseIdConfig();
  const openUrls = [
    '/',
    '/some',
    config.callbackUrl,
    NaisPaths.PROMETHEUS_PATH,
    NaisPaths.IS_ALIVE_PATH,
    NaisPaths.IS_READY_PATH,
  ];
  if (openUrls.includes(req.path)) {
    next();
  } else if (req.isAuthenticated()) {
    const hasValidToken = await hasValidAccessToken(req, 'self');
    if (hasValidToken) {
      next();
    } else {
      req.session.destroy((err) =>
        logger.error('Failed to destroy session', err)
      );
      res.redirect(config.loginUrl);
    }
  } else {
    req.session.redirectTo = req.url;
    res.redirect(config.loginUrl);
  }
};
