import {kafkaProducer} from "../kafka/kafka-producer";
import {Kafka} from "kafkajs";
import {createFhirBestilling, fhirBestilling} from "../utils/fhir";

export const bestilleHelseopplysning = async (
    kafkaClient: Kafka,
    topic: string,
    fhirBestilling: fhirBestilling
) => {
    const bundle = createFhirBestilling(fhirBestilling);
    const recordMetadata = await kafkaProducer(
        kafkaClient,
        topic,
        bundle
    );
    return recordMetadata;
}
