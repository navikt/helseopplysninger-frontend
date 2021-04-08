import {Express} from "express";
import {BackendPaths} from "@navikt/hops-types";
import {bestilleHelseopplysning} from "../events/bestille-helseopplysning";
import {kafkaClient} from "../kafka/kafka-client";
import {kafkaTopics} from "../config";


function bestillingRoutes(app: Express): void {

    app.post(BackendPaths.BESTILLING_PATH, async (req, res) => {
        res.set("Content-Security-Policy", "connect-src 'self'");
        console.log(req.body);
        const metadata = await bestilleHelseopplysning(kafkaClient, kafkaTopics.bestillinger, [req.body])
    });

}


export default bestillingRoutes;
