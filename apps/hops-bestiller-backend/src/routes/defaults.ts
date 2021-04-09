import {Express} from "express";
import getUserInfoFromRequest from "../auth/get-user-info-from-request";
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
    app.get(BackendPaths.USER_PATH, (req, res) => {
        if (req.user) {
            res.send(getUserInfoFromRequest(req));
        } else {
            res.status(401).send({
                innlogget: false,
            });
        }
    });
}


export default defaults;
