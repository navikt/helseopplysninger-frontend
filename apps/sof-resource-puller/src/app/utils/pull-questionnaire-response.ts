import {IQuestionnaireResponse} from "@ahryman40k/ts-fhir-types/lib/R4";
import pullResource from "./pull-resource";

async function pullQuestionnaireResponse(resourceUrl: URL, token: string): Promise<IQuestionnaireResponse> {
    const resource = await pullResource(resourceUrl, token);
    return resource as IQuestionnaireResponse
}
