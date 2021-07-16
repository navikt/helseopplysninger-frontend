import isURL from 'validator/lib/isURL';
import isJWT from 'validator/lib/isJWT';

export function sofCommon(): string {
    return 'sof-common';
}

export enum SofPaths {
    PULLER_HOME = "/resource-puller",
    PULL_RESOURCE = '/resource-puller/pull-resource',
}

export function validatePullResourceRequest(resourceUrl: URL, token): string[] {
    const errors = []
    if (!resourceUrl) errors.push("resourceurl need to be set");
    if (resourceUrl && !isURL(resourceUrl.toString(), {require_tld: false})) errors.push("resourceurl must be an url");
    if (!token) errors.push("token must be set");
    if (!isJWT(token)) errors.push("token must be of type JWT");
    return errors;
}
