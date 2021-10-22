import { useEffect, useState } from 'react';
import { useInputErrorContext } from '../../context/inputErrorContext';
import { QuestionTextItem } from './QuestionTextItem';
import { Radio, RadioGroup } from '@navikt/ds-react';

/**
 * Renders a question with type Choice
 * @returns radiobuttons with corresponding label
 */

const RadiobuttonItem = (props: IItemProps & savedType) => {
  const optionarray: Array<string> | undefined = props.answeroptions;
  const [radioValue, setRadioValue] = useState(''); // The label value of a checked radiobutton
  const [checked, setChecked] = useState<boolean[]>(new Array(optionarray?.length).fill(false)); // A list of the options with true or false, depending on if checked
  const [inputError, setInputError] = useState('');
  const { checkedForError, setCheckedForError } = useInputErrorContext();

  // Updates when radiobutton is checked
  const handleOnChange = (value: string, index: number) => {
    setRadioValue(value);
    const copyList: boolean[] = [...checked];
    for (let i = 0; i < copyList.length; i++) {
      if (index === i) {
        copyList[i] = true;
      } else {
        copyList[i] = false;
      }
    }
    setChecked(copyList);
    setInputError('');
    setCheckedForError(false);
  };

  // When input is saved: set the radiobuttons to the correct answer.
  // It is only done if radioValue is empty, meaning that no button is checked,
  // it should only make changes to checked (list) if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    if (
      radioValue === '' &&
      props.answers.get(props.mainQuestion.linkId) &&
      typeof props.answers.get(props.mainQuestion.linkId) === 'string'
    ) {
      const temp: string = props.answers.get(props.mainQuestion.linkId) as string;
      optionarray?.map((text: string, index: number) => {
        if (text === temp) {
          checked[index] = true;
          setRadioValue(text);
        } else {
          checked[index] = false;
        }
      });
    }
  }, [props.saved]);

  // Updates answers
  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.mainQuestion.linkId, radioValue);
    props.setAnswers(copiedAnswers);
  }, [radioValue]);

  // Checks for missing input if required
  useEffect(() => {
    if (props.mainQuestion.required) {
      if (radioValue.length === 0 && checkedForError) {
        setInputError('Det er obligatorisk å velge et alternaiv');
      } else setInputError('');
    }
  }, [checkedForError]);

  return (
    <>
      <div className="componentItems">
        <RadioGroup
          legend={<QuestionTextItem mainQuestion={props.mainQuestion} helptext={props.helptext} />}
          error={inputError}
        >
          {optionarray?.map((option: string, index: number) => (
            <Radio
              onChange={() => handleOnChange(option, index)}
              key={option}
              value={option}
              name={'group' + props.mainQuestion.linkId}
              checked={checked[index]}
            >
              {option}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default RadiobuttonItem;
