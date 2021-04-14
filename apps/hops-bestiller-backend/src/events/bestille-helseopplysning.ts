import {IResourceList} from "@ahryman40k/ts-fhir-types/lib/R4";
import {kafkaProducer} from "../kafka/kafka-producer";
import {Kafka} from "kafkajs";
import {createFhirMessageBundle} from "../utils/fhir";

export const bestilleHelseopplysning = async (
    kafkaClient: Kafka,
    topic: string,
    resources: IResourceList[]
) => {
    const bundle = createFhirMessageBundle(resources);
    const recordMetadata = await kafkaProducer(
        kafkaClient,
        topic,
        bundle
    );
    return recordMetadata;
}
