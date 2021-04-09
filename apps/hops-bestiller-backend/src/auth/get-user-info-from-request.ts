import {JWT} from 'jose';
import {AccessToken, Brukerinfo} from '@navikt/hops-types';

function getUserInfoFromRequest(request: Express.Request): Brukerinfo {
    const user = request.user as any;
    const accessToken = user.tokenSets?.self?.access_token;
    const tokenContent = JWT.decode(accessToken) as AccessToken;
    return {
        innlogget: true,
        navn: tokenContent.name || tokenContent.sub,
        ident: tokenContent.NAVident || tokenContent.jti,
    };

}

export default getUserInfoFromRequest;
