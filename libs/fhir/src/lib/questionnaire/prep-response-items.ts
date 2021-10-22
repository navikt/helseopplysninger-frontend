import { IQuestionnaire_Item, IQuestionnaireResponse_Item } from '@ahryman40k/ts-fhir-types/lib/R4';
import { createQuestionnaireResponseItem } from './response-item-utils';

export const prepareQuestionnaireResponseItems = (
  questionnaireItems: IQuestionnaire_Item[],
  responseItems: IQuestionnaireResponse_Item[]
) => {
  const localResponseItems = [...responseItems];

  const findResponseItemsByLinkId = (linkId: string | undefined): IQuestionnaireResponse_Item[] => {
    return localResponseItems.filter((item) => item.linkId === linkId);
  };

  const findResponseItemIndex = (responseItemId: string | undefined): number => {
    return localResponseItems.findIndex((item) => item.id === responseItemId);
  };

  const findQuestionnaireItemByLinkId = (
    linkId: string | undefined
  ): IQuestionnaire_Item | undefined => {
    return questionnaireItems.find((item) => item.linkId === linkId);
  };
  questionnaireItems.forEach((questionnaireItem) => {
    const { linkId } = questionnaireItem;
    const localResponseItem = findResponseItemsByLinkId(linkId);
    if (localResponseItem.length === 0) {
      localResponseItems.push(createQuestionnaireResponseItem(questionnaireItem));
    }
  });

  return {
    findQuestionnaireItemByLinkId,
    findResponseItemsByLinkId,
    findResponseItemIndex,
    localResponseItems,
  };
};
