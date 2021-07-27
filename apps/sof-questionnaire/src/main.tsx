import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { Undertittel } from 'nav-frontend-typografi';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Undertittel>change</Undertittel>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
