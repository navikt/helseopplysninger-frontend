import { IResourceList } from '@ahryman40k/ts-fhir-types/lib/R4';
import { v4 as uuidv4 } from 'uuid';

export const addCorreleationId = (inResource: IResourceList): IResourceList => {
  const outResource = Object.assign({}, inResource);
  outResource.meta = outResource.meta || {};
  outResource.meta.extension = outResource.meta.extension || [];
  outResource.meta.extension.push({
    url: 'https://fhir.nav.no/StructureDefinition/nav-CorrelationId',
    valueString: uuidv4(),
  });
  return outResource;
};
