const statusPresens = require('../../fixtures/bestiller/status-presens.json');
const events = require('../../fixtures/bestiller/events.json');
require('ts-node').register()
const {BackendPaths} = require("../../libs/hops-types/src");
module.exports = (app) => {

  app.get(BackendPaths.USER_PATH, function(req, res) {
    res.json({
      navn: 'Kong Harald',
      ident: 'D123456',
      enhet: 'NAV Slottet',
      rolle: 'Konge',
    });
  });

  app.get(BackendPaths.PATIENT_STATUS_PRESENS, (req, res) => {
    res.json(statusPresens);
  });

  app.get(BackendPaths.PATIENT_EVENTS, (req, res) => {
    res.json(events);
  });
};
