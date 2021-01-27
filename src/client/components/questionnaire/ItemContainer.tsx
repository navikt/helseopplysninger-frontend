import React from "react";
import './ItemContainer.less';

const ItemContainer: React.FunctionComponent<any> = props => {
    return (<div className={"item-container"}>
        {props.children}
    </div>);
}

export default ItemContainer;
