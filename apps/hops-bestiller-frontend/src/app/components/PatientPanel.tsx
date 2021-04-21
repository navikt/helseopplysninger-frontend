import React from 'react';
import "./PatientPanel.less"
import Panel from "nav-frontend-paneler";
import {VenstreChevron} from "nav-frontend-chevron";
import classNames from "classnames";
import {useAppContext} from "../contexts/AppContext";

export const PatientPanel = ({isForm, showBackArrow, children}) => {
    const {goto} = useAppContext()
    const className = classNames({
        "patient-panel": true,
        "patient-panel-blue": isForm,
        "show-back-arrow": showBackArrow,
        "hide-back-arrow": !showBackArrow,
    })
    return (
        <Panel className={className}>
            <div className={"patient-panel-left"} onClick={goto.viewPath(history, "table")}>
                <VenstreChevron></VenstreChevron>
            </div>
            <div className={"patient-panel-right"}>
                {children}
            </div>
        </Panel>
    );
}
