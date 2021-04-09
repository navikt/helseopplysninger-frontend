import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {BackendPaths, Brukerinfo} from "@navikt/hops-types";
import {IQuestionnaire_Item} from "@ahryman40k/ts-fhir-types/lib/R4";

interface AppContextProps {
    user?: Brukerinfo;
    loading: Boolean;
    items?: IQuestionnaire_Item[];
}

const AppContext = React.createContext<Partial<AppContextProps>>({});

const AppContextProvider = (props: any) => {
    const [user, setUser] = useState<Brukerinfo>({
        innlogget: false,
        navn: null,
        ident: null,
    });
    const [loading, isLoading] = useState<Boolean>(true);
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function fetch() {
            const userRes = await axios.get(BackendPaths.USER_PATH);
            setUser(userRes.data);
        }

        fetch().finally(() => isLoading(false));
    }, [])
    useEffect(() => {
        axios.get(BackendPaths.ITEMS_PATH).then(res => {
            setItems(res.data);
        })
    }, [])
    return (
        <AppContext.Provider value={{user, loading, items}}>
            {props.children}
        </AppContext.Provider>
    );
}
const useAppContext = () => useContext(AppContext);
export {useAppContext, AppContextProvider, AppContext}
