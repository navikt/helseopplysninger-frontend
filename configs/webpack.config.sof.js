// "@nrwl/react/plugins/webpack"
const getWebpackConfig = require('@nrwl/react/plugins/webpack.js');
const fhirServer = require('./mock/fhir-server');
module.exports = (config, context) => {
  const defaultConfig = getWebpackConfig(config);
  defaultConfig.devServer.before = (app, server, compiler) => {
    fhirServer(app);
  };
  return {
    ...defaultConfig,
  };
};
