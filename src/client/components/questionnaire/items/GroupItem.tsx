import React from "react";
import {ItemProps} from "../types/ItemProps";
import ItemMapper from "../ItemMapper";
import prepResponseItems from "../utils/prep-response-items";
import {IQuestionnaireResponse_Item} from "@ahryman40k/ts-fhir-types/lib/R4";
import {SkjemaGruppe} from "nav-frontend-skjema";

/**
 * Trolig her ting blir mest kompleks. Hvordan skal man angi svar på nestede spørsmål?
 * @param item
 * @constructor
 */
const GroupItem: React.FunctionComponent<ItemProps> = (
    {
        questionnaireItem,
        responseItem,
        setResponseItem
    }
) => {
    const {localResponseItems,
        findResponseItemIndex,
        findQuestionnaireItemByLinkId
    } = prepResponseItems(
        questionnaireItem.item || [],
        responseItem.item || []
    );

    const setGroupResponseItem = (groupResponseItem: IQuestionnaireResponse_Item) => {
        const itemIndex = findResponseItemIndex(responseItem.id);
        const copyOfgroupResponseItems = [...localResponseItems];
        copyOfgroupResponseItems[itemIndex] = groupResponseItem;
        const copyOfresponseItem = {...responseItem};
        copyOfresponseItem.item = copyOfgroupResponseItems
        setResponseItem(copyOfresponseItem);
    }
    return (
        <SkjemaGruppe legend={questionnaireItem.text}>
            {localResponseItems.map(responseItem => {
                const questionnaireItem = findQuestionnaireItemByLinkId(responseItem.linkId) || {}
                const itemProps = {
                    key: responseItem.id,
                    questionnaireItem: questionnaireItem,
                    responseItem,
                    setResponseItem: setGroupResponseItem
                }
                return <ItemMapper {...itemProps}/>
            })}
        </SkjemaGruppe>
    );
}

export default GroupItem;
