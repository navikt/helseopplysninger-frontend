import { useEffect, useState } from 'react';
import { ListItem } from './ListItem';
import { useInputErrorContext } from '../../context/inputErrorContext';
import { QuestionTextItem } from './QuestionTextItem';
import { Button, Popover, TextField } from '@navikt/ds-react';

/**
 * Renders a question with type String
 * @returns an input field for multi-selection
 */

const InputItem = (props: IItemProps & savedType) => {
  const [inputValue, setInputValue] = useState(''); // The written value in the input field
  const [tempValueList, setTempValueList] = useState<string[]>([]); // A (temporary) list of the values added from the input field
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputError, setInputError] = useState('');
  const { checkedForError, setCheckedForError } = useInputErrorContext();

  const exampleElements = [
    'F41.9: Uspesifisert angstlidelse',
    'F50: Spiseforstyrrelser',
    'F50.0: Anorexia nervosa',
    'F50.2: Bulimia nervosa',
    'F84.0: Barneautisme',
    'F93.1: Fobisk angstlidelse i barndommen',
    'R53: Uvelhet og tretthet',
    'R63.0: Anoreksi',
    // A selection of diagnoses from https://finnkode.ehelse.no/#icd10/0/0/0/-1 (codes from ICD-10)
  ];

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
    setCheckedForError(false);
  };

  // Displays the popover-window when the input field is focused
  const handleOnFocus = (e: any) => {
    setOpen(true);
    setInputError('');
    setCheckedForError(false);
  };

  // Adds the input element in the tempValueList, if not element is contained already or an empty string
  const handleAddElement = () => {
    if (!tempValueList.includes(inputValue) && inputValue !== '') {
      setTempValueList((prevState) => [...prevState, inputValue]);
    }
    setCheckedForError(false);
  };

  // Sets the chosen element in the input field
  const handleChooseElement = (e: any) => {
    setInputValue(e.target.innerHTML);
  };

  // Compares elements with the input field && checks if element is already chosen
  const displayElements = (element: string) => {
    const tempAnswer = props.answers.get(props.mainQuestion.linkId);
    if (
      element.toLowerCase().includes(inputValue.toLowerCase()) &&
      (tempAnswer === undefined ||
        (typeof tempAnswer === 'string' && !tempAnswer.includes(element)))
    ) {
      return (
        <Button
          variant={'secondary'}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
          }}
          size={'small'}
          onClick={handleChooseElement}
        >
          {element}
        </Button>
      );
    }
    return <></>;
  };

  // When input is saved,
  // if tempValueList is empty (secures that no new answers can be overwritten)
  // and there is an answer saved on the server,
  // the tempValueList sets to the saved answers.
  useEffect(() => {
    if (
      tempValueList.length === 0 &&
      props.answers.get(props.mainQuestion.linkId) &&
      typeof props.answers.get(props.mainQuestion.linkId) === 'string'
    ) {
      let temp: string = props.answers.get(props.mainQuestion.linkId) as string;
      if (temp[0] !== '[') {
        temp = '[' + temp + ']';
      }
      setTempValueList(JSON.parse(temp));
    }
  }, [props.saved]);

  // Update answers when changes to tempValueList are made
  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.mainQuestion.linkId, JSON.stringify(tempValueList));
    props.setAnswers(copiedAnswers);
    setInputValue(''); // Set input field to default value (empty)
  }, [tempValueList]);

  // Checks for missing input if required
  useEffect(() => {
    if (props.mainQuestion.required) {
      if (tempValueList.length === 0 && checkedForError) {
        setInputError('Mangler data, husk å trykk på "Legg til"');
      } else {
        setInputError('');
      }
    }
  }, [checkedForError]);
  return (
    <>
      <div className="componentItems" style={{ display: 'flex' }}>
        <div className="innerContainerInput">
          <TextField
            ref={(el) => {
              //setAnchorEl(el);
            }}
            className="inputTextAreas"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            value={inputValue}
            label={<QuestionTextItem mainQuestion={props.mainQuestion} helptext={props.helptext} />}
            error={inputError}
          />
          {/**
          <Popover
            anchorEl={anchorEl}
            open={open}
            //onClose={() => setOpen(false)}
            onClose={() => {}}
            placement={'bottom-start'}
          >
            {exampleElements.map((dataElem: string, index: number) => {
              return <div key={props.mainQuestion.linkId + index}>{displayElements(dataElem)}</div>;
            })}
          </Popover>
          */}
        </div>
        <div style={{ paddingTop: '26px' }}>
          <Button
            variant={'primary'}
            size={'small'}
            style={{
              marginLeft: '10px',
              height: '22px',
              width: '100px',
            }}
            onClick={handleAddElement}
          >
            Legg til
          </Button>
        </div>
      </div>
      <ListItem valueList={tempValueList} setValueList={setTempValueList} />
    </>
  );
};

export default InputItem;
