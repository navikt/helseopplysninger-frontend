import React from 'react';
import { ItemProps } from '../types/ItemProps';
import StringItem from './StringItem';

const IntegerItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  return (
    <StringItem
      questionnaireItem={questionnaireItem}
      responseItem={responseItem}
      setResponseItem={setResponseItem}
    />
  );
};

export default IntegerItem;
