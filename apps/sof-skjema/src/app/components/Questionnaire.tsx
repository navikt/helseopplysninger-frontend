import React, { useEffect, useState } from 'react';
import { ItemAnswer } from './ItemAnswer';
import './questionnaireStylesheet.css';
import { IQuestionnaire, IQuestionnaireResponse } from '@ahryman40k/ts-fhir-types/lib/R4';
import { useInputErrorContext } from '../context/inputErrorContext';
import { Button } from '@navikt/ds-react';
import { useFhirContext } from '@navikt/sof-components';

type QuestionnairePropsType = {
  questionnaire?: IQuestionnaire;
  questionnaireResponse?: IQuestionnaireResponse;
};

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = (props: QuestionnairePropsType) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const { questionnaire, questionnaireResponse } = props;
  const { patient, user, client } = useFhirContext();
  const { setCheckedForError } = useInputErrorContext();
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(new Map());
  const [saved, setSaved] = useState(false); // False while fetching QR from the server
  const [disableSendBtn, setDisableSendBtn] = useState(true);

  // Saves questions from Questionnaire to the questions list when questionnaire is updated
  useEffect(() => {
    if (questionnaire) {
      setQuestions([]); // Reset questions so that new ones can be added
      getItemChildren(questionnaire);
    }
  }, [questionnaire]);

  // Get the items (questions) from the Questionnaire
  const getItemChildren = (q: IQuestionnaire) => {
    q.item?.map((itemChild: any) => {
      if (!questions.includes(itemChild)) {
        setQuestions((prevState) => [...prevState, itemChild]);
        if (itemChild && typeof itemChild === 'object') {
          getItemChildren(itemChild);
        }
      }
    });
  };

  // Function to make sure all values sent to saveAnswers are defined.
  const handleOnClick = async (e: any) => {
    if (answers && questionnaireResponse && patient && user && client && questionnaire) {
    }
  };

  // Function to render a question with an input field
  const displayQuestion = (item: itemType) => {
    let mainItem: itemType;
    let subItems: itemType[] = [];
    let options: answerOptionType[] = [];
    if (
      !item.linkId.includes('automatic') &&
      !item.linkId.includes('help') &&
      !item.linkId.includes('.')
    ) {
      mainItem = item;
      //If question (item) has an item-array
      if (item.item !== undefined && typeof item.item === 'object' && Array.isArray(item.item)) {
        item.item.map((subItem: itemType) => {
          subItems.push(subItem);
        });
      }
      if (item.answerOption) {
        item.answerOption.map((option: answerOptionType) => {
          options.push(option);
        });
      }
      return (
        <ItemAnswer
          mainItem={mainItem}
          subItems={subItems}
          optionItems={options}
          answers={answers}
          setAnswers={setAnswers}
          saved={saved}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    // Iterates trough all questions and filters based on the questions linkId.
    // Main questions are added as mainItems and the belonging item array (answersOption) is pushed to subItems
    <>
      {questionnaire && questionnaireResponse ? (
        <>
          {questions.map((item: any) => {
            return <div key={item.linkId}>{displayQuestion(item)}</div>;
          })}
          <Button
            variant={'primary'}
            className="buttons"
            id="btnSave"
            onClick={async (e: React.MouseEvent<HTMLElement>) => {
              await handleOnClick(e);
              setSaved(true);
              setDisableSendBtn(false);
              setCheckedForError(true);
            }}
          >
            Lagre
          </Button>

          <Button
            variant={'secondary'}
            className="buttons"
            id="btnSend"
            onClick={async (e: any) => {
              await handleOnClick(e);
              setDisableSendBtn(true);
            }}
            disabled={disableSendBtn}
          >
            Send til NAV
          </Button>
        </>
      ) : (
        <></>
      )}
      {console.log('Answers', answers)}
    </>
  );
};
