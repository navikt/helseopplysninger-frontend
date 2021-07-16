import {Express} from "express";
import {SofPaths} from '@navikt/sof-common';
import {pullBundleSendQuestionnaire} from "../commands/pull-bundle-send-questionnaire";

/**
 * This route will pull and bundle a resource.
 *
 * @param app
 */
function pullResourceRoute(app: Express) {
    app.post(SofPaths.PULL_RESOURCE, async (req, res) => {
        const {fhirServerUrl, canonical, token} = req.body;
        const operationOutcome = await pullBundleSendQuestionnaire({
            fhirServerUrl,
            canonical,
            token,
            kafkaTopic: process.env.KAFKA_TOPIC_BESTILLING,
            kafkaProducer: null,
        })
        res.json(operationOutcome)
    })
}

export default pullResourceRoute;
