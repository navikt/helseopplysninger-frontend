import React, { ChangeEvent, useState } from 'react';
import './OrderPatientInfo.less';
import { sendBestilling } from '../../commands/send-bestilling';
import { useAppContext } from '../../contexts/AppContext';
import { Button, Checkbox, CheckboxGroup, Select } from '@navikt/ds-react';

interface Props {
  patientId: string;
}

const OrderPatientInfo: React.FunctionComponent<Props> = ({ patientId }) => {
  const { items, goto } = useAppContext();
  const [skjema, setSkjema] = useState({
    purpose: 'hello world',
    items: [],
  });
  const onSubmit = async () => {
    console.log({ sender: skjema });
    await sendBestilling(patientId, skjema);
  };

  const onCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const skjemaItems = [...skjema.items];
    const { checked, name } = e.target;
    if (checked) {
      skjemaItems.push(name);
    } else {
      const index = skjemaItems.indexOf(name);
      if (index > -1) {
        skjemaItems.splice(index, 1);
      }
    }
    setSkjema((prevState) => ({
      ...prevState,
      items: skjemaItems,
    }));
  };

  return (
    <div className={'order-patient-info'}>
      <h2>Bestill helseopplysninger</h2>
      <Select
        htmlSize={150}
        value={skjema.purpose}
        label={'Hva skal opplysningene brukes til?'}
        onChange={(e) => {
          setSkjema((prevState) => ({
            ...prevState,
            purpose: e.target.value,
          }));
        }}
      >
        <option value={'vedtak-11-5'}>Vedtak $ 11-5</option>
        <option value={'legeerklaering'}>Legeerklæring</option>
        <option value={'attforingsattest'}>Attføringsattest</option>
      </Select>
      <br />
      <CheckboxGroup legend="Hvilke opplysninger skal etterspørres?">
        {items.map((item) => (
          <Checkbox key={'item-' + item.linkId} name={item.linkId} onChange={onCheckbox}>
            {item.text}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Select htmlSize={150} label={'Ytterligere spesifisering til legen'}>
        <option>Velg</option>
      </Select>
      <br />

      <Button variant={'primary'} className={'knapp-order-patient-info'} onClick={onSubmit}>
        Send melding
      </Button>
      <Button variant={'secondary'} onClick={goto.viewPath('table')}>
        Avbryt
      </Button>
    </div>
  );
};

export default OrderPatientInfo;
