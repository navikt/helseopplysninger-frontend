import {bestilleHelseopplysning} from "./bestille-helseopplysning";
import {Kafka} from "kafkajs";
import {fhirBestilling} from "@navikt/fhir";

test("it should bestille helseopplysninger", async () => {
    const topic = "fsadfasfd";
    let result = {
        topic: null,
        messages: [],
    };
    const kafkaClient = {
        producer: () => {
            return {
                send: (d) => Promise.resolve(result = d),
                connect: jest.fn(),
                disconnect: jest.fn(),
            };
        }
    } as unknown as Kafka;
    const bestilling: fhirBestilling = {
        description: "",
        patientIdentifier: undefined,
        practionerIdentifier: undefined,
        questionnaireItems: [],
        saksbehandlerIdentifier: ""

    }
    const metadata = await bestilleHelseopplysning(kafkaClient, topic, bestilling);
    expect(result.topic).toBe(topic)
})
