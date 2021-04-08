import {Consumer, Kafka, KafkaMessage} from "kafkajs";
import logger from "../utils/logger";

export const kafkaConsumer = async (kafkaClient: Kafka, groupId, topic, onMessage: (m: KafkaMessage) => void): Promise<Consumer> => {
    const consumer = kafkaClient.consumer({groupId})
    await consumer.connect()
    await consumer.subscribe({topic})
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const {size, key} = message;
            logger.debug("KafkaReceivedMessage" + key, {topic, partition, size});
            onMessage(message);
        }
    })
    return consumer;
}
