import React from 'react';
import { ItemProps } from '../types/ItemProps';

import { TextField } from '@navikt/ds-react';
import {
  questionnaireResponseItemStringAnswer,
  questionnaireResponseItemToString,
} from '@navikt/fhir';

/**
 * Denne bør vel etterhvert bruke
 * @param questionnaireItem
 * @param responseItem
 * @param setResponseItem
 * @constructor
 */
const DateItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  return (
    <div className={'skjemaelement'}>
      <TextField
        label={questionnaireItem.text}
        value={questionnaireResponseItemToString(responseItem)}
        onChange={(value) =>
          setResponseItem(questionnaireResponseItemStringAnswer(responseItem, value.target.value))
        }
      />
    </div>
  );
};

export default DateItem;
