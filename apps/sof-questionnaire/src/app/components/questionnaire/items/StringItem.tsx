import React, { ChangeEvent } from 'react';
import { ItemProps } from '../types/ItemProps';
import { TextField } from '@navikt/ds-react';
import {
  questionnaireResponseItemStringAnswer,
  questionnaireResponseItemToString,
} from '@navikt/fhir';

const StringItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  const { text } = questionnaireItem;
  const value = questionnaireResponseItemToString(responseItem);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = questionnaireResponseItemStringAnswer(responseItem, e.target.value);
    setResponseItem(item);
  };
  return <TextField value={value} label={text} onChange={onChange} />;
};

export default StringItem;
