// "@nrwl/react/plugins/webpack"
const getWebpackConfig = require('@nrwl/react/plugins/webpack.js');
module.exports = (config) => {
  const defaultConfig = getWebpackConfig(config);
  defaultConfig.externals = defaultConfig.externals || [];
  defaultConfig.externals.push('bufferutil', 'utf-8-validate');
  defaultConfig.stats.warningsFilter = defaultConfig.stats.warningsFilter || [];
  defaultConfig.stats.warningsFilter.push(/critical dependency:/i);
  return { ...defaultConfig };
};
