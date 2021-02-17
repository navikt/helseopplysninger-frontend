/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import helloWorld from "./app/hello-world";
import internals from "./app/internals";


const app = express();
[
    helloWorld,
    internals
].forEach(f => f(app))

const port = process.env.PORT || 2022;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
