import {
  IQuestionnaire,
  IQuestionnaire_Item,
  IQuestionnaireResponse,
  IQuestionnaireResponse_Item,
  IReference,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import isURL from 'validator/lib/isURL';
import { extractQuestionnaireItems, findItemsBasedOnLinkId } from './questionnaire/find-item';
import { QuestionnaireItem } from './QuestionnaireItem';
import { createQuestionnaireResponseItem } from '@navikt/fhir';

export class QuestionnaireResponse {
  private readonly questionnaire: IQuestionnaire;
  private readonly response: IQuestionnaireResponse;
  private readonly items: QuestionnaireItem[];
  private onChangeListner: { (response: IQuestionnaireResponse): void }[];

  triggerOnChangeListner() {
    this.onChangeListner.forEach((func) => {
      func(this.response);
    });
  }

  constructor(
    questionnaire: IQuestionnaire,
    response: IQuestionnaireResponse,
    patient: IReference,
    practitioner: IReference
  ) {
    this.onChangeListner = [];
    this.questionnaire = Object.assign({}, questionnaire);
    this.response = Object.assign({}, response);

    if (!questionnaire.url || !isURL(questionnaire.url)) {
      throw new Error('Questionnaire ned to have url');
    }

    if (response.questionnaire && response.questionnaire !== questionnaire.url) {
      throw new Error('Trying to change exisiting questionnaire on response');
    } else {
      this.response.questionnaire = questionnaire.url;
    }

    if (response.subject && response.subject !== patient) {
      throw new Error('Trying to change exisiting subject on response');
    } else {
      this.response.subject = patient;
    }

    if (response.source && response.source !== practitioner) {
      throw new Error('Trying to change exisiting source on response');
    } else {
      this.response.source = practitioner;
    }
    if (!response.status) {
      this.response.status = QuestionnaireResponseStatusKind._inProgress;
    }
    if (!Array.isArray(this.response.item)) {
      this.response.item = [];
    }
    this.items = extractQuestionnaireItems(this.questionnaire.item || []);

    // Ensures that all questionnaire item have an response item
    this.items.forEach((item) => {
      const responseItems = this.findResponseItemsByLinkId(item.getLinkid());
      if (responseItems.length > 0) {
        item.setResponseItems(responseItems);
      } else {
        item.addResponseItem(createQuestionnaireResponseItem(item.getQuestionnaireItem()));
      }
    });
  }

  findResponseItemsByLinkId(linkId: string): IQuestionnaireResponse_Item[] {
    return findItemsBasedOnLinkId(
      linkId,
      this.response.item || []
    ) as IQuestionnaireResponse_Item[];
  }

  findQuestionnaireItemByLinkId(linkId: string | undefined): IQuestionnaire_Item | undefined {
    return this.questionnaire.item?.find((item) => item.linkId === linkId);
  }

  getQuestionnaire(): IQuestionnaire {
    return Object.assign({}, this.questionnaire);
  }

  getResponse(): IQuestionnaireResponse {
    const response = Object.assign({}, this.response);

    return response;
  }

  onChange(onChange: (response: IQuestionnaireResponse) => void): void {
    this.onChangeListner.push(onChange);
  }

  findItemByLinkId(linkId: string): QuestionnaireItem | undefined {
    return this.items.find((item) => item.getLinkid() === linkId);
  }

  addResponseItem(linkId: string): IQuestionnaireResponse_Item {
    const item = this.findItemByLinkId(linkId);

    if (!item) {
      throw new Error(
        'Trying to add a QuestionnaireResponseItem that doesnt have a corresponding QuestionnaireItem.'
      );
    }
    const questionnaireItem = item.getQuestionnaireItem();
    if (!questionnaireItem.repeats) {
      throw new Error('Trying to add a QuestionnaireResponseItem that is not repeatable.');
    }

    const newItem = createQuestionnaireResponseItem(questionnaireItem);
    item.addResponseItem(newItem);
    this.triggerOnChangeListner();
    return newItem;
  }

  setResponseItem(responseItem: IQuestionnaireResponse_Item): void {
    const item = this.findItemByLinkId(responseItem.linkId || '');
    if (!item) {
      throw new Error(
        'Trying to add a QuestionnaireResponseItem that doesnt have a corresponding QuestionnaireItem.'
      );
    }
    item.updateResponseItem(responseItem);
    this.triggerOnChangeListner();
  }
}
