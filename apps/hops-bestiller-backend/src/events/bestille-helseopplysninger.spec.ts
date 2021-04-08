import {bestilleHelseopplysning} from "./bestille-helseopplysning";
import {Kafka} from "kafkajs";

test("it should bestille helseopplysninger", async () => {
    const topic = "fsadfasfd";
    let result = {
        topic:null,
        messages:[],
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
    const metadata = await bestilleHelseopplysning(kafkaClient, topic,[]);
    expect(result.topic).toBe(topic)
})
