import isURL from 'validator/lib/isURL';
import isJWT from 'validator/lib/isJWT';
import { parseAuthHeader } from '../../../../apps/sof-resource-puller/src/app/utils/parse-auth-header';

export function sofCommon(): string {
  return 'sof-common';
}

export enum SofPaths {
  PULLER_HOME = '/resource-puller',
  PULL_RESOURCE = '/resource-puller/pull-resource',
}

export function validatePullResourceRequest(resourceUrl: URL, authHeader): string[] {
  const validAuthTypes = ['Bearer', 'Basic'];
  const errors = [];
  if (!resourceUrl) errors.push('resourceurl need to be set');
  if (resourceUrl && !isURL(resourceUrl.toString(), { require_tld: false }))
    errors.push('resourceurl must be an url');
  if (authHeader) {
    const { type, credentials } = parseAuthHeader(authHeader);
    if (!validAuthTypes.includes(type))
      errors.push('authHeader must be of type' + validAuthTypes.join(', '));
    if (type.toLowerCase() === 'bearer' && !isJWT(credentials))
      errors.push('token must be of type JWT');
  } else {
    errors.push('authHeader must be set');
  }

  return errors;
}
