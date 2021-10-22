import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BackendPaths, Brukerinfo } from '@navikt/bestiller-types';
import { IQuestionnaire_Item } from '@ahryman40k/ts-fhir-types/lib/R4';
import { wsClient } from '../ws/wsClient';
import { Goto } from '../utils/navigation';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface AppContextProps {
  user?: Brukerinfo;
  loading: Boolean;
  items: IQuestionnaire_Item[];
  messages: MessageEvent[];
  goto: Goto;
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
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function fetch() {
      const userRes = await axios.get(BackendPaths.USER_PATH);
      setUser(userRes.data);
    }

    fetch().finally(() => isLoading(false));
    wsClient(window.location, (message) => {
      const parsedMessage = JSON.parse(message.data);
      setMessages([...messages, parsedMessage]);
    });
  }, []);
  useEffect(() => {
    axios.get(BackendPaths.ITEMS_PATH).then((res) => {
      setItems(res.data);
    });
  }, []);
  const history = useHistory();
  const routeMatch = useRouteMatch();

  const goto = new Goto(history, routeMatch);
  const context: AppContextProps = {
    user,
    loading,
    items,
    messages,
    goto,
  };
  return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};
const useAppContext = () => useContext(AppContext);
export { useAppContext, AppContextProvider, AppContext };
