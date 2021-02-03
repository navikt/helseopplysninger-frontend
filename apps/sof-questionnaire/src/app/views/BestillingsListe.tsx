import React from 'react'
import {useUserContext} from "../context/UserContext";
import {resolveUrlTemplate} from "../utils/resolve-url-template";

function BestillingsListe() {
    const {questionnaireResponseList} = useUserContext();
    return (
        <div>
            <ul>
                {questionnaireResponseList?.map(questionnaireResponse =>
                    <li>
                        Bestilling:
                        <a href={resolveUrlTemplate("/bestilling/utfylling/:id", {id: questionnaireResponse.id || ""})}>
                            {questionnaireResponse.id}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default BestillingsListe;
