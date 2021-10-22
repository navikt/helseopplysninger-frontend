const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ws = require('ws');
const statusPresens = require('../../libs/fixtures/src/fixtures/bestiller/status-presens.json');
const events = require('../../libs/fixtures/src/fixtures/bestiller/events.json');
const brukerinfo = require('../../libs/fixtures/src/fixtures/bestiller/brukerinfo.json');
const items = require('../../libs/fixtures/src/fixtures/items.json');
require('ts-node').register();
const { BackendPaths } = require('../../libs/bestiller-types/src');

module.exports = (app, server) => {
  let websocket;
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.get(BackendPaths.USER_PATH, function (req, res) {
    if (req.cookies['loggedIn']) {
      res.json(brukerinfo);
    } else {
      res
        .json({
          innlogget: false,
        })
        .status(401);
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
    if (websocket) {
      websocket.send('Tok i mot data!');
    }
    res.json({});
  });

  app.get(BackendPaths.ITEMS_PATH, (req, res) => {
    res.json(items);
  });

  const wsServer = new ws.Server({ noServer: true });

  wsServer.on('connection', (socket) => {
    websocket = socket;
    socket.on('message', (message) => console.info('Websocket received message: ' + message));
  });

  server.options.onListening = (s) => {
    s.listeningApp.on('upgrade', function (req, socket, head) {
      if (req.url === '/ws') {
        wsServer.handleUpgrade(req, socket, head, (socket) => {
          wsServer.emit('connection', socket, req);
        });
      }
    });
  };
};
