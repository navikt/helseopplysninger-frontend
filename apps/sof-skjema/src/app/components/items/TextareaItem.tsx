import { useEffect, useState } from 'react';
import { useInputErrorContext } from '../../context/inputErrorContext';
import { QuestionTextItem } from './QuestionTextItem';
import { Textarea } from '@navikt/ds-react';

/**
 * Renders a question with type Text
 * @returns a text box (TextArea) for user input
 */

const TextareaItem = (props: IItemProps & savedType) => {
  const [textValue, setTextValue] = useState('');
  const [inputError, setInputError] = useState('');
  const { checkedForError, setCheckedForError } = useInputErrorContext();

  // Updates textValue when writing in the text area field
  const handleOnChange = (e: any) => {
    setTextValue(e.target.value);
    setCheckedForError(false);
  };

  // When input is saved: set the fields text to the correct answer.
  // It is only done if textValue is empty, meaning that it should only
  // make changes to textValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    if (textValue === '' && typeof props.answers.get(props.mainQuestion.linkId) === 'string') {
      setTextValue(props.answers.get(props.mainQuestion.linkId) as string);
    }
  }, [props.saved]);

  // Update answers
  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.mainQuestion.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  // Checks for missing input if required
  useEffect(() => {
    if (props.mainQuestion.required) {
      if (textValue.length === 0 && checkedForError) {
        setInputError('Det er obligatorisk å fylle inn');
      } else {
        setInputError('');
      }
    }
  }, [checkedForError]);

  return (
    <>
      <div className="componentItems">
        <Textarea
          label={<QuestionTextItem mainQuestion={props.mainQuestion} helptext={props.helptext} />}
          value={textValue}
          onChange={handleOnChange}
          maxLength={0}
          error={inputError}
        ></Textarea>
      </div>
    </>
  );
};

export default TextareaItem;
