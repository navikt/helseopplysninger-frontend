import React from "react";
import {ItemProps} from "../types/ItemProps";
import {Checkbox} from "nav-frontend-skjema";
import {responseItemToBoolean} from "../utils/response-item-utils";

/**
 * Question with a yes/no answer (valueBoolean).
 *
 * @param questionnaireItem
 * @param responseItem
 * @param setResponseItem
 * @constructor
 */
const BooleanItem: React.FunctionComponent<ItemProps> = (
    {
        questionnaireItem,
        responseItem,
        setResponseItem
    }
) => {
    const checked = responseItemToBoolean(responseItem);
    return (
        <Checkbox
            checked={checked}
            label={questionnaireItem.text}
            onChange={(e) => {
                responseItem.answer = [{valueBoolean: !checked}]
                setResponseItem(responseItem);
            }}
        />
    );
}

export default BooleanItem;
