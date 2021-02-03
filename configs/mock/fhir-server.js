const querystring = require('querystring');
const uuid = require('uuid');
const localHost = req => {
  return 'http://' + req.get('host');
};
/**
 *
 * @param {Express}app
 */
module.exports = (app) => {

  const questionnairesResponses = [];
  const questionnaires = [];
  [
    require('../fixtures/questionnaires/legeerklæring.json'),
    require('../fixtures/questionnaires/med-perioder.json'),
  ].forEach((questionnaire, index) => {
    const id = 'Q-' + index;
    questionnaires.push({...questionnaire, id});
    questionnairesResponses.push({
      id: 'QR-' + index,
      resourceType: 'QuestionnaireResponse',
      questionnaire: id,
    });
  });

  const authorizePath = '/auth/authorize';
  const tokenPath = '/auth/token';

  app.get('/fhir/.well-known/smart-configuration', function(req, res) {
    res.json({
      'authorization_endpoint': localHost(req) + authorizePath,
      'token_endpoint': localHost(req) + tokenPath,
    });
  });

  app.post(tokenPath, (req, res) => {
    res.json({
      'token_type': 'Bearer',
      'access_token': 'ODYzZmE4NDAtNTI5OC00NWU4LWIzODctODA3YjE1OGQ0ZDZi',
      'patient': 'patient-id-1',
      'encounter': 'encounter-id-1',
    });
  });
  app.get(authorizePath, (req, res) => {
    const code = uuid.v4();
    const qs = querystring.stringify({code});
    res.redirect(req.query.redirect_uri + '?' + qs);
  });

  app.get('/fhir/metadata', function(req, res) {
    res.json({custom: 'response'});
  });

  app.get('/fhir/Encounter/*', function(req, res) {
    res.json(require('../fixtures/Encounter.json'));
  });
  app.get('/fhir/Patient/*', function(req, res) {
    res.json(require('../fixtures/Patient.json'));
  });
  app.get('/fhir/Practitioner/*', function(req, res) {
    res.json(require('../fixtures/Practitioner.json'));
  });

  app.get('/fhir/QuestionnaireResponse/:id', (req, res) => {
    const {id} = req.params;
    const found = questionnairesResponses.find(qr => qr.id === id);
    res.send(found);
  });
  app.get('/fhir/Questionnaire/:id', (req, res) => {
    const {id} = req.params;
    const found = questionnaires.find(questionnaire => questionnaire.id === id);
    res.send(found);
  });
  app.get('/', function(req, res) {
    const iss = localHost(req) + '/fhir';
    const launch = 'fasdfasdf';
    const qs = querystring.stringify({iss, launch});
    res.redirect('/launch?' + qs);
  });
};
