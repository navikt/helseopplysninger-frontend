import {Express} from "express";
import {API_IS_ALIVE_PATH, API_IS_READY_PATH, API_PROMETHEUS_PATH} from "../paths";


function internals(app: Express): void {

    app.get(API_IS_ALIVE_PATH, (req, res) => {
        res.send({message: 'Ready'});
    });
    app.get(API_IS_READY_PATH, (req, res) => {
        res.send({message: 'Ready'});
    });
    app.get(API_PROMETHEUS_PATH, (req, res) => {
        res.send("not implemented");
    });

}


export default internals;
