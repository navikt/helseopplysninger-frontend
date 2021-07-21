import { bestilleHelseopplysning } from './bestille-helseopplysning';
import { Producer } from 'kafkajs';
import { fhirBestilling } from '@navikt/fhir';

test('it should bestille helseopplysninger', async () => {
  const topic = 'fsadfasfd';
  let result = {
    topic: null,
    messages: [],
  };
  const producer = {
    send: (d) => Promise.resolve((result = d)),
    connect: jest.fn(),
    disconnect: jest.fn(),
  } as unknown as Producer;

  const bestilling: fhirBestilling = {
    description: '',
    patientIdentifier: undefined,
    practionerIdentifier: undefined,
    questionnaireItems: [],
    saksbehandlerIdentifier: '',
  };
  const metadata = await bestilleHelseopplysning(producer, topic, bestilling);
  expect(result.topic).toBe(topic);
});
