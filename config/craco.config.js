
module.exports = {
  devServer: {
    port: 4059,
  },
  webpack: {
    plugins: [require('./plugin/inject-dekorator-webpack')],
  },
  plugins: [
    {
      plugin: require('craco-less'),
    },
    {
      plugin: require('./plugin/inject-dekorator'),
      options: {
        authenticated: true,
        dekorator: {
          context: 'samarbeidspartner',
          simple: true,
          redirectToApp: true,
          level: 'Level4',
          language: 'norsk',
          feedback: false,
          chatbot: false,
        },
      },
    },
  ],
};
