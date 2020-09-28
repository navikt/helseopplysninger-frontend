const path = require('path');
module.exports = {
  'tsconfig': path.join(__dirname, 'tsconfig.server.json'),
  'migrations-dir': path.join(__dirname, '..', 'db', 'migrations'),
  'url': 'postgresql://postgres@localhost:10864',
};
