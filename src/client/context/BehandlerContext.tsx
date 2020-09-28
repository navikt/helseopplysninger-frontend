import * as React from 'react';

export interface BehandlerContextInterface {
    name: string,
    author: string,
    url: string
}

const ctxt = React.createContext<BehandlerContextInterface | null>(null);

export const AppContextProvider = ctxt.Provider;

export const AppContextConsumer = ctxt.Consumer;
