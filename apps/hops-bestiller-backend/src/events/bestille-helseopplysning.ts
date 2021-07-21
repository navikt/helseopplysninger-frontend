import { createFhirBestilling, fhirBestilling } from '@navikt/fhir';
import { kafkaProduce } from '@navikt/hops-common';
import { Producer } from 'kafkajs';

export const bestilleHelseopplysning = async (
  producer: Producer,
  topic: string,
  fhirBestilling: fhirBestilling
) => {
  const bundle = createFhirBestilling(fhirBestilling);
  const recordMetadata = await kafkaProduce(producer, topic, bundle);
  return recordMetadata;
};
