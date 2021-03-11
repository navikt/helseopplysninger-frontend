import {Express} from "express";
import getUserFromToken from "../auth/get-user-from-token";
import {JWT} from "jose";
import {azureAd} from "../config";
import {API_PATH, API_USER_PATH} from "../paths";

function defaults(app: Express): void {

    app.get(API_PATH, (req: any, res) => {
        res.send({
            application: 'hops-bestiller-backend!',
            isAuthenticated: req.isAuthenticated(),
            azureAdClientId: azureAd.clientId,
            loginUrl: process.env.APP_INGRESS + "/api/oauth2/login",
            user: req.user || null,
            accessToken: req.user && JWT.decode(req.user.token.access_token)
        });
    });

    app.get(API_USER_PATH, (req: any, res) => {
        res.send(getUserFromToken(req.user.token.access_token));
    });
}


export default defaults;
