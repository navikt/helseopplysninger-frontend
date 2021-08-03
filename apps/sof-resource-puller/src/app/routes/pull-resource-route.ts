import { Express } from 'express';
import { SofPaths } from '@navikt/sof-common';
import { pullBundleSendQuestionnaire } from '../commands/pull-bundle-send-questionnaire';
import { getKafkaClient } from '@navikt/hops-common';

/**
 * This route will pull and bundle a resource.
 *
 * @param app
 */
function pullResourceRoute(app: Express) {
  app.post(SofPaths.PULL_RESOURCE, async (req, res) => {
    const { serverUrl, reference, authHeader } = req.body;
    const resource = await pullBundleSendQuestionnaire({
      serverUrl,
      reference,
      authHeader,
      kafkaTopic: process.env.KAFKA_TOPIC_BESTILLING,
      kafkaProducer: getKafkaClient().producer(),
    });
    if (resource.resourceType === 'OperationOutcome') {
      res.status(400);
    } else {
      res.status(200);
    }
    res.json(resource);
  });
  app.get(SofPaths.PULL_RESOURCE, async (req, res) => {
    res.send({
      'required method': 'POST',
      'required body': {
        serverUrl:
          'The url to the fhir server. Need to be whitelisted (oauth2Client.state.serverUrl)',
        reference: 'Canonical reference to QuestionnaireResponse (QuestionnaireResponse/123)',
        authHeader: 'Access Token (oauth2Client.getAuthorizationHeader())',
      },
    });
  });
}

export default pullResourceRoute;
