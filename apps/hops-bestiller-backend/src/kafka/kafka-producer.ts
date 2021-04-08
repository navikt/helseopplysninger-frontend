import {Kafka, RecordMetadata} from "kafkajs";

export const kafkaProducer = async (kafkaClient: Kafka, topic: string, message: any): Promise<RecordMetadata[]> => {
    const producer = kafkaClient.producer()
    await producer.connect()
    const metadata = await producer.send({
        topic,
        messages: [{
            key: null,
            value: JSON.stringify(message)
        }],
    })
    await producer.disconnect();

    return metadata;
}
