import {generatePath, useHistory, useRouteMatch} from "react-router-dom";


export function generateViewPath(view, eventId?) {
    const location = useRouteMatch();
    const copiedParams = {
        eventId: undefined,
        ...location.params,
        view,
    };
    if (eventId) {
        copiedParams.eventId = eventId;
    }
    const parts = [generatePath(location.path, copiedParams)];
    // @ts-ignore
    if (eventId && !location.params.eventId) {
        parts.push(eventId)
    }
    return parts.join("/");
}

export function goToViewPath(view, eventId?) {
    const history = useHistory();
    const viewPath = generateViewPath(view, eventId);
    return () => {
        if(history.location.pathname !== viewPath){
            history.push(viewPath);
        }
    }
}

function findRelative(arrayOfObjects: any[], currentID: string, relative: number, idKey?: string) {
    const key = idKey ? idKey : "id";
    const index = arrayOfObjects.findIndex(e => e[key] === currentID);
    if (index !== -1 && arrayOfObjects[index + relative]) {
        return arrayOfObjects[index + relative][key];
    } else {
        return undefined;
    }
}

export function nextId(arrayOfObjects: any[], currentID: string, idKey?: string) {
    return findRelative(arrayOfObjects, currentID, +1, idKey)
}

export function prevId(arrayOfObjects: any[], currentID: string, idKey?: string) {
    return findRelative(arrayOfObjects, currentID, -1, idKey)
}
