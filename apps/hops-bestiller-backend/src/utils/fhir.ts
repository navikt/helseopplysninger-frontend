import {
    BundleTypeKind,
    IBundle,
    IBundle_Entry,
    IMessageHeader,
    IQuestionnaire,
    IQuestionnaire_Item,
    IResourceList,
    ITask,
    QuestionnaireStatusKind,
    TaskIntentKind,
    TaskStatusKind
} from "@ahryman40k/ts-fhir-types/lib/R4";
import {v4 as uuidv4} from "uuid";

export const createFhirMessageBundle = (resources: IResourceList[]): IBundle => {
    const messageHeader: IMessageHeader = {
        id: uuidv4(),
        resourceType: "MessageHeader",
        source: {
            endpoint: "http://hops-bestiller-backend"
        },
        eventUri: "bestilling",
        focus: []
    }
    const entry: IBundle_Entry[] = [{
        fullUrl: "urn:uuid:" + messageHeader.id,
        resource: messageHeader
    }];
    resources.forEach(resource => {
        const fullUrl = "urn:uuid:" + resource.id
        messageHeader.focus.push({
            reference: fullUrl,
        });
        entry.push({
            fullUrl,
            resource
        })
    })
    const bundle: IBundle = {
        id: uuidv4(),
        resourceType: "Bundle",
        type: BundleTypeKind._message,
        timestamp: (new Date()).toISOString(),
        entry: entry
    }
    return bundle;
}

export const createFhirTask = (description: string, ident: string): ITask => {
    const task: ITask = {
        id: uuidv4(),
        resourceType: "Task",
        status: TaskStatusKind._draft,
        intent: TaskIntentKind._order,
        description: description + ident,
    }
    return task;
}

export const createFhirQuestionaire = (name, items: IQuestionnaire_Item[]): IQuestionnaire => {
    const questionaire: IQuestionnaire = {
        id: uuidv4(),
        name,
        resourceType: "Questionnaire",
        status: QuestionnaireStatusKind._draft,
        item: items,
    }
    return questionaire;
}
