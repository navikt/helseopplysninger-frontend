import React from "react";

interface Props {
    data: any
}

const PrettyPrint: React.FunctionComponent<Props> = ({data}) => {
    return <pre style={{fontSize: 10}}>
                {JSON.stringify(data, null, 2)}
            </pre>
}

export default PrettyPrint;
