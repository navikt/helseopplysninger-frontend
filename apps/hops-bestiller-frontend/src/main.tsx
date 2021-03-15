import React from 'react';
import ReactDOM from 'react-dom';
import 'nav-frontend-core/less/core.less';
import {BrowserRouter} from 'react-router-dom';

import App from './app/app';
import {Header} from "./app/components/Header";
import {AppContextProvider} from "./app/contexts/AppContext";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppContextProvider>
                <Header/>
                <App/>
            </AppContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
