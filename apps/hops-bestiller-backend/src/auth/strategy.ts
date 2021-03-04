import {Strategy} from "openid-client";
import {azureAd} from '../config';
import authUtils from './utils';

const createStrategy = client => {
    return new Strategy({
        client: client,
        params: {
            response_types: azureAd.responseTypes,
            response_mode: azureAd.responseMode,
            scope: `openid ${azureAd.clientId}/.default`
        },
        passReqToCallback: false,
        usePKCE: 'S256'
    }, (tokenSet, done) => {
        if (tokenSet.expired()) {
            return done(null, false)
        }
        const user = {
            'tokenSets': {
                [authUtils.tokenSetSelfId]: tokenSet
            },
            'claims': tokenSet.claims()
        };
        return done(null, user);
    });
};

export default createStrategy;
