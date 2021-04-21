import {
    BundleTypeKind,
    IBundle,
    IBundle_Entry,
    IIdentifier,
    IMessageHeader,
    IProvenance,
    IQuestionnaire,
    IQuestionnaire_Item,
    IQuestionnaireResponse,
    IResourceList,
    ITask,
    QuestionnaireResponseStatusKind,
    QuestionnaireStatusKind,
    TaskIntentKind,
    TaskStatusKind
} from "@ahryman40k/ts-fhir-types/lib/R4";
import {v4 as uuidv4} from "uuid";

export const createFhirMessageBundle = (resources: IResourceList[], authorIdent): IBundle => {
    const timestamp = (new Date()).toISOString();
    const messageHeader: IMessageHeader = {
        id: uuidv4(),
        resourceType: "MessageHeader",
        source: {
            endpoint: "http://hops-bestiller-backend"
        },
        eventUri: "bestilling",
        focus: []
    }
    const provenance: IProvenance = {
        id: uuidv4(),
        resourceType: "Provenance",
        recorded: timestamp,
        agent: [{
            "who": {
                "reference": "Practitioner/" + authorIdent
            }
        }],
        target: []
    }
    const entry: IBundle_Entry[] = [{
        fullUrl: "urn:uuid:" + messageHeader.id,
        resource: messageHeader
    }, {
        fullUrl: "urn:uuid:" + provenance.id,
        resource: provenance
    }];
    resources.forEach(resource => {
        const fullUrl = "urn:uuid:" + resource.id
        messageHeader.focus.push({
            reference: fullUrl,
        });
        provenance.target.push({
            reference: fullUrl,
        })
        entry.push({
            fullUrl,
            resource
        })
    })

    return {
        id: uuidv4(),
        resourceType: "Bundle",
        type: BundleTypeKind._message,
        timestamp,
        entry
    };
}

export const createFhirTask = (description: string, patientIdent: IIdentifier): ITask => {
    return {
        id: uuidv4(),
        resourceType: "Task",
        status: TaskStatusKind._draft,
        intent: TaskIntentKind._order,
        description: description,
        for: {
            type: "Patient",
            identifier: patientIdent
        }
    };
}

export const createFhirQuestionnaire = (name, items: IQuestionnaire_Item[]): IQuestionnaire => {
    return {
        id: uuidv4(),
        name,
        resourceType: "Questionnaire",
        status: QuestionnaireStatusKind._draft,
        item: items,
    };

}

export const createFhirQuestionnaireResponse = (questionaire: IQuestionnaire, practionerIdentifier: IIdentifier): IQuestionnaireResponse => {
    return {
        resourceType: "QuestionnaireResponse",
        id: uuidv4(),
        questionnaire: "urn:uuid:" + questionaire.id,
        status: QuestionnaireResponseStatusKind._inProgress,
        source: {
            type: "Practitioner",
            identifier: practionerIdentifier,
        }
    };
}
export type fhirBestilling = {
    patientIdentifier: IIdentifier,
    practionerIdentifier: IIdentifier,
    questionnaireItems: IQuestionnaire_Item[],
    saksbehandlerIdentifier: string,
    description: string;
}

export const createFhirBestilling = (data: fhirBestilling) => {
    const {
        patientIdentifier,
        practionerIdentifier,
        saksbehandlerIdentifier,
        questionnaireItems,
        description,
    } = data
    const task = createFhirTask(description, patientIdentifier);
    const questionnaire = createFhirQuestionnaire(description, questionnaireItems);
    const questionnaireResponse = createFhirQuestionnaireResponse(questionnaire, practionerIdentifier)

    return createFhirMessageBundle([
        task,
        questionnaire,
        questionnaireResponse
    ], saksbehandlerIdentifier);
}
