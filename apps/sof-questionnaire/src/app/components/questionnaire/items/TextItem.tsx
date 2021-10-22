import React from 'react';
import { ItemProps } from '../types/ItemProps';
import { Textarea } from '@navikt/ds-react';
import {
  questionnaireResponseItemStringAnswer,
  questionnaireResponseItemToString,
} from '@navikt/fhir';

const TextItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  const value = questionnaireResponseItemToString(responseItem);
  return (
    <Textarea
      label={questionnaireItem.text}
      value={value}
      onChange={(e) =>
        setResponseItem(questionnaireResponseItemStringAnswer(responseItem, e.target.value))
      }
    />
  );
};

export default TextItem;
