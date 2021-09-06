import { v4 as uuidv4 } from 'uuid';

export const setUUIDIdentifier = (resource: any) => {
  resource.identifier?.value === ''
    ? (resource.identifier.value = uuidv4())
    : null;
};
