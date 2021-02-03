import React from "react";

interface Props {
    error?: Error;
}

const AppError: React.FunctionComponent<Props> = ({error}) => {
    return (<pre>Error: {error}</pre>);
}

export default AppError;
