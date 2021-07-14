import {IQuestionnaire, IQuestionnaireResponse} from "@ahryman40k/ts-fhir-types/lib/R4";
import pullResource from "./pull-resource";

type ReturnValues = {
    questionnaireResponse: IQuestionnaireResponse,
    questionnaire: IQuestionnaire
}

async function pullQuestionnaireResponse(fhirServerUrl: URL, canonical, token: string): Promise<ReturnValues> {
    const questionnaireResponse = await pullResource(fhirServerUrl, canonical, token) as IQuestionnaireResponse;
    const questionnaire = await pullResource(fhirServerUrl, questionnaireResponse.questionnaire, token) as IQuestionnaire;
    return {
        questionnaireResponse,
        questionnaire
    }
}

export default pullQuestionnaireResponse
