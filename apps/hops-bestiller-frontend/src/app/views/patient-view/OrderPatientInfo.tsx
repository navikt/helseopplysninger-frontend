import React, {ChangeEvent, useState} from "react";
import {Checkbox, CheckboxGruppe, Select} from "nav-frontend-skjema";
import "./OrderPatientInfo.less"
import {Flatknapp, Hovedknapp} from "nav-frontend-knapper";
import {sendBestilling} from "../../commands/send-bestilling";
import {useAppContext} from "../../contexts/AppContext";

interface Props {
    patientId: string;
}

const OrderPatientInfo: React.FunctionComponent<Props> = ({patientId}) => {
    const {items, goto} = useAppContext();
    const [skjema, setSkjema] = useState({
        purpose: "hello world",
        items: [],
    });
    const onSubmit = async () => {
        console.log({sender: skjema});
        await sendBestilling(patientId, skjema);
    }

    const onCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const skjemaItems = [...skjema.items];
        const {checked, name} = e.target;
        if (checked) {
            skjemaItems.push(name);
        } else {
            const index = skjemaItems.indexOf(name);
            if (index > -1) {
                skjemaItems.splice(index, 1);
            }
        }
        setSkjema(prevState => ({
            ...prevState,
            items: skjemaItems
        }))
    }

    return (
        <div className={"order-patient-info"}>
            <h2>Bestill helseopplysninger</h2>
            <Select
                bredde={"m"}
                value={skjema.purpose}
                label={"Hva skal opplysningene brukes til?"}
                onChange={(e) => {
                    setSkjema(prevState => ({
                        ...prevState,
                        purpose: e.target.value
                    }))
                }}
            >
                <option value={"vedtak-11-5"}>Vedtak $ 11-5</option>
                <option value={"legeerklaering"}>Legeerklæring</option>
                <option value={"attforingsattest"}>Attføringsattest</option>
            </Select>
            <br/>
            <CheckboxGruppe legend="Hvilke opplysninger skal etterspørres?">
                {items.map((item) =>
                    <Checkbox key={"item-" + item.linkId} name={item.linkId} onChange={onCheckbox} label={item.text}/>
                )}
            </CheckboxGruppe>
            <Select bredde={"m"} label={"Ytterligere spesifisering til legen"}>
                <option>Velg</option>
            </Select>
            <br/>
            <Hovedknapp className={"knapp-order-patient-info"} onClick={onSubmit}>Send melding</Hovedknapp>
            <Flatknapp onClick={goto.viewPath("table")}>Avbryt</Flatknapp>
        </div>
    );
}

export default OrderPatientInfo;
