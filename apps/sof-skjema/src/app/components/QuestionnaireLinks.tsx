import { Cell, ContentContainer, Grid } from '@navikt/ds-react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { EtikettFokus, EtikettInfo } from 'nav-frontend-etiketter';

interface IQuestionnaireLinksProps {
  title: string;
  status: boolean;
}

/**
 * @returns A row to click on that leads to a questionnaire
 */
const QuestionnaireLinks = (props: IQuestionnaireLinksProps) => {
  function statusChecker() {
    if (props.status) {
      return <EtikettInfo className="etiketter">Ikke startet</EtikettInfo>;
    } else {
      return <EtikettFokus className="etiketter">Utkast</EtikettFokus>;
    }
  }

  return (
    <div className="questionnaireLinkContainer">
      <ContentContainer className="ContentContainer">
        <Grid>
          <Cell className={'navds-story-cell tittelcelle'} xs={7}>
            {props.title}
          </Cell>
          <Cell className={'navds-story-cell statuscelle'} xs={4}>
            Status:
            {statusChecker()}
          </Cell>
          <Cell className={'navds-story-cell chevroncelle'} xs={1}>
            <HoyreChevron></HoyreChevron>
          </Cell>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default QuestionnaireLinks;
