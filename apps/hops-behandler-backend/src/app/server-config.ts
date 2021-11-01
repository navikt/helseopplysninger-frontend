import { Express } from 'express';
import * as bodyParser from 'body-parser';

export async function serverConfig(app: Express): Promise<void> {
  app.use(bodyParser.urlencoded({ extended: true }));
}
