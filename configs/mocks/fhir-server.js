const querystring = require('querystring');
const uuid = require('uuid');
const localHost = (req) => 'http://' + req.get('host');
const { JWT } = require('jose');
/**
 *
 * @param {Express}app
 */
module.exports = (app) => {
  const authorizePath = '/auth/authorize';
  const tokenPath = '/auth/token';
  const idToken = JWT.sign(
    {
      profile: 'Practitioner/' + 123,
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
      patient: 123,
      encounter: 123,
    });
  });

  app.get(authorizePath, (req, res) => {
    res.redirect(req.query.redirect_uri + '?' + querystring.stringify({ code: uuid.v4() }));
  });

  app.get('/fhir/metadata', function (req, res) {
    res.json({ custom: 'response' });
  });

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
