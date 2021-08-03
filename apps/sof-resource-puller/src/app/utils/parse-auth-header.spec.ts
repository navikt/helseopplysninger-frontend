import { parseAuthHeader } from './parse-auth-header';

test('it should parse an auth header', async () => {
  const { type, credentials } = parseAuthHeader('Bearer dfasfdsaf');

  expect(type).toBe('Bearer');
  expect(credentials).toBe('dfasfdsaf');
});
