import {Client} from "pg";
import {CONNECTION_STRING} from "../utils/envvars";

let client: Client;
let connected:boolean = false;
export default async () => {
    if (!client || !connected) {
        client = new Client({
            connectionString: CONNECTION_STRING,
        })
        client.on('end', () => {
            connected = false;
        });
        client.on("error", () => {
            connected = false;
        });
        await client.connect();
        connected = true;
    }
    return client;
}
