import React, { FC, useState } from 'react';
import { ItemProps } from './types/ItemProps';
import { Questionnaire_ItemTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4';
import StringItem from './items/StringItem';
import BooleanItem from './items/BooleanItem';
import ChoiceItem from './items/ChoiceItem';
import DatetimeItem from './items/DatetimeItem';
import DateItem from './items/DateItem';
import DecimalItem from './items/DecimalItem';
import DisplayItem from './items/DisplayItem';
import GroupItem from './items/GroupItem';
import IntegerItem from './items/IntegerItem';
import OpenChoiceItem from './items/OpenChoiceItem';
import TextItem from './items/TextItem';
import TimeItem from './items/TimeItem';
import UrlItem from './items/UrlItem';
import ItemContainer from './ItemContainer';
import { Information } from '@navikt/ds-icons';
import { Popover } from '@navikt/ds-react';

const ItemMapper: FC<ItemProps> = ({ questionnaireItem, responseItem, setResponseItem }) => {
  const [anker, setAnker] = useState<HTMLElement | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const type = questionnaireItem.type || Questionnaire_ItemTypeKind._string;
  const itemProps = {
    questionnaireItem,
    responseItem,
    setResponseItem,
  };

  const debugInfo = {
    id: responseItem.id,
    type: questionnaireItem.type,
    linkId: questionnaireItem.linkId,
  };
  return (
    <ItemContainer key={responseItem.id}>
      <Information
        style={{ float: 'right', position: 'relative', zIndex: 1 }}
        onClick={(e: any) => setAnker(anker ? undefined : e.currentTarget)}
      />
      <Popover anchorEl={anker} placement={'bottom-end'} open={open} onClose={() => setOpen(false)}>
        <pre style={{ fontSize: 10 }}>{JSON.stringify(debugInfo, null, 2)}</pre>
      </Popover>
      {
        {
          [Questionnaire_ItemTypeKind._attachment]: <StringItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._boolean]: <BooleanItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._choice]: <ChoiceItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._dateTime]: <DatetimeItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._date]: <DateItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._decimal]: <DecimalItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._display]: <DisplayItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._group]: <GroupItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._integer]: <IntegerItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._openChoice]: <OpenChoiceItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._quantity]: <IntegerItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._reference]: <StringItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._string]: <StringItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._text]: <TextItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._time]: <TimeItem {...itemProps} />,
          [Questionnaire_ItemTypeKind._url]: <UrlItem {...itemProps} />,
        }[type]
      }
    </ItemContainer>
  );
};

export default ItemMapper;
