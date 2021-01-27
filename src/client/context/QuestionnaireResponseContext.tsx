import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {IQuestionnaire, IQuestionnaireResponse, IQuestionnaireResponse_Item} from "@ahryman40k/ts-fhir-types/lib/R4";
import {fetchQuestionnaire, fetchQuestionnaireResponse, saveQuestionnaireResponse} from "../../api/questionnaire";


type ContextProps = {
    questionnaire: IQuestionnaire;
    questionnaireResponse: IQuestionnaireResponse;
    saveQuestionnaireResponseItems: (item: IQuestionnaireResponse_Item[]) => void;
};
export const QuestionnaireResponseContext = React.createContext<Partial<ContextProps>>({
    saveQuestionnaireResponseItems: () => {}
});

export const useQuestionnaireResponseContext = function (): Partial<ContextProps> {
    const context = React.useContext(QuestionnaireResponseContext)
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
}

export const QuestionnaireResponseContextProvider = (props: any) => {
    const [questionnaire, setQuestionnaire] = useState<IQuestionnaire>();
    const [questionnaireResponse, setQuestionnaireResponse] = useState<IQuestionnaireResponse>();
    const {id} = useParams<any>();
    useEffect(() => {
        async function fetchData() {
            const qr = await fetchQuestionnaireResponse(id);
            if (qr.questionnaire) {
                const q = await fetchQuestionnaire(qr.questionnaire);
                setQuestionnaire(q);
            }
            setQuestionnaireResponse(qr);
        }

        fetchData().catch(e => {
            console.error(e.message)
        })
    }, [id]);
    const saveQuestionnaireResponseItems = async (item: IQuestionnaireResponse_Item[]) => {
        const data = Object.assign(questionnaireResponse, {item});
        await saveQuestionnaireResponse(id, data);
        setQuestionnaireResponse(data)
    }
    const context = {
        questionnaire,
        questionnaireResponse,
        saveQuestionnaireResponseItems
    };
    return (
        <QuestionnaireResponseContext.Provider value={context}>
            {props.children}
        </QuestionnaireResponseContext.Provider>
    );
};
