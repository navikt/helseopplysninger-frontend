module.exports = {
  devServer: {
    port: 4059,
  },
  webpack: {
    plugins: [],
  },
  plugins: [
    {
      plugin: require('craco-less'),
    }
  ],
};
