import React from 'react';
import { ItemProps } from '../types/ItemProps';

import { Checkbox } from '@navikt/ds-react';
import { questionnaireResponseItemToBoolean } from '@navikt/fhir';

/**
 * Question with a yes/no answer (valueBoolean).
 *
 * @param questionnaireItem
 * @param responseItem
 * @param setResponseItem
 * @constructor
 */
const BooleanItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  const checked = questionnaireResponseItemToBoolean(responseItem);
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => {
        responseItem.answer = [{ valueBoolean: !checked }];
        setResponseItem(responseItem);
      }}
    >
      {questionnaireItem.text}
    </Checkbox>
  );
};

export default BooleanItem;
