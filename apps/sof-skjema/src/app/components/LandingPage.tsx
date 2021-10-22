import { Link } from 'react-router-dom';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import QuestionnaireLinks from './QuestionnaireLinks';
import { Heading } from '@navikt/ds-react';

/**
 * @returns a page with links to all questionnaires to choose from
 */

export const LandingPage = () => {
  const skjemaer = [
    {
      link: '/skjema/pleiepengeskjema',
      title: 'Legeerklæring: pleiepenger for sykt barn',
      status: true,
    },
    {
      link: '/skjema/arbeidsuførerklæring',
      title: 'Legeerklæring ved arbeidsuførhet',
      status: false,
    },
  ];
  return (
    <div className="app-container">
      <Heading size={'large'}>Skjemaer</Heading>
      <div className="listOfLinks">
        {skjemaer.map((skjema) => (
          <Link className="questionLink" to={skjema.link}>
            <QuestionnaireLinks title={skjema.title} status={skjema.status} />
          </Link>
        ))}
      </div>
    </div>
  );
};
