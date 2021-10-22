import { generatePath, match } from 'react-router-dom';
import * as H from 'history';

export class Goto {
  history: H.History<H.LocationState>;
  routeMatch: match;

  constructor(history, routeMatch) {
    this.history = history;
    this.routeMatch = routeMatch;
  }

  generateViewPath(view, eventId?) {
    const { params, path } = this.routeMatch;

    const copiedParams = {
      eventId: undefined,
      ...params,
      view,
    };
    if (eventId) {
      copiedParams.eventId = eventId;
    }
    const parts = [generatePath(path, copiedParams)];

    // @ts-ignore
    if (eventId && !params.eventId) {
      parts.push(eventId);
    }
    return parts.join('/');
  }

  viewPath(view, eventId?) {
    const viewPath = this.generateViewPath(view, eventId);
    const { pathname } = this.history.location;
    return () => {
      if (pathname !== viewPath) {
        this.history.push(viewPath);
      }
    };
  }
}

function findRelative(arrayOfObjects: any[], currentID: string, relative: number, idKey?: string) {
  const key = idKey ? idKey : 'id';
  const index = arrayOfObjects.findIndex((e) => e[key] === currentID);
  if (index !== -1 && arrayOfObjects[index + relative]) {
    return arrayOfObjects[index + relative][key];
  } else {
    return undefined;
  }
}

export function nextId(arrayOfObjects: any[], currentID: string, idKey?: string) {
  return findRelative(arrayOfObjects, currentID, +1, idKey);
}

export function prevId(arrayOfObjects: any[], currentID: string, idKey?: string) {
  return findRelative(arrayOfObjects, currentID, -1, idKey);
}
