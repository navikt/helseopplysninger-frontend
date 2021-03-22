import {Pool} from 'pg';
import {database} from "../config.js"
import logger from "../utils/logger";

const dbPool = new Pool(database)

dbPool.on('connect', () => {
    dbPool.on('error', (error) => {
        logger.error("(pg)" + error.name + ": " + error.message);
    })
});
process.on("exit", async (code) => {
    await dbPool.end()
    logger.error("(pg) gracefully shutdown after exit("+code+")");
})
process.on('SIGTERM', async () => {
    await dbPool.end();
    logger.error("(pg) gracefully shutdown after SIGTERM");
});
export default dbPool;
