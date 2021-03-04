import {Express} from "express";


function internals(app: Express): void {
    app.get('/internal/is-alive', (req, res) => {
        res.send({message: 'Ready'});
    });
    app.get('/internal/is-ready', (req, res) => {
        res.send({message: 'Ready'});
    });
    app.get('/internal/prometheus', (req, res) => {
        res.send("not implemented");
    });

}


export default internals;
