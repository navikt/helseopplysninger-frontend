import React from "react";

interface Props {
    header: string;
}

const HorisontalTr: React.FunctionComponent<Props> = ({header, children}) => {

    return <tr>
        <th scope="row">{header}</th>
        <td>
            {children}
        </td>
    </tr>
}

export default HorisontalTr;
