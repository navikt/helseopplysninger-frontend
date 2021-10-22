import React, { FC, useState, useEffect } from 'react';
import './questionnaireStylesheet.css';
import TextareaItem from './items/TextareaItem';
import CheckboxItem from './items/CheckboxItem';
import DateItem from './items/DateItem';
import InputItem from './items/InputItem';
import RadiobuttonItem from './items/RadiobuttonItem';
import { Detail } from '@navikt/ds-react';

interface IProps {
  mainItem: itemType;
  subItems: itemType[];
  optionItems: answerOptionType[];
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Map<string, string | boolean>>>;
  saved: boolean;
}

/**
 * Renders an input field and handles changes in the field.
 * @param mainItem: of type itemType that includes all attributes of the question
 * @param subItems: an array of itemType, used for items of helptext and subquestions
 * @param optionItems: array of type answerOptionType, used for "answerOption" on questions of type Choice
 * @param setAnswers: the function to update answers
 * @returns an input field
 */
export const ItemAnswer: FC<IProps> = ({
  mainItem,
  subItems,
  optionItems,
  answers,
  setAnswers,
  saved,
}) => {
  let itemHelptext = '';
  const arrayOfItems: Array<string> = [];
  const [enableWhen, setEnableWhen] = useState(true); // True as default, in order to render questions from Questionnaire

  if (subItems !== undefined) {
    // If there is a help text or subquestions, set these
    subItems.forEach((element) => {
      if (element.linkId.includes('help')) {
        itemHelptext = element.text;
      } else if (element.linkId.includes('.')) {
        arrayOfItems.push(element.text);
      }
    });
  }

  if (mainItem.answerOption !== undefined) {
    // Set the values for the radio buttons, checkboxes
    // and dates (if there are several fields)
    optionItems.forEach((element) => {
      arrayOfItems.push(element.valueCoding.display);
    });
  }

  const itemProps = {
    mainQuestion: mainItem,
    helptext: itemHelptext,
    answers: answers,
    setAnswers: setAnswers,
  };

  const renderSwitch = () => {
    switch (mainItem.type) {
      case 'display':
        return 'display';
      case 'text':
        return 'text';
      case 'string':
        return 'string';
      case 'date':
        return 'date';
      case 'group':
        if (subItems[0].type === 'boolean') {
          return 'boolean';
        } else if (subItems[0].type === 'date') {
          return 'date';
        } else {
          return 'nothing';
        }
      case 'choice':
        return 'radio';
      default:
        return 'nothing';
    }
  };

  // Check if enableWhen-items from Questionnaire should be showed
  useEffect(() => {
    if (mainItem.enableWhen) {
      if (
        answers.get(mainItem.enableWhen[0].question) === mainItem.enableWhen[0].answerCoding.code
      ) {
        setEnableWhen(true);
      } else {
        setEnableWhen(false);
      }
    }
  }, [answers]);

  return (
    <>
      {enableWhen ? (
        {
          text: <TextareaItem {...itemProps} saved={saved} />,
          string: <InputItem {...itemProps} saved={saved} />,
          boolean: <CheckboxItem {...itemProps} answeroptions={arrayOfItems} saved={saved} />,
          date: <DateItem {...itemProps} answeroptions={arrayOfItems} saved={saved} />,
          radio: <RadiobuttonItem {...itemProps} answeroptions={arrayOfItems} saved={saved} />,
          display: <Detail>{mainItem.text}</Detail>,
          nothing: <></>,
        }[renderSwitch()]
      ) : (
        <></>
      )}
    </>
  );
};
