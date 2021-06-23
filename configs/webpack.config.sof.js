// "@nrwl/react/plugins/webpack"
const mock = require('./mocks/fhir-server');
const injectMock = require('./utils/inject-mock');
module.exports = (config, context) => {
  //return injectMock(config, mock);
  return config;
};
