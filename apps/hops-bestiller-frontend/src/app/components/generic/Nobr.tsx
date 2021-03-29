import React from "react";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    children: any;
}


const Nobr: React.FunctionComponent<Props> = props => {
    return <span style={{whiteSpace: "nowrap"}} {...props}>
                {props.children}
            </span>
}

export default Nobr;
