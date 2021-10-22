import { render } from '@testing-library/react';

import SofComponents from './sof-components';

describe('SofComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SofComponents />);
    expect(baseElement).toBeTruthy();
  });
});
