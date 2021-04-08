const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const statusPresens = require('../../fixtures/bestiller/status-presens.json');
const events = require('../../fixtures/bestiller/events.json');
const brukerinfo = require('../../fixtures/bestiller/brukerinfo.json');
require('ts-node').register();
const {BackendPaths} = require('../../libs/hops-types/src');

module.exports = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.get(BackendPaths.USER_PATH, function(req, res) {
    if (req.cookies['loggedIn']) {
      res.json(brukerinfo);
    } else {
      res.json({
        innlogget: false,
      }).status(401);
    }
  });

  app.get(BackendPaths.PATIENT_STATUS_PRESENS, (req, res) => {
    res.json(statusPresens);
  });

  app.get(BackendPaths.PATIENT_EVENTS, (req, res) => {
    res.json(events);
  });

  app.get(BackendPaths.LOGIN_PATH, (req, res) => {
    res.cookie('loggedIn', true);
    res.redirect('/');
  });

  app.post(BackendPaths.BESTILLING_PATH, (req, res) => {
    res.json({});
  });

};
