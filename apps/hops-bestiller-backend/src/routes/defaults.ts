import {Express} from "express";
import getUserFromToken from "../auth/get-user-from-token";
import {JWT} from "jose";
import {azureAd} from "../config";
import {BackendPaths} from "@navikt/hops-types";

function defaults(app: Express): void {

    app.get(BackendPaths.PATH, (req: any, res) => {
        res.send({
            application: 'hops-bestiller-backend!',
            isAuthenticated: req.isAuthenticated(),
            azureAdClientId: azureAd.clientId,
            loginUrl: process.env.APP_INGRESS + "/api/oauth2/login",
            user: req.user || null,
            accessToken: req.user && JWT.decode(req.user.token.access_token)
        });
    });

    app.get(BackendPaths.USER_PATH, (req: any, res) => {
        if (req.user) {
            res.send(getUserFromToken(req.user.token.access_token));
        } else {
            res.status(401).send({});
        }

    });
}


export default defaults;
