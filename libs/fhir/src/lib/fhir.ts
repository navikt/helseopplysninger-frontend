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
    IQuestionnaireResponse_Item,
    IReference,
    IResourceList,
    ITask,
    QuestionnaireResponseStatusKind,
    QuestionnaireStatusKind,
    TaskIntentKind,
    TaskStatusKind
} from "@ahryman40k/ts-fhir-types/lib/R4";
import {v4 as uuidv4} from "uuid";
import {OID_FNR, OID_HPR_NR} from "./constants";

export const createFhirMessageBundle = (resources: IResourceList[], authorReference): IBundle => {
    const timestamp = (new Date()).toISOString();
    const sourceName = process.env.NAIS_APP_NAME || "local-dev"
    const namespace = process.env.NAIS_NAMESPACE || "local"
    const messageHeader: IMessageHeader = {
        id: uuidv4(),
        resourceType: "MessageHeader",
        source: {
            name: sourceName,
            version: process.env.NAIS_APP_IMAGE,
            endpoint: `http://${sourceName}.${namespace}.svc.cluster.local`
        },
        eventUri: sourceName,
        focus: []
    }
    const provenance: IProvenance = {
        id: uuidv4(),
        resourceType: "Provenance",
        recorded: timestamp,
        agent: [{
            "who": {
                "reference": authorReference
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

export const createFhirQuestionnaireResponse = (questionaire: IQuestionnaire, practioner: IReference, patient: IReference, items: IQuestionnaireResponse_Item[]): IQuestionnaireResponse => {
    return {
        resourceType: "QuestionnaireResponse",
        id: uuidv4(),
        questionnaire: questionaire.resourceType + "/" + questionaire.id,
        status: QuestionnaireResponseStatusKind._inProgress,
        source: practioner,
        subject: patient,
        item: items
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
    const questionnaireResponse = createFhirQuestionnaireResponse(questionnaire, {
        type: "Practitioner",
        identifier: practionerIdentifier
    }, {}, [])

    return createFhirMessageBundle([
        task,
        questionnaire,
        questionnaireResponse
    ], saksbehandlerIdentifier);
}

export const createFhirPatientReference = (fnr: string, display?: string) => {
    const reference: IReference = {
        type: "Patient",
        identifier: {
            system: OID_FNR,
            value: fnr,
        },
        display
    }
    return reference;
}
export const createFhirPractitionerReference = (hernr: string, display?: string) => {
    const reference: IReference = {
        type: "Practitioner",
        identifier: {
            system: OID_HPR_NR,
            value: hernr,
        },
        display
    }
    return reference;
}

export const createFhirCanonical = (resource:IResourceList) => {
    return resource.resourceType + "/" + resource.id
}
