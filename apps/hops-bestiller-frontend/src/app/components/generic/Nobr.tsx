import React from "react";

interface Props {

}

const Nobr: React.FunctionComponent<Props> = ({children}) => {
    return <span style={{whiteSpace: "nowrap"}}>
                {children}
            </span>
}

export default Nobr;
