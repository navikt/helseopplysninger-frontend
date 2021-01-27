import React from "react";
import {ItemProps} from "../types/ItemProps";
import {Datepicker} from 'nav-datovelger';
import {responseItemToString, stringAnswer} from "../utils/response-item-utils";
import {Label} from "nav-frontend-skjema";
import {guid} from "nav-frontend-js-utils";

/**
 * Denne bør vel etterhvert bruke
 * @param questionnaireItem
 * @param responseItem
 * @param setResponseItem
 * @constructor
 */
const DateItem: React.FunctionComponent<ItemProps> = (
    {
        questionnaireItem,
        responseItem,
        setResponseItem
    }
) => {
    const inputId = guid()
    return (
        <div className={"skjemaelement"}>
            <Label htmlFor={inputId}>{questionnaireItem.text}</Label>
            <Datepicker
                inputId={inputId}
                value={responseItemToString(responseItem)}
                onChange={(value) =>
                    setResponseItem(stringAnswer(responseItem, value))
                }
            />
        </div>
    );
}

export default DateItem;
