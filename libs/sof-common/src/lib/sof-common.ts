import isURL from 'validator/lib/isURL';
import isJWT from 'validator/lib/isJWT';

export function sofCommon(): string {
    return 'sof-common';
}

export enum SofPaths {
    PULL_RESOURCE = '/sof-resource-puller/pull-resource'
}

export function validatePullResourceRequest(resource, token): string[] {
    const errors = []
    if (errors.length === 0 && !resource) errors.push("resource need to be set");
    if (errors.length === 0 && !isURL(resource, {require_tld: false})) errors.push("resource must be an url");
    if (errors.length === 0 && !token) errors.push("token must be set");
    if (errors.length === 0 && !isJWT(token)) errors.push("token must be of type JWT");
    return errors;
}
