import { FC, useState, useEffect } from 'react';
import { DatepickerItem } from './DatepickerItem';
import { QuestionTextItem } from './QuestionTextItem';
import { BodyShort, Detail, Tag } from '@navikt/ds-react';

/**
 * Renders a question with type Date
 * @returns a calendar (DatepickerItem) for user input
 */

const DateItem: FC<IItemProps & savedType> = ({
  mainQuestion,
  helptext,
  answeroptions,
  answers,
  setAnswers,
  saved,
}) => {
  const optionList: string[] | undefined = answeroptions;
  const [wrongDateStatus, setWrongDateStatus] = useState('riktigDato');
  const [errorMsg, setErrorMsg] = useState('');
  const [dateList, setDateList] = useState<string[][]>([]);
  // ^ A list containing the dates inputed. Is on the format
  // [[yyyy-mm-dd, yyyy-mm-dd], [...], ...] where the first element
  // in an inner list is typically a start date, and the last is an end date,
  // but there can be more elements as well. The end date is often optional.

  // Check that the first date is not after the second date
  const checkDate = () => {
    dateList.forEach((innerList) => {
      if (innerList.length === 2) {
        let firstDate = new Date(innerList[0]);
        let secondDate = new Date(innerList[1]);
        if (secondDate < firstDate) {
          setWrongDateStatus('ugyldigDato');
          setErrorMsg('Inntastet dato er ugyldig!');
        } else {
          setWrongDateStatus('riktigDato');
          setErrorMsg('');
        }
      }
    });
  };

  // Update answers with new date
  useEffect(() => {
    const copiedAnswers = new Map(answers);

    if (answeroptions && answeroptions.length > 0) {
      // if there are several date inputs (e.g. start, end etc in a group),
      // make one list for each input (because it should, for example, be possible
      // to add several start dates), and save it separatley in answers.
      for (let i = 0; i < answeroptions.length; i++) {
        let tempList: string[] = [];
        dateList.forEach((innerList) => {
          tempList.push(innerList[i]);
        });
        copiedAnswers.set(mainQuestion.linkId + '.' + (i + 1), JSON.stringify(tempList));
      }
    } else {
      copiedAnswers.set(mainQuestion.linkId, JSON.stringify(dateList));
    }
    setAnswers(copiedAnswers);
    checkDate();
  }, [dateList]);

  // When input is saved:
  // set the date to the correct answer.
  // It is only done if the date is empty, meaning that it should only
  // make changes to date if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    // TODO: Fix so that dateList is set correctly based on data from the server
    // This code is currently not working
  }, [saved]);
  return (
    <div className="componentItems">
      <div className="typo-element">
        <QuestionTextItem mainQuestion={mainQuestion} helptext={helptext} />
      </div>

      <div style={{ display: 'flex' }}>
        {optionList && optionList.length !== 0 ? (
          optionList.map((option: string, index: number) => {
            return (
              <div key={mainQuestion.linkId + index} style={{ display: 'block', margin: '10px' }}>
                <div className={wrongDateStatus}>
                  <DatepickerItem
                    index={index}
                    text={option}
                    dateList={dateList}
                    setDateList={setDateList}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <DatepickerItem index={0} text={''} dateList={dateList} setDateList={setDateList} />
        )}
      </div>
      <BodyShort style={{ color: '#ba3a26' }}>{errorMsg}</BodyShort>
    </div>
  );
};

export default DateItem;
