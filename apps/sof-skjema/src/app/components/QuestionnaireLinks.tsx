import { LinkPanel, Tag } from '@navikt/ds-react';
import { FC } from 'react';
import { LinkPanelTitle } from '@navikt/ds-react/esm/link-panel/LinkPanelTitle';

interface IQuestionnaireLinksProps {
  title: string;
  status: boolean;
}

const StatusChecker: FC<{ status: boolean }> = (status) => {
  const variant = status ? 'info' : 'warning';
  const text = status ? 'Ikke startet' : 'Utkast';
  return (
    <Tag variant={variant} className="etiketter">
      {text}
    </Tag>
  );
};

/**
 * @returns A row to click on that leads to a questionnaire
 */
const QuestionnaireLinks: FC<IQuestionnaireLinksProps> = ({ title, status }) => {
  return (
    <div className="questionnaireLinkContainer">
      <LinkPanel>
        <LinkPanelTitle>{title}</LinkPanelTitle>
        <br />
        Status: <StatusChecker status={status} />
      </LinkPanel>
    </div>
  );
};

export default QuestionnaireLinks;
