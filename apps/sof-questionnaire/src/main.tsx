import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <small>change</small>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
