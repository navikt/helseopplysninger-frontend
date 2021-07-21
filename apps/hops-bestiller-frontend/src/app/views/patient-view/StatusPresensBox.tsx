import { StatusPresens } from '@navikt/bestiller-types';
import React from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';
import './StatusPresensBox.less';
import FormattedDate from '../../components/generic/FormattedDate';
import HorisontalTr from '../../components/generic/HorisontalTr';

interface Props {
  statusPresens: StatusPresens;
}

const StatusPresensBox: React.FunctionComponent<Props> = ({
  statusPresens,
}) => {
  return (
    <div className={'status-presens-box'}>
      <div className={'status-presens-box-header'}>
        <h3>Status Presens</h3>
        {statusPresens && (
          <EtikettInfo>{statusPresens.status.navn}</EtikettInfo>
        )}
      </div>
      <table className={'status-presens-table'}>
        <tbody>
          {statusPresens &&
            statusPresens.diagnoser.map((diagnose, index) => (
              <HorisontalTr header={diagnose.type} key={'diagnose-' + index}>
                <div className={'diagnose'}>{diagnose.tekst}</div>
                <div className={'sist-endret'}>
                  Sist Endret <FormattedDate date={diagnose.endret} />
                </div>
              </HorisontalTr>
            ))}
          {statusPresens &&
            statusPresens.opplysninger.map((opp, index) => (
              <HorisontalTr header={opp.type} key={'opplysning-' + index}>
                <ul>
                  {opp.states[0].tekst.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className={'sist-endret'}>
                  Sist Endret <FormattedDate date={opp.states[0].endret} />
                </div>
              </HorisontalTr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusPresensBox;
