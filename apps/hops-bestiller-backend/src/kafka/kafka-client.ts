import {Kafka} from "kafkajs";
import {kafkaConfig} from "../config";

export const kafkaClient = new Kafka(kafkaConfig);
