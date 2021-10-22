import { IQuestionnaire_Item, Questionnaire_ItemTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4';
import { bestillerFixtures } from '@navikt/fixtures';

export const getFhirItems = (): IQuestionnaire_Item[] => {
  return bestillerFixtures.items.map((item) =>
    Object.assign(item, {
      type: Questionnaire_ItemTypeKind._string,
      repeats: false,
    })
  );
};
