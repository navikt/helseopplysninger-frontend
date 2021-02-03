import React, {useEffect, useState} from "react";
import {IQuestionnaireResponse} from "@ahryman40k/ts-fhir-types/lib/R4";
import {fetchQuestionnaireResponseList} from "../utils/questionnaire";


type ContextProps = {
    questionnaireResponseList: IQuestionnaireResponse[];
};
export const UserContext = React.createContext<Partial<ContextProps>>({
    questionnaireResponseList:[]
});

export const useUserContext = function (): Partial<ContextProps> {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
}
export const UserContextProvider = (props: any) => {
    const [
        questionnaireResponseList,
        setQuestionnaireResponseList
    ] = useState<IQuestionnaireResponse[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchQuestionnaireResponseList();
            setQuestionnaireResponseList(data);
        }

        fetchData().catch(e => {
            console.error(e.message)
        })
    }, []);

    const context = {
        questionnaireResponseList,
    };
    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};
