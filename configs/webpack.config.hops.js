// "@nrwl/react/plugins/webpack"
const hopsBestillerApi = require('./mocks/hops-bestiller-api');
const injectMock = require('./utils/inject-mock');
module.exports = (config) => injectMock(config, hopsBestillerApi);
