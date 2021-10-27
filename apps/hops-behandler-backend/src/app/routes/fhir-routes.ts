import { Express } from 'express';
import { GoogleAuth } from 'google-auth-library';
import fhirClient from '../../utils/fhir-client';

const bodyParser = require('body-parser');

export async function fhirRoutes(app: Express): Promise<void> {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get('/api/access-token', async (req, res) => {
    const headers = await auth.getRequestHeaders();
    res.send(headers);
  });

  app.post('/api/fhir', async (req, res) => {
    const { resource } = req.body;
    const resourceJson = JSON.parse(resource);
    const operationoutcome = await fhirClient.post('/' + resourceJson.resourceType, resourceJson);
    res.send(operationoutcome.data);
  });
  app.get('/api/fhir', async (req, res) => {
    res.sendFile(__dirname + '/assets/post.html');
  });
}
