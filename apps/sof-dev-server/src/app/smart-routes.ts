import { fixtures } from '@navikt/fixtures';
import * as querystring from 'querystring';
import { Express } from 'express';
import * as uuid from 'uuid';
import * as env from 'env-var';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { JWT } from 'jose';
import axios from 'axios';

const localHost = (req) => 'http://' + req.get('host');

export const smartRoutes = async (app: Express) => {
  const serverUrl = env.get('FHIR_SERVER_ADDRESS').required().asUrlString();
  const serverURL = new URL(serverUrl);
  /**
   * Just ensure that resources exists
   */
  [fixtures.Patient, fixtures.Practitioner].forEach((resource) => {
    const resourceUrl = [serverUrl, resource.resourceType, resource.id].join('/');
    axios.put(resourceUrl, resource).then(() => console.log('upserted', resourceUrl));
  });
  const storage = {
    Encounter: [fixtures.Encounter],
    Patient: [fixtures.Patient],
    Practitioner: [fixtures.Practitioner],
    Questionnaire: [],
    QuestionnaireResponse: [],
  };
  fixtures.Questionnaire.forEach((questionnaire, index) => {
    const id = 'Q-' + index;
    storage.Questionnaire.push({ ...questionnaire, id });
    storage.QuestionnaireResponse.push({
      id: 'QR-' + index,
      resourceType: 'QuestionnaireResponse',
      questionnaire: id,
    });
  });

  const authorizePath = '/auth/authorize';
  const tokenPath = '/auth/token';
  const idToken = JWT.sign(
    {
      profile: 'Practitioner/' + fixtures.Practitioner.id,
    },
    'abc123'
  );
  app.use(require('body-parser').json());

  app.get('/fhir/.well-known/smart-configuration', function (req, res) {
    res.json({
      authorization_endpoint: localHost(req) + authorizePath,
      token_endpoint: localHost(req) + tokenPath,
    });
  });

  app.post(tokenPath, (req, res) => {
    res.json({
      token_type: 'Bearer',
      access_token: 'ODYzZmE4NDAtNTI5OC00NWU4LWIzODctODA3YjE1OGQ0ZDZi',
      id_token: idToken,
      patient: storage.Patient[0].id,
      encounter: storage.Encounter[0].id,
    });
  });

  app.get(authorizePath, (req, res) => {
    res.redirect(req.query.redirect_uri + '?' + querystring.stringify({ code: uuid.v4() }));
  });

  app.get('/fhir/metadata', function (req, res) {
    res.json({ custom: 'response' });
  });

  app.use(
    '/fhir/*',
    createProxyMiddleware({ target: 'http://' + serverURL.host, changeOrigin: true })
  );

  app.get('/', function (req, res) {
    res.redirect(
      '/launch?' +
        querystring.stringify({
          iss: localHost(req) + '/fhir',
          launch: 'fasdfasdf',
        })
    );
  });
};
