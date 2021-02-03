import React from "react";
import {ItemProps} from "../types/ItemProps";
import {Input, Textarea} from "nav-frontend-skjema";
import {responseItemToString, stringAnswer} from "../utils/response-item-utils";



const TextItem: React.FunctionComponent<ItemProps> = (
    {
        questionnaireItem,
        responseItem,
        setResponseItem
    }
) => {
    return (
        <Textarea
            label={questionnaireItem.text}
            value={responseItemToString(responseItem)}
            onChange={(e) =>
                setResponseItem(stringAnswer(responseItem, e.target.value))
            }
        />
    );
}

export default TextItem;
