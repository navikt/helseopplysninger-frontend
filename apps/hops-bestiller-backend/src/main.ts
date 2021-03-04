/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import helloWorld from "./app/hello-world";
import internals from "./app/internals";
import {initPassport} from "./config/init-passport"
import initSession from "./config/init-session";
import {server} from "./config.js";
import logger from "./utils/logger";

async function bootstrap() {
    const app = express();
    initSession(app);
    await initPassport(app);
    [
        helloWorld,
        internals
    ].forEach(f => f(app))

    const {port,ingress} = server;
    app.listen(port, () => {
        logger.info(`Listening at ${ingress}/api`);
    }).on('error', console.error);
}

bootstrap().then(() => {
    logger.info("bootstrapp complete");
})
