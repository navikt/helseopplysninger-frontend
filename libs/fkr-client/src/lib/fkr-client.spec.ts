import { fkrGetPatient, getCache } from './fkr-client';
import * as nock from 'nock';

describe('fkrClient', () => {
  const OLD_ENV = process.env;
  beforeEach(async () => {
    await getCache().destroy();

    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should work', async () => {
    const testDomain = 'https://example.local';
    const stsUrl = '/sts-url';
    const fhirUrl = '/fhir-url';
    process.env.FKR_STS_URL = testDomain + stsUrl;
    process.env.FKR_FHIR_URL = testDomain + fhirUrl;
    process.env.FKR_CLIENT_ID = 'xxx';
    process.env.FKR_CLIENT_SECRET = 'xxx';
    const stsScope = nock(testDomain).persist().defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-headers': '*',
    });
    stsScope.options(/.*/).reply(200, {});
    stsScope.post(stsUrl).reply(200, {});
    stsScope.get(/^\/fhir-url\/Patient.*/).reply(200, { entry: [] });

    const result = await fkrGetPatient({
      name: 'Michael',
    });
    expect(result).toEqual([]);
  });
});
