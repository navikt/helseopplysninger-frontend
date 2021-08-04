import {
  IQuestionnaire_Item,
  IQuestionnaireResponse_Item,
  IResourceList,
  Questionnaire_ItemTypeKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import {
  createFhirPatientReference,
  createFhirPractitionerReference,
  createFhirQuestionnaire,
  createFhirQuestionnaireResponse,
} from '@navikt/fhir';
import axios from 'axios';
import * as nock from 'nock';
import { Scope } from 'nock';
import { Producer, ProducerRecord } from 'kafkajs';

export function hopsTestutils(): string {
  return 'hops-testutils';
}

export function testFhirQuestionnaire(id: string) {
  const items: IQuestionnaire_Item[] = [
    {
      linkId: 'the-first-item',
      type: Questionnaire_ItemTypeKind._string,
      text: 'Hva hadde du til middag?',
    },
    {
      linkId: 'the-second-item',
      type: Questionnaire_ItemTypeKind._string,
      text: 'Hva heter favoritt artisten din?',
    },
  ];
  const answers: IQuestionnaireResponse_Item[] = [];
  items.forEach((item) => {
    answers.push({
      linkId: item.linkId,
      text: item.text,
      answer: [
        {
          valueString: 'Sodd',
        },
      ],
    });
  });
  const practitioner = createFhirPractitionerReference('herid-123');
  const patient = createFhirPatientReference('fnr-123');
  let questionnaire = createFhirQuestionnaire('test', items);
  questionnaire.id = id;
  let questionnaireResponse = createFhirQuestionnaireResponse(
    questionnaire,
    practitioner,
    patient,
    answers
  );
  questionnaireResponse.id = id;
  return {
    questionnaireResponse,
    questionnaire,
  };
}

export async function pushResource(
  fhirServerUrl: URL,
  resource: IResourceList
): Promise<IResourceList> {
  const resourceUrl = [fhirServerUrl.toString(), resource.resourceType, resource.id].join('/');
  const result = await axios.request({
    url: resourceUrl,
    method: 'PUT',
    data: resource,
  });
  return result.data as IResourceList;
}

export function nockFhirResource(resource: IResourceList): Scope {
  return nock(process.env.FHIR_SERVER_ADDRESS)
    .persist()
    .get('/' + resource.resourceType + '/' + resource.id)
    .reply(200, resource);
}

export function mockKafkaProducer(kafkaSendFunc): Producer {
  const producer = {
    send: async (record: ProducerRecord) => {
      kafkaSendFunc(record);
      console.log('mockKafkaProducer:send', record);
    },
    connect: async () => {
      console.log('mockKafkaProducer:connect');
    },
    disconnect: async () => {
      console.log('mockKafkaProducer:disconnect');
    },
  };
  return producer as unknown as Producer;
}
