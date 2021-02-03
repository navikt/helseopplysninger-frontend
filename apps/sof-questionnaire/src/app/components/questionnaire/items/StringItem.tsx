import React from "react";
import {ItemProps} from "../types/ItemProps";
import {Input} from "nav-frontend-skjema";
import {responseItemToString, stringAnswer} from "../utils/response-item-utils";

const StringItem: React.FunctionComponent<ItemProps> = (
    {
        questionnaireItem,
        responseItem,
        setResponseItem
    }
) => {
    return (
        <Input
            value={responseItemToString(responseItem)}
            label={questionnaireItem.text}
            onChange={(e) =>
                setResponseItem(stringAnswer(responseItem, e.target.value))
            }
        />
    );
}

export default StringItem;
