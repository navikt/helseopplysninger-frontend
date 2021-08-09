import { Request } from 'express';

export function fullUrl(req: Request, path) {
  return req.protocol + '://' + req.get('host') + path;
}
