// "@nrwl/react/plugins/webpack"

module.exports = (config, context) => {
  config.externals = config.externals || [];
  config.externals.push('bufferutil', 'utf-8-validate', 'express', 'postgres-migrations');
  config.stats.warningsFilter = config.stats.warningsFilter || [];
  config.stats.warningsFilter.push(/critical dependency:/i)
  return config;
};
