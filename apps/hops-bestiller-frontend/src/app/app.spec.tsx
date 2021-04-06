import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';
import {AppContext} from "./contexts/AppContext";
const brukerinfo =require('../../../../fixtures/bestiller/brukerinfo.json');
const context = {
  user: brukerinfo,
  loading:false
}
describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <App/>
        </AppContext.Provider >
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <App/>
        </AppContext.Provider >
      </BrowserRouter>
    );

    expect(getByText('Bestilling av Helseopplysninger')).toBeTruthy();
  });
});
