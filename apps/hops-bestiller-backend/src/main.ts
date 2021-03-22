/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import defaults from "./routes/defaults";
import internals from "./routes/internals";
import {initPassport} from "./config/init-passport"
import initSession from "./config/init-session";
import {database, server} from "./config.js";
import logger from "./utils/logger";
import dbPool from "./database/connection";
import runMigrations from "./database/run-migration";
import path from "path";
import patient from "./routes/patient";
import {Server} from "http";
import waitOn from "wait-on";


process.on('unhandledRejection', (reason:Error) => {
    logger.error(reason.message);
});

async function bootstrap(): Promise<Server> {
    logger.info("Bootstrap initiated");
    await waitOn({
        resources: [
            "tcp:" + database.host + ":" + database.port
        ],
        timeout: 60000,
    })
    const result = await dbPool.query('SELECT NOW() as message');
    logger.info("Bootstrap, database connected NOW(): " + result.rows[0].message);
    const app = express();
    initSession(app);
    await initPassport(app);
    [
        defaults,
        internals,
        patient
    ].forEach(f => f(app))

    const {port, ingress} = server;
    const httpServer = app.listen(port, async () => {
        logger.info(`Bootstrap, server listening at ${ingress}/api`);
        await runMigrations(path.join(__dirname, "migrations/user"));
    })
    return httpServer;
}

bootstrap().then(() => {
    logger.info("Bootstrap successful");
}).catch((error: Error) => {
    logger.error("Bootstrap failed, " + error.name + ": " + error.message);
    process.exit(1);
})

