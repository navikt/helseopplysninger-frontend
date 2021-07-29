import {
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { addCorreleationId } from '@navikt/fhir';

export const finishQuestionnaireResponse = (
  inResource: IQuestionnaireResponse
): IQuestionnaireResponse => {
  const outResource = addCorreleationId(inResource) as IQuestionnaireResponse;
  outResource.status = QuestionnaireResponseStatusKind._completed;
  return outResource;
};
