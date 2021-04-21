import {Express} from "express";
import {BackendPaths} from "@navikt/hops-types";
import {bestilleHelseopplysning} from "../events/bestille-helseopplysning";
import {kafkaClient} from "../kafka/kafka-client";
import {kafkaTopics} from "../config";
import {fhirBestilling} from "../utils/fhir";
import getUserInfoFromRequest from "../auth/get-user-info-from-request";
import {getFhirItems} from "../database/get-items";
import {getPatientIdentifier} from "../database/get-patient";


function bestillingRoutes(app: Express): void {
    const fhirItems = getFhirItems();

    app.get(BackendPaths.ITEMS_PATH, (req, res) => {
        res.json(fhirItems);
    });

    app.post(BackendPaths.BESTILLING_PATH, async (req, res) => {
        res.set("Content-Security-Policy", "connect-src 'self'");
        const {patientId} = req.params;
        const {ident} = getUserInfoFromRequest(req);
        const description = req.body.purpose + " bestilling fra saksbehandler "
        const patientIdentifier = getPatientIdentifier(patientId);
        const questionnaireItems = [];
        req.body.items.forEach(linkId => {
            const found = fhirItems.find(i => i.linkId === linkId);
            if (found) {
                questionnaireItems.push(found);
            }
        });
        const practionerIdentifier = {
            system: "urn:oid:2.16.578.1.12.4.1.4.1",
            value: "15097902396"
        };
        const bestilling: fhirBestilling = {
            description,
            patientIdentifier,
            practionerIdentifier,
            questionnaireItems,
            saksbehandlerIdentifier: ident
        }
        const metadata = await bestilleHelseopplysning(
            kafkaClient,
            kafkaTopics.bestillinger,
            bestilling
        );
        res.json(metadata).status(201);
    });

}


export default bestillingRoutes;
