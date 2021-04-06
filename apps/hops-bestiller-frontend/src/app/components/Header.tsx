import React from 'react';
import "@navikt/helse-frontend-header/lib/main.css";
import {HeaderEnkel} from "@navikt/helse-frontend-header";
import {useAppContext} from "../contexts/AppContext";

export const Header = () => {
    const {user} = useAppContext();
    return (
        <HeaderEnkel tittel={"Helseopplysninger"} brukerinfo={user}></HeaderEnkel>
    );
}
