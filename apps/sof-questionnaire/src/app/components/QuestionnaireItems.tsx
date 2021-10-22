import React from 'react';
import { IQuestionnaire_Item, IQuestionnaireResponse_Item } from '@ahryman40k/ts-fhir-types/lib/R4';
import ItemMapper from './questionnaire/ItemMapper';
import { Button } from '@navikt/ds-react';
import { createQuestionnaireResponseItem, prepareQuestionnaireResponseItems } from '@navikt/fhir';

interface QuestionnaireItemsProps {
  questionnaireItems: IQuestionnaire_Item[];
  responseItems: IQuestionnaireResponse_Item[];
  setResponseItems: (responseItems: IQuestionnaireResponse_Item[]) => void;
}

const QuestionnaireItems: React.FunctionComponent<QuestionnaireItemsProps> = ({
  questionnaireItems,
  responseItems,
  setResponseItems,
}) => {
  const { localResponseItems, findResponseItemIndex, findResponseItemsByLinkId } =
    prepareQuestionnaireResponseItems(questionnaireItems, responseItems);

  const setResponseItem = (responseItem: IQuestionnaireResponse_Item) => {
    const itemIndex = findResponseItemIndex(responseItem.id);
    const copyOfresponseItems = [...localResponseItems];
    if (itemIndex > -1) {
      copyOfresponseItems[itemIndex] = responseItem;
    } else {
      console.log('adding', responseItem);
      copyOfresponseItems.push(responseItem);
    }
    setResponseItems(copyOfresponseItems);
  };

  return (
    <>
      {questionnaireItems.map((questionnaireItem) => {
        let enabled = true;
        /*
                    Her skal man sjekke igjennom alle conditions
                     */
        if (questionnaireItem.enableWhen) {
          enabled = false;
          const enableWhenResponseItem = findResponseItemsByLinkId(
            questionnaireItem.enableWhen[0].question
          );
          if (
            enableWhenResponseItem &&
            enableWhenResponseItem[0].answer &&
            enableWhenResponseItem[0].answer[0] &&
            enableWhenResponseItem[0].answer[0].valueBoolean
          ) {
            const answer = enableWhenResponseItem[0].answer[0].valueBoolean;
            enabled = answer === questionnaireItem.enableWhen[0].answerBoolean;
          }
        }
        return (
          <div key={questionnaireItem.linkId} hidden={!enabled}>
            <div>
              {findResponseItemsByLinkId(questionnaireItem.linkId).map((responseItem) => (
                <ItemMapper
                  {...{
                    key: responseItem.id,
                    questionnaireItem,
                    responseItem,
                    setResponseItem,
                  }}
                />
              ))}
            </div>
            {questionnaireItem.repeats && (
              <Button
                variant={'primary'}
                style={{ float: 'right' }}
                onClick={() => setResponseItem(createQuestionnaireResponseItem(questionnaireItem))}
              >
                Legg til {questionnaireItem.text}
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default QuestionnaireItems;
