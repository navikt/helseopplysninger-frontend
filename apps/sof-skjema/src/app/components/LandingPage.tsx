import { Link } from 'react-router-dom';
import { Sidetittel } from 'nav-frontend-typografi';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import QuestionnaireLinks from './QuestionnaireLinks';

/**
 * @returns a page with links to all questionnaires to choose from
 */

export const LandingPage = () => {
  return (
    <div className="app-container">
      <Sidetittel style={{ marginBottom: '50px' }}>Skjemaer</Sidetittel>
      <div className="listOfLinks">
        <Link className="questionLink" to="/skjema/pleiepengeskjema">
          <QuestionnaireLinks
            title={'Legeerklæring: pleiepenger for sykt barn'}
            status={true}
          ></QuestionnaireLinks>
        </Link>
        <Link className="questionLink" to="/skjema/arbeidsuførerklæring">
          <QuestionnaireLinks
            title={'Legeerklæring ved arbeidsuførhet'}
            status={false}
          ></QuestionnaireLinks>
        </Link>
      </div>
    </div>
  );
};
