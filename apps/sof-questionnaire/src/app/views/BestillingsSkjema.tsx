import * as React from 'react';
import { useEffect, useState } from 'react';
import { IQuestionnaireResponse_Item } from '@ahryman40k/ts-fhir-types/lib/R4';
import QuestionnaireItems from '../components/QuestionnaireItems';
import Tabs from 'nav-frontend-tabs';

import PrettyPrint from '../components/PrettyPrint';

import { Button, Panel } from '@navikt/ds-react';
import { useQuestionnaireResponseContext } from '@navikt/sof-components';

function BestillingSkjema() {
  const [activeTab, setActiveTab] = useState(0);
  const { questionnaire, questionnaireResponse, saveQuestionnaireResponseItems } =
    useQuestionnaireResponseContext();
  const questionnaireItems = questionnaire?.item || [];
  const [responseItems, setResponseItems] = useState<IQuestionnaireResponse_Item[]>([]);
  useEffect(() => {
    setResponseItems(questionnaireResponse?.item || []);
  }, [questionnaireResponse]);
  return (
    <div className={'bestillingsskjema'}>
      <h2>QuestionnaireItems</h2>
      <Tabs
        tabs={[{ label: 'Skjema' }, { label: 'Questionnaire' }, { label: 'ResponseItems' }]}
        defaultAktiv={activeTab}
        onChange={(e, index) => setActiveTab(index)}
      />
      <Panel border className={'panel-tab'}>
        {
          [
            <QuestionnaireItems
              questionnaireItems={questionnaireItems}
              responseItems={responseItems}
              setResponseItems={setResponseItems}
            />,
            <PrettyPrint data={questionnaire} />,
            <PrettyPrint data={responseItems} />,
          ][activeTab]
        }
      </Panel>
      <Button
        variant={'primary'}
        onClick={async () => {
          if (saveQuestionnaireResponseItems) {
            await saveQuestionnaireResponseItems(responseItems);
          }
        }}
      >
        lagre
      </Button>
    </div>
  );
}

export default BestillingSkjema;
