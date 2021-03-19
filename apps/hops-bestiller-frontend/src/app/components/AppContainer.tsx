import React from 'react';
import "./AppContainer.less";

export const AppContainer = (props) => {
    return (
        <div className={"app-container"}>
            {props.children}
        </div>
    );
}
