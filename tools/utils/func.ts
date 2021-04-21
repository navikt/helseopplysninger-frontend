import {resolve} from "path";
import {config} from "dotenv";

export function loadEnv() {
    ['.local.env', ".env"].forEach(file => {
        config({path: resolve(process.cwd(), file)});
    })
}
