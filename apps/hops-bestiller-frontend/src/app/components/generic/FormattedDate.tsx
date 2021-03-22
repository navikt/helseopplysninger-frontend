import React from "react";
import dayjs from "dayjs";

interface Props {
    date: string;
    format?: string;
}

const FormattedDate: React.FunctionComponent<Props> = ({date, format}) => {
    const template = format ? format : "DD.MM.YYYY";
    const formattedDate = dayjs(date).format(template);
    return <time dateTime={date}>
        {formattedDate}
    </time>
}

export default FormattedDate;
