import React from 'react';
import { ItemProps } from '../types/ItemProps';

import { Select } from '@navikt/ds-react';
import { questionnaireAnswerOptionDisplayValue } from '@navikt/fhir';

/**
 * Question with a Coding drawn from a list of possible answers (specified in either the answerOption
 * property, or via the valueset referenced in the answerValueSet property) as an answer (valueCoding).
 *
 * Forløpig kun støtte for `valueString`, tenker at håndteringen av andre dataformater
 * kan løses her om det skulle blir behov for det.
 *
 * @param questionnaireItem
 * @param responseItem
 * @param setResponseItem
 * @constructor
 */
const ChoiceItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  const answerOption = questionnaireItem.answerOption || [];
  return (
    <Select
      label={questionnaireItem.text}
      onChange={(e) => {
        responseItem.answer = JSON.parse(e.target.value);
        setResponseItem(responseItem);
      }}
      defaultValue={JSON.stringify([responseItem])}
    >
      {answerOption.map((option, index) => (
        <option key={'har-arbeidsgiver-valg-' + index} value={JSON.stringify([option])}>
          {questionnaireAnswerOptionDisplayValue(option)}
        </option>
      ))}
    </Select>
  );
};

export default ChoiceItem;
