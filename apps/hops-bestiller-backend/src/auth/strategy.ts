import {Client, Strategy, StrategyOptions, TokenSet} from "openid-client";
import {azureAd} from '../config';

const createStrategy = client => {
    const options: StrategyOptions<Client> = {
        client: client,
        params: {
            response_types: azureAd.responseTypes,
            response_mode: azureAd.responseMode,
            scope: `openid ${azureAd.clientId}/.default`
        },
        passReqToCallback: false,
        usePKCE: 'S256'
    }
    const verify = (tokenSet: TokenSet, done: (err, user?: any) => void) => {
        if (tokenSet.expired()) {
            return done(undefined, undefined)
        }
        done(undefined, {
            claims: tokenSet.claims,
            tokenSets: {
                self: tokenSet,
            },
        });
    }

    return new Strategy(options, verify);
};

export default createStrategy;
