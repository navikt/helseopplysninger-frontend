import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import '@navikt/ds-css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
