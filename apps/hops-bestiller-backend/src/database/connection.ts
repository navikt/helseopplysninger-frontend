import {Pool} from 'pg';
import {database} from "../config"
import logger from "../utils/logger";

const dbPool = new Pool(database)

dbPool.on('connect', () => {
    dbPool.on('error', (error) => {
        logger.error("(pg)" + error.name + ": " + error.message);
    })
});
process.on("exit", async (code) => {
    logger.error("(pg) gracefully shutdown after exit("+code+")");
    //await dbPool.end()

})
process.on('SIGTERM', async () => {
    logger.error("(pg) gracefully shutdown after SIGTERM");
    //await dbPool.end();
});
export default dbPool;
