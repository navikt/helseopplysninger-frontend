import {Express} from "express";
import {BackendPaths} from "@navikt/hops-types";

const patientEvents = require("../../../../fixtures/bestiller/events.json");
const patientStatusPresens = require("../../../../fixtures/bestiller/status-presens.json");

function patientRoutes(app: Express): void {
    app.get(BackendPaths.PATIENT_EVENTS, (req, res) => {
        res.json(patientEvents);
    });
    app.get(BackendPaths.PATIENT_STATUS_PRESENS, (req, res) => {
        res.send(patientStatusPresens);
    });
}


export default patientRoutes;
