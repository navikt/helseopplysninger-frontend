import React from 'react';
import { render } from '@testing-library/react';

import FhirQuestionnaire from './fhir-questionnaire';

describe('FhirQuestionnaire', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FhirQuestionnaire />);
    expect(baseElement).toBeTruthy();
  });
});
