import { IQuestionnaire_Item, IQuestionnaireResponse_Item } from '@ahryman40k/ts-fhir-types/lib/R4';
import { createQuestionnaireResponseItem } from '@navikt/fhir';

export class QuestionnaireItem {
  private questionnaireItem: IQuestionnaire_Item;
  private responseItems: IQuestionnaireResponse_Item[];
  private parent?: QuestionnaireItem;
  private children: QuestionnaireItem[];

  constructor(
    questionnaireItem: IQuestionnaire_Item,
    responseItems: IQuestionnaireResponse_Item[],
    parentItem?: QuestionnaireItem
  ) {
    this.children = [];
    this.questionnaireItem = questionnaireItem;
    if (responseItems.length === 0) {
      this.responseItems = [createQuestionnaireResponseItem(questionnaireItem)];
    } else {
      this.responseItems = responseItems;
    }
    this.parent = parentItem;
  }

  getLinkid(): string {
    return this.questionnaireItem.linkId as string;
  }

  getQuestionnaireItem() {
    return this.questionnaireItem;
  }

  getResponseItems() {
    return this.responseItems;
  }

  updateResponseItem(responseItem: IQuestionnaireResponse_Item) {
    const index = this.responseItems.findIndex((item) => item.id === responseItem.id);
    if (index) {
      this.responseItems[index] = responseItem;
    } else {
      throw new Error('');
    }
  }

  getParent() {
    return this.parent;
  }

  setParent(item: QuestionnaireItem) {
    this.parent = item;
  }

  addChild(item: QuestionnaireItem) {
    this.children.push(item);
  }

  setResponseItems(items: IQuestionnaireResponse_Item[]) {
    this.responseItems = items;
  }

  addResponseItem(item: IQuestionnaireResponse_Item) {
    this.responseItems.push(item);
  }
}
