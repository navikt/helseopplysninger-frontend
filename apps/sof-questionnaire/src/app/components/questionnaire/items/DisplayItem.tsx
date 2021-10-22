import React from 'react';
import { ItemProps } from '../types/ItemProps';
import { BodyShort } from '@navikt/ds-react';

const DisplayItem: React.FunctionComponent<ItemProps> = ({
  questionnaireItem,
  responseItem,
  setResponseItem,
}) => {
  return <BodyShort>{questionnaireItem.text}</BodyShort>;
};

export default DisplayItem;
