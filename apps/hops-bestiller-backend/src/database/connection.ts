import { Pool } from 'pg';
import {database} from "../config.js"

const dbPool = new Pool(database)


export default dbPool;
