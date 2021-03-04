import {reverseProxy} from '../config';
import {HttpsProxyAgent} from "https-proxy-agent";
import logger from '../utils/logger';

const agent = () => {
  const proxyUri = reverseProxy.proxy;
  if (proxyUri) {
    logger.info(`Proxying requests via ${proxyUri} for openid-client`);
    const agent = new HttpsProxyAgent(proxyUri);
    return {
      http: agent,
      https: agent,
    }
  } else {
    logger.info(`Environment variable HTTP_PROXY is not set, not proxying requests for openid-client`);
    return null
  }
};

export default { agent: agent() }
