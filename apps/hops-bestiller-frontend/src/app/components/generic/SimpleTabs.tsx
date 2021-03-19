import React, {ReactNodeArray, useState} from "react";
import Tabs from "nav-frontend-tabs";
import Panel from "nav-frontend-paneler";


interface Props {

}

const SimpleTabs: React.FunctionComponent<Props> = ({children}) => {
    const [activeTab, setActiveTab] = useState(0);
    const elements = children as ReactNodeArray
    const labels = elements.map((value, index) => {
        return {label: "thing " + index}
    })
    return (
        <div><Tabs
            tabs={labels}
            defaultAktiv={activeTab}
            onChange={(e, index) => setActiveTab(index)}/>
            <Panel border className={"panel-tab"}>
                {elements[activeTab]}
            </Panel>
        </div>
    )
}
export default SimpleTabs;
