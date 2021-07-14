import {pullBundleSendQuestionnaire} from "./pull-bundle-send-questionnaire";
import {JWT} from "jose";
import {mockKafkaProducer, nockFhirResource, testFhirQuestionnaire} from "@navikt/hops-testutils";
import {QuestionnaireResponseStatusKind} from "@ahryman40k/ts-fhir-types/lib/R4";
import {randomUUID} from "crypto";


test("it should pull bundle and send questionnaire", async () => {

    const token = JWT.sign({}, "abc123");
    const resourceId = randomUUID();
    let {questionnaire, questionnaireResponse} = testFhirQuestionnaire(resourceId);
    questionnaireResponse.status = QuestionnaireResponseStatusKind._completed

    nockFhirResource(questionnaire);
    nockFhirResource(questionnaireResponse);
    const kafkaSendFunc = jest.fn()
    const operationOutcome = await pullBundleSendQuestionnaire({
        fhirServerUrl: new URL(process.env.FHIR_SERVER_ADDRESS),
        canonical: "QuestionnaireResponse/" + questionnaireResponse.id,
        token: token,
        kafkaTopic: process.env.KAFKA_TOPIC_BESTILLING,
        kafkaProducer: mockKafkaProducer(kafkaSendFunc)
    });
    expect(operationOutcome.issue.length).toBe(0);
    expect(kafkaSendFunc).toHaveBeenCalled();
})
