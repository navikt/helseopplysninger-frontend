// "@nrwl/react/plugins/webpack"
const hopsBestillerApi = require('./mocks/hops-bestiller-api');
const injectMock = require('./utils/inject-mock');
module.exports = (config, context) => {
  config.externals.push('bufferutil', 'utf-8-validate');
  console.log('before', config);
  const after = injectMock(config, hopsBestillerApi);
  console.log('after', after);
  return after;
};
