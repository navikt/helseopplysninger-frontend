import {Express} from "express";
import {NaisPaths} from "@navikt/hops-types";


function internalRoutes(app: Express): void {
    app.get(NaisPaths.IS_ALIVE_PATH, (req, res) => {
        res.send({message: 'Alive'});
    });

    app.get(NaisPaths.IS_READY_PATH, (req, res) => {
        res.send({message: 'Ready'});
    });

    app.get(NaisPaths.PROMETHEUS_PATH, (req, res) => {
        res.send("not implemented");
    });
}


export default internalRoutes;
