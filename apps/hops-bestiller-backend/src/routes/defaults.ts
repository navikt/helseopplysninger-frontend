import {Express} from "express";
import getUserFromToken from "../auth/get-user-from-token";
import {azureAd, server} from "../config";
import {BackendPaths} from "@navikt/hops-types";

function defaults(app: Express): void {

    app.get(BackendPaths.PATH, (req: any, res) => {
        res.send({
            timestamp: (new Date()).toISOString(),
            application: 'hops-bestiller-backend!',
            isAuthenticated: req.isAuthenticated(),
            azureAdClientId: azureAd.clientId,
            loginUrl: server.ingress + "/api/oauth2/login",
            user: req.user || null
        });
    });
    app.get("/api/azure-ad/config", (req: any, res) => {
        res.json(azureAd);
    });
    app.get(BackendPaths.USER_PATH, (req: any, res) => {
        if (req.user) {
            res.send(getUserFromToken(req.user.tokenSets.self.access_token));
        } else {
            res.status(401).send({
                innlogget: false,
            });
        }
    });
}


export default defaults;
