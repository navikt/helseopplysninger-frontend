import React from "react";
import {Bandage, DialogDots, FileContent, Information, Law} from "@navikt/ds-icons";
import {PatientEventIcon} from "@navikt/hops-types";

interface Props {
    type: PatientEventIcon;
}

const Icon: React.FunctionComponent<Props> = ({type}) => {
    const components = {
        Bandage,
        DialogDots,
        FileContent,
        Information,
        Law,
    }
    const TagName = components[type] ? components[type] : components["Information"];

    return <span style={{
        fontSize: "1rem",
        marginRight: "0.5rem",
        verticalAlign:"middle",
    }}>
        <TagName/>
    </span>
}

export default Icon;
