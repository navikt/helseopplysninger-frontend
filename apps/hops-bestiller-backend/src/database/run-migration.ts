import {migrate} from "postgres-migrations"
import dbPool from "./connection";

async function runMigrations(migrationsDirectory: string) {
    const client = await dbPool.connect();
    await migrate({client}, migrationsDirectory)
}

export default runMigrations;
