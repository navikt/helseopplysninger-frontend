const querystring = require('querystring');
const uuid = require('uuid');
const localHost = req => 'http://' + req.get('host');

/**
 *
 * @param {Express}app
 */
module.exports = (app) => {
  const storage = {
    Encounter: [require('../fixtures/Encounter.json')],
    Patient: [require('../fixtures/Patient.json')],
    Practitioner: [require('../fixtures/Practitioner.json')],
    Questionnaire: [],
    QuestionnaireResponse: [],
  };
  [
    require('../fixtures/questionnaires/legeerklæring.json'),
    require('../fixtures/questionnaires/med-perioder.json'),
  ].forEach((questionnaire, index) => {
    const id = 'Q-' + index;
    storage.Questionnaire.push({...questionnaire, id});
    storage.QuestionnaireResponse.push({
      id: 'QR-' + index,
      resourceType: 'QuestionnaireResponse',
      questionnaire: id,
    });
  });

  const authorizePath = '/auth/authorize';
  const tokenPath = '/auth/token';

  app.use(require('body-parser').json());

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
      'patient': storage.Patient[0].id,
      'encounter': storage.Encounter[0].id,
    });
  });

  app.get(authorizePath, (req, res) => {
    res.redirect(req.query.redirect_uri + '?' + querystring.stringify({code: uuid.v4()}));
  });

  app.get('/fhir/metadata', function(req, res) {
    res.json({custom: 'response'});
  });

  app.get('/fhir/:resourceType/:id', function(req, res) {
    const {id, resourceType} = req.params;
    const found = storage[resourceType].find(resource => resource.id === id);
    res.send(found);
  });

  app.put('/fhir/:resourceType/:id', function(req, res) {
    const {id, resourceType} = req.params;
    const index = storage[resourceType].findIndex(resource => resource.id === id);
    storage[resourceType][index] = req.body;
    res.send('ok');
  });

  app.get('/', function(req, res) {
    res.redirect('/launch?' + querystring.stringify({
      iss: localHost(req) + '/fhir',
      launch: 'fasdfasdf',
    }));
  });
};
