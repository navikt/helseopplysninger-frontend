require('isomorphic-fetch');
const graph = require('@microsoft/microsoft-graph-client');
const secrets = require('./secrets');

async function run() {
  const client = await graph.Client.init({
    defaultVersion: 'v1.0',
    debugLogging: true,
    authProvider: (done) => {
      done(null, secrets.access_token);
    },
  });
  await client.api("/grant")
// Get the name of the authenticated user with promises
  const res = await client.api('/me').get();
  console.log(res);
}

run().then(() => console.log('done'));
