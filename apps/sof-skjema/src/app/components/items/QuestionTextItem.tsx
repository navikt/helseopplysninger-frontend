import { Popover } from '@navikt/ds-react';
import { useState } from 'react';
import { Information } from '@navikt/ds-icons';

/**
 * Component to show the question.
 * @returns The text of the question and possibly a help text.
 */
export const QuestionTextItem = (props: IQuestionTextItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {props.mainQuestion.required
        ? props.mainQuestion.text
        : props.mainQuestion.text + ' (frivillig)'}
      {props.helptext !== '' ? (
        <div>dfd</div>
      ) : (
        /*
        <Popover
          // @ts-ignore
          anchorEl={<div>{Information}</div>}
          style={{ marginLeft: '0.5rem' }}
          open={open}
          onClose={() => setOpen(false)}
        >
          {props.helptext}
        </Popover>

         */
        <></>
      )}
    </div>
  );
};
