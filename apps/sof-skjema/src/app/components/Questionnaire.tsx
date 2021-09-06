import React, { useState, useEffect } from 'react';
import { ItemAnswer } from './ItemAnswer';
import { Hovedknapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import { IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import { getAnswersFromServer } from '../utils/setAnswersFromServer';
import { useParams } from 'react-router-dom';
import { chooseQuestionnaire } from '../utils/setQuestionnaireContext';
import { useInputErrorContext } from '../context/inputErrorContext';

type QuestionnairePropsType = {
  setQuestionnaireDescription: React.Dispatch<React.SetStateAction<string>>;
  loadingQuestionnaire: boolean;
  setLoadingQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>;
};

type questionnaireParamsType = {
  questionnaireName: string;
};

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = (props: QuestionnairePropsType) => {
  const { questionnaireName } = useParams<questionnaireParamsType>();
  const [questions, setQuestions] = useState<any[]>([]);
  const {
    patient,
    user,
    client,
    questionnaire,
    questionnaireResponse,
    setQuestionnaire,
    setQuestionnaireResponse,
  } = useFhirContext();
  const { setCheckedForError } = useInputErrorContext();
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(
    new Map()
  );
  const [saved, setSaved] = useState(false); // False while fetching QR from the server
  const [disableSendBtn, setDisableSendBtn] = useState(true);

  // When entering a questionnaire, set the correct questionnaire in context.
  useEffect(() => {
    props.setLoadingQuestionnaire(true);
    chooseQuestionnaire(
      questionnaireName,
      '1.0.0',
      setQuestionnaire,
      client,
      props.setLoadingQuestionnaire,
      setQuestionnaireResponse
    );
  }, []);

  // This will be called when the questionnaire is opened, and sets
  // answers to the answers allready saved on the server (if there are any).
  useEffect(() => {
    if (client && patient && questionnaire) {
      getAnswersFromServer(
        client,
        patient,
        setAnswers,
        questionnaire,
        setSaved
      );
      setCheckedForError && setCheckedForError(false);
    } else {
      null;
    }
  }, []);

  // Saves questions from Questionnaire to the questions list when questionnaire is updated
  useEffect(() => {
    if (questionnaire) {
      setQuestions([]); // Reset questions so that new ones can be added
      getItemChildren(questionnaire);
    }
  }, [questionnaire]);

  // Set description of the Questionnaire
  useEffect(() => {
    if (questionnaire && questionnaire.description) {
      props.setQuestionnaireDescription(questionnaire.description);
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
  const handleOnClick = (e: any) => {
    if (
      answers &&
      questionnaireResponse &&
      patient &&
      user &&
      client &&
      questionnaire
    ) {
      saveAnswers(
        answers,
        questionnaireResponse,
        patient,
        user,
        client,
        questionnaire,
        e.target.id.toLowerCase() // Information about which button is clicked on
      );
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
      if (
        item.item !== undefined &&
        typeof item.item === 'object' &&
        Array.isArray(item.item)
      ) {
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
      {!props.loadingQuestionnaire ? (
        <>
          {questions.map((item: any) => {
            return <div key={item.linkId}>{displayQuestion(item)}</div>;
          })}
          <Hovedknapp
            className="buttons"
            id="btnSave"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              handleOnClick(e);
              setSaved(true);
              setDisableSendBtn(false);
              setCheckedForError && setCheckedForError(true);
            }}
          >
            Lagre
          </Hovedknapp>

          <Hovedknapp
            className="buttons"
            id="btnSend"
            onClick={(e: any) => {
              handleOnClick(e);
              setDisableSendBtn(true);
            }}
            disabled={disableSendBtn}
          >
            Send til NAV
          </Hovedknapp>
        </>
      ) : (
        <></>
      )}
      {console.log('Answers', answers)}
    </>
  );
};
