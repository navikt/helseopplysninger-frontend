import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {BackendPaths, Brukerinfo} from "@navikt/hops-types";

interface AppContextProps {
    user?: Brukerinfo;
    loading: Boolean;
}

const AppContext = React.createContext<Partial<AppContextProps>>({});

const AppContextProvider = (props: any) => {
    const [user, setUser] = useState<Brukerinfo>({
        innlogget: false,
        navn: null,
        ident: null,
    });
    const [loading, isLoading] = useState<Boolean>(true);
    useEffect(() => {
        async function fetch() {
            const userRes = await axios.get(BackendPaths.USER_PATH);
            setUser(userRes.data);
        }

        fetch().finally(() => isLoading(false));
    }, [])
    return (
        <AppContext.Provider value={{user, loading}}>
            {props.children}
        </AppContext.Provider>
    );
}
const useAppContext = () => useContext(AppContext);
export {useAppContext, AppContextProvider, AppContext}
