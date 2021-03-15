import {JWT} from 'jose';
import {AccessToken, Brukerinfo} from '@navikt/hops-types';


function getUserFromToken(accessToken): Brukerinfo {
    const tokenContent = JWT.decode(accessToken) as AccessToken;
    return {
        navn: tokenContent.name || tokenContent.sub,
        ident: tokenContent.NAVident || tokenContent.jti,
    };
}

export default getUserFromToken;
