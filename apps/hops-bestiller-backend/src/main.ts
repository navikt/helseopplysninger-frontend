import * as express from 'express';
import defaults from "./routes/defaults";
import internals from "./routes/internals";
import {initPassport} from "./config/init-passport"
import initSession from "./config/init-session";
import {database, kafkaTopics, server} from "./config";
import logger from "./utils/logger";
import dbPool from "./database/connection";
import runMigrations from "./database/run-migration";
import path from "path";
import patient from "./routes/patient";
import {Server} from "http";
import waitOn from "wait-on";
import {kafkaConsumer} from "./kafka/kafka-consumer";
import {kafkaClient} from "./kafka/kafka-client";
import bestill from "./routes/bestill";

async function bootstrap(): Promise<Server> {
    logger.info("Bootstrap started");
    kafkaConsumer(
        kafkaClient,
        "bestiller",
        kafkaTopics.bestillinger,
        message => {
            console.log(message.value.toString());
        }).then(() => {
        logger.info("Bootstrap, kafka connected");
    });
    await waitOn({
        resources: [
            ["tcp", database.host, database.port].join(":")
        ],
        timeout: 30000, // total timeout før vi forventer at databasen skal være oppe
        delay: 3000, // venter 3 sekunder før vi prøver cloudsql
        interval: 1000, // spørr bare hvert sekund
    })
    const result = await dbPool.query('SELECT NOW() as message');
    logger.info("Bootstrap, db connected servertime: " + result.rows[0].message);
    const app = express();
    initSession(app);
    await initPassport(app);
    [
        bestill,
        defaults,
        internals,
        patient,
    ].forEach(f => f(app))

    const {port, ingress} = server;
    const httpServer = app.listen(port, async () => {
        await runMigrations(path.join(__dirname, "migrations/user"));
        logger.info(`Bootstrap, server listening at ${ingress}/api`);
    })
    return httpServer;
}

bootstrap().then(() => {
    logger.info("Bootstrap successful");
}).catch((error: Error) => {
    logger.error("Bootstrap failed, " + error.name + ": " + error.message);
    process.exit(1);
})

