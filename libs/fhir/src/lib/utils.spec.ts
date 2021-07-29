import { IQuestionnaireResponse } from '@ahryman40k/ts-fhir-types/lib/R4';
import { addCorreleationId } from './utils';
import validator from 'validator';
import isUUID = validator.isUUID;

test('it should add correlation id', async () => {
  const resource: IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
  };
  const outResource = addCorreleationId(resource);
  console.log(outResource);
  expect(outResource.resourceType).toBe('QuestionnaireResponse');
  expect(isUUID(outResource.meta.extension[0].valueString)).toBeTruthy();
});
