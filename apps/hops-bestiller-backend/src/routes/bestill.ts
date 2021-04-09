import {Express} from "express";
import {BackendPaths} from "@navikt/hops-types";
import {bestilleHelseopplysning} from "../events/bestille-helseopplysning";
import {kafkaClient} from "../kafka/kafka-client";
import {kafkaTopics} from "../config";
import {createFhirQuestionaire, createFhirTask} from "../utils/fhir";
import getUserInfoFromRequest from "../auth/get-user-info-from-request";
import {getFhirItems} from "../database/get-items";


function bestillingRoutes(app: Express): void {
    const fhirItems = getFhirItems();

    app.get(BackendPaths.ITEMS_PATH, (req, res) => {
        res.json(fhirItems);
    });

    app.post(BackendPaths.BESTILLING_PATH, async (req, res) => {
        res.set("Content-Security-Policy", "connect-src 'self'");
        const user = getUserInfoFromRequest(req);
        const description = req.body.purpose + " bestilling fra saksbehandler "
        const task = createFhirTask(description, user.ident);
        const items = [];
        req.body.items.forEach(linkId => {
            const found = fhirItems.find(i => i.linkId === linkId);
            if (found) {
                items.push(found);
            }
        });
        console.log(items);
        const questionnaire = createFhirQuestionaire(description, items);
        const metadata = await bestilleHelseopplysning(
            kafkaClient,
            kafkaTopics.bestillinger,
            [task, questionnaire]);
        res.json(metadata).status(201);
    });

}


export default bestillingRoutes;
