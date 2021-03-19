import React from "react";
import dayjs from "dayjs";

interface Props {
    periode: []
}

const Periode: React.FunctionComponent<Props> = ({periode}) => {
    const firstDate = Array.from(periode).sort().shift();
    const formattedDate = dayjs(firstDate).format("DD.MM.YYYY");
    return <time dateTime={firstDate}>
                {formattedDate}
            </time>
}

export default Periode;
