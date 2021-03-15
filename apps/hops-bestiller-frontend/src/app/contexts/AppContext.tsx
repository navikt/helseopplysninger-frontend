import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {Brukerinfo, BackendPaths} from "@navikt/hops-types";

const AppContext = React.createContext(null);

const AppContextProvider = (props: any) => {
    const [user, setUser] = useState<Brukerinfo>(null);
    useEffect(() => {
        async function fetch() {
            const userRes = await axios.get(BackendPaths.USER_PATH);
            setUser(userRes.data);
        }
        fetch().then(null);
    }, [])
    return (
        <AppContext.Provider value={user}>
            {props.children}
        </AppContext.Provider>
    );
}
const useAppContext = () => useContext(AppContext);
export {useAppContext, AppContextProvider}
