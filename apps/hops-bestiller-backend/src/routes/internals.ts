import {Express} from "express";
import {BackendPaths, NaisPaths} from "@navikt/hops-types";
import {wsBroadcast} from "../ws/wsServer";


function internals(app: Express): void {
    app.get(NaisPaths.IS_ALIVE_PATH, (req, res) => {
        wsBroadcast({
            url: NaisPaths.IS_ALIVE_PATH,
            message: "endpoint was pinged",
        });
        res.send({message: 'Ready'});
    });

    app.get(NaisPaths.IS_READY_PATH, (req, res) => {
        res.send({message: 'Ready'});
    });

    app.get(NaisPaths.PROMETHEUS_PATH, (req, res) => {
        res.send("not implemented");
    });
}


export default internals;
