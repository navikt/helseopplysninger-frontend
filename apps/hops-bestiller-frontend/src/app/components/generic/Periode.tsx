import React from "react";
import FormattedDate from "./FormattedDate";

interface Props {
    periode: []
}

const Periode: React.FunctionComponent<Props> = ({periode}) => {
    const firstDate = Array.from(periode).sort().shift();
    return <FormattedDate date={firstDate}/>
}

export default Periode;
