import React from "react";
import {ItemProps} from "../types/ItemProps";
import StringItem from "./StringItem";
import {Normaltekst} from "nav-frontend-typografi";

const DisplayItem: React.FunctionComponent<ItemProps> = (
    {
        questionnaireItem,
        responseItem,
        setResponseItem
    }
) => {
    return (
        <Normaltekst>
            {questionnaireItem.text}
        </Normaltekst>
    );
}

export default DisplayItem;
