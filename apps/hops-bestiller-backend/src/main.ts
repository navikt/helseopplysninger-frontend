/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import defaults from "./app/defaults";
import internals from "./app/internals";
import {initPassport} from "./config/init-passport"
import initSession from "./config/init-session";
import {server} from "./config.js";
import logger from "./utils/logger";
import dbPool from "./database/connection";
import runMigrations from "./database/run-migration";
import path from "path";


async function bootstrap() {
    const result = await dbPool.query('SELECT NOW() as message');
    console.log(result.rows);
    const app = express();
    initSession(app);
    await initPassport(app);
    [
        defaults,
        internals
    ].forEach(f => f(app))

    const {port, ingress} = server;
    app.listen(port, async () => {
        logger.info(`Listening at ${ingress}/api`);
        await runMigrations(path.join(__dirname,"migrations/user"));
    }).on('error', console.error);
}

bootstrap().then(() => {
    logger.info("bootstrapp complete");
})
