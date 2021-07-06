import {sofCommon, validatePullResourceRequest} from './sof-common';
import { JWT } from 'jose'

describe('sofCommon', () => {
  it('should work', () => {
    expect(sofCommon()).toEqual('sof-common');
  });

  it('should validate when stuff is not right', () => {
    const result =  validatePullResourceRequest("123","abc");
    expect(result.length).toBe(1);
  });
  it('should validate when stuff is not right', () => {
    const token = JWT.sign({},"abc123");
    const result =  validatePullResourceRequest("https://example.com/fhir/resource",token);
    console.log(result)
    expect(result.length).toBe(0);
  });
});
