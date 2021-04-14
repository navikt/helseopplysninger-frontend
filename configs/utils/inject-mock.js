// "@nrwl/react/plugins/webpack"
const getWebpackConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, mock) => {
  const defaultConfig = getWebpackConfig(config);
  defaultConfig.devServer = defaultConfig.devServer || {};
  defaultConfig.devServer.before = (app, server, compiler) => {
    mock(app, server);
  };
  return {
    ...defaultConfig,
  };

};
