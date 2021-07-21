import { BackendPaths } from './types';

describe('types', () => {
  it('should work', () => {
    expect(BackendPaths.USER_PATH).toContain('/api');
  });
});
