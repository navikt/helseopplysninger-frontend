import {Express} from "express";


function internalRoutes(app: Express): void {
    app.get("/behandler/internal/health", (req, res) => {
        res.send({message: 'Ready'});
    });

    app.get("/behandler/internal/health", (req, res) => {
        res.send({message: 'Ready'});
    });

    app.get("/behandler/internal/prometheus", (req, res) => {
        res.send("not implemented");
    });
}


export default internalRoutes;
