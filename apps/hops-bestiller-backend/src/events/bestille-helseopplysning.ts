import {BundleTypeKind, IBundle} from "@ahryman40k/ts-fhir-types/lib/R4";
import { v4 as uuidv4 } from 'uuid';
import {kafkaProducer} from "../kafka/kafka-producer";
import {Fhir} from "fhir/fhir";
import {Kafka} from "kafkajs";


const fhir = new Fhir();


export const bestilleHelseopplysning = async (kafkaClient: Kafka, topic: string, bestilling:any[]) => {
    const bundle: IBundle = {
        id: uuidv4(),
        resourceType: "Bundle",
        link: [],
        type: BundleTypeKind._message,
        timestamp: (new Date()).toISOString(),
        entry: bestilling
    }
    fhir.validate(bundle);
    const recordMetadata = await kafkaProducer(
        kafkaClient,
        topic,
        bundle
    );
    return recordMetadata;
}
