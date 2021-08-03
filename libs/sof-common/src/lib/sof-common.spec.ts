import { sofCommon, validatePullResourceRequest } from './sof-common';
import { JWT } from 'jose';

describe('sofCommon', () => {
  it('should work', () => {
    expect(sofCommon()).toEqual('sof-common');
  });

  it('should validate when stuff is not right', () => {
    const result = validatePullResourceRequest(null, 'abc');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should validate when stuff is not right', () => {
    const token = 'Bearer ' + JWT.sign({}, 'abc123');
    const url = new URL('https://example.com/fhir/resource');
    const result = validatePullResourceRequest(url, token);
    console.log(result);
    expect(result.length).toBe(0);
  });
});
