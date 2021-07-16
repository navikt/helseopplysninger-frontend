import {Express} from "express";
import {SofPaths} from "@navikt/sof-common";


function indexRoute(app: Express) {
    const message = {
        message: 'Welcome to sof-resource-puller!',
        commands: [SofPaths.PULL_RESOURCE],
    }
    app.get('/', (req, res) => res.redirect(SofPaths.PULLER_HOME));
    app.get(SofPaths.PULLER_HOME, (req, res) => res.send(message));
}

export default indexRoute;
