import { IResourceList } from '@ahryman40k/ts-fhir-types/lib/R4';
import { randomUUID } from 'crypto';

export const addCorreleationId = (inResource: IResourceList): IResourceList => {
  const outResource = Object.assign({}, inResource);
  outResource.meta = outResource.meta || {};
  outResource.meta.extension = outResource.meta.extension || [];
  outResource.meta.extension.push({
    url: 'https://fhir.nav.no/StructureDefinition/nav-CorrelationId',
    valueString: randomUUID(),
  });
  return outResource;
};
