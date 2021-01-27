import React from "react";

interface Props {
    error?: Error;
}

const AppError: React.FunctionComponent<Props> = ({error}) => {
    return (<div>Error: {error && error.message}</div>);
}

export default AppError;
