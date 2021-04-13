import {Express} from "express";
import {BackendPaths} from "@navikt/hops-types";
import {wsServer} from "../ws/wsServer";


function internals(app: Express): void {


    app.get(BackendPaths.IS_ALIVE_PATH, (req, res) => {
        wsServer.broadcast({
            url:BackendPaths.IS_ALIVE_PATH,
            message: "endpoint was pinged",
        });
        res.send({message: 'Ready'});
    });

    app.get(BackendPaths.IS_READY_PATH, (req, res) => {
        res.send({message: 'Ready'});
    });

    app.get(BackendPaths.PROMETHEUS_PATH, (req, res) => {
        res.send("not implemented");
    });

}


export default internals;
