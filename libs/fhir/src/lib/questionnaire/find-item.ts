import {
  IQuestionnaire_Item,
  IQuestionnaireResponse_Item,
  Questionnaire_ItemTypeKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { QuestionnaireItem } from '../QuestionnaireItem';

export declare type IItemResourceList = IQuestionnaire_Item | IQuestionnaireResponse_Item;

const findBasedOn = (
  idName: keyof IItemResourceList,
  idValue: string,
  currentItems: IItemResourceList[]
) => {
  const items = currentItems.filter((item) => item[idName] === idValue);
  if (items.length > 0) {
    return items;
  } else {
    let node: IItemResourceList[] = [];
    currentItems.forEach((item) => {
      if (item.item) {
        node = findBasedOn(idName, idValue, item.item);
      }
    });
    return node;
  }
};

export const findItemsBasedOnLinkId = (
  linkId: string,
  items: IItemResourceList[]
): IItemResourceList[] =>
  // @ts-ignore
  findBasedOn('linkId', linkId, items);

export const findItemsBasedOnId = (id: string, items: IItemResourceList[]): IItemResourceList[] =>
  // @ts-ignore
  findBasedOn('id', id, items);

/**
 * Generate the basic structure.
 *
 * @param items
 * @param parentItem
 */
export const extractQuestionnaireItems = (
  items: IQuestionnaire_Item[],
  parentItem?: QuestionnaireItem
): QuestionnaireItem[] => {
  let allItems: QuestionnaireItem[] = [];
  items.forEach((questionnaireItem) => {
    const thisItem = new QuestionnaireItem(questionnaireItem, [], parentItem);
    allItems.push(thisItem);
    if (parentItem) parentItem.addChild(thisItem); // Register the child
    if (questionnaireItem.type === Questionnaire_ItemTypeKind._group && questionnaireItem.item) {
      allItems = allItems.concat(extractQuestionnaireItems(questionnaireItem.item, thisItem));
    }
  });
  return allItems;
};
/*
export const extractResponseItems = (
  items: QuestionnaireItem[],
  parentItem?: QuestionnaireItem
): QuestionnaireItem[] => {
  const responseItems: QuestionnaireItem[] = [];
  items.forEach((item) => {
    if (item.getParent() === parentItem) {
      const thisResponseItems = item.getResponseItems();
      if (item.getQuestionnaireItem().type === Questionnaire_ItemTypeKind._group) {
        thisResponseItems.forEach((i) => {});
      } else {
        responseItems.push(...thisResponseItems);
      }
    }
  });
  return responseItems;
};
*/
