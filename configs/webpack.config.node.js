// "@nrwl/react/plugins/webpack"

module.exports = (config, context) => {
  config.externals = config.externals || [];
  config.externals.push("/node_modules/",'bufferutil', 'utf-8-validate');
  console.log('before', config);
  return config;
};
