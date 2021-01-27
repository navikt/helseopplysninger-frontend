import React from 'react'
import {useUserContext} from "../context/UserContext";
import {resolveUrlTemplate} from "../../api/utils/resolve-url-template";
import {BESTILLINGS_SKJEMA} from "../../paths-client.json"

function BestillingsListe() {
    const {questionnaireResponseList} = useUserContext();
    return (
        <div>
            <ul>
                {questionnaireResponseList?.map(questionnaireResponse =>
                    <li>
                        Bestilling:
                        <a href={resolveUrlTemplate(BESTILLINGS_SKJEMA, {id: questionnaireResponse.id || ""})}>
                            {questionnaireResponse.id}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default BestillingsListe;
