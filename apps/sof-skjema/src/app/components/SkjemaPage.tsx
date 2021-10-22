import { Questionnaire } from './Questionnaire';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { InputErrorContextProvider } from '../context/inputErrorContext';
import { InfoIcon } from '../../assets/logos/InfoIcon';
import { BodyLong } from '@navikt/ds-react';
import { useQuestionnaireResponseContext } from '@navikt/sof-components';

/**
 * @returns A page with the questionnaire and description.
 */
export const SkjemaPage = () => {
  const { questionnaire, questionnaireResponse } = useQuestionnaireResponseContext();

  return (
    <InputErrorContextProvider>
      <div className="app-container">
        {questionnaire && questionnaireResponse ? (
          <Veilederpanel
            fargetema="info"
            type={'plakat'}
            kompakt
            svg={
              <div className="informationIcon">
                <InfoIcon />
              </div>
            }
          >
            <BodyLong>{questionnaire?.description}</BodyLong>
            <BodyLong>
              <br />
              Vi spør stort sett bare om informasjon som er nødvendig for å behandle saken. Det vil
              si alle felter er i utgangspunkt påkrevde og må fylles ut. Frivillige felt er markert
              med "frivillig".
            </BodyLong>
          </Veilederpanel>
        ) : (
          <>Loading</>
        )}
        <Questionnaire
          questionnaire={questionnaire}
          questionnaireResponse={questionnaireResponse}
        />
      </div>
    </InputErrorContextProvider>
  );
};

export default SkjemaPage;
