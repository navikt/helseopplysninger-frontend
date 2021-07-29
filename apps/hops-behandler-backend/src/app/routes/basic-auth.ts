import * as basicAuth from 'express-basic-auth';

export const ensureBasicAuth = basicAuth({
  users: { helse: process.env.HELSEID_CLIENT_SECRET.substr(0, 5) },
  challenge: true,
});
