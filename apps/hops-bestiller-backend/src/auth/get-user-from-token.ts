import {JWT} from "jose";


function getUserFromToken(accessToken) {
    const tokenContent = JWT.decode(accessToken);
    return {
        // @ts-ignore
        name: tokenContent.name || tokenContent.sub,
        // @ts-ignore
        NAVident: tokenContent.NAVident || tokenContent.jti,
    }
}

export default getUserFromToken;
