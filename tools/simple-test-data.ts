import axios from "axios";
import dotenv from 'dotenv'
import {
    IQuestionnaire,
    IQuestionnaireResponse,
    IResourceList,
    NarrativeStatusKind,
    QuestionnaireResponseStatusKind,
    QuestionnaireStatusKind
} from "@ahryman40k/ts-fhir-types/lib/R4";

dotenv.config()

function makeValidationUrl(baseUrl: string, resource: IResourceList) {
    return [baseUrl, resource.resourceType, "$validate"].join("/")
}

function makeUrl(baseUrl: string, resource: IResourceList) {
    return [baseUrl, resource.resourceType, resource.id].join("/")
}

function output(resource: IResourceList, message:string, data:any) {
    console.log(resource.resourceType, message)
    console.log(data)
}

function validateFhirResource(fhirBaseUrl: string, resource: IResourceList) {
    axios.post(makeValidationUrl(fhirBaseUrl, resource), resource).then(res => {
        output(resource, "request all good", res.data)
    }).catch(error => {
        output(resource, error.message, error.response.data)
    })
}

function putFhirResource(fhirBaseUrl: string, resource: IResourceList) {
    axios.put(makeUrl(fhirBaseUrl, resource), resource).then(res => {
        output(resource, "request all good", res.data)
    }).catch(error => {
        output(resource, error.message, error.response.data)
    })
}

const fhirBaseUrl = process.env.FHIR_SERVER_ADDRESS || "";
const questionnaire: IQuestionnaire = {
    id: "questionnaire-123",
    resourceType: "Questionnaire",
    name: "MyLittleTestQuestionnaire",
    text: {
        status: NarrativeStatusKind._generated,
        div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">The Questionnaire</div>"
    },
    status: QuestionnaireStatusKind._active,
}
questionnaire.url = makeUrl(fhirBaseUrl, questionnaire);

const questionnaireResponse: IQuestionnaireResponse = {
    id: "questionnaire-response-123",
    resourceType: "QuestionnaireResponse",
    text: {
        status: NarrativeStatusKind._generated,
        div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">The response</div>"
    },
    questionnaire: makeUrl(fhirBaseUrl, questionnaire),
    status: QuestionnaireResponseStatusKind._completed
}

if (1) {
    validateFhirResource(fhirBaseUrl, questionnaire)
    validateFhirResource(fhirBaseUrl, questionnaireResponse)
} else {
    putFhirResource(fhirBaseUrl, questionnaire)
    putFhirResource(fhirBaseUrl, questionnaireResponse)
}
/*
axios.get(makeUrl(fhirBaseUrl, questionnaireResponse)).then(res => {
    console.log(res.data);
});
*/
