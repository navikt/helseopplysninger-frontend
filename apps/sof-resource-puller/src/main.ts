import * as express from 'express';
import pullResourceRoute from "./app/routes/pull-resource-route";
import indexRoute from "./app/routes/index-route";
import internalRoutes from "./app/routes/internals-route";


const app = express();

app.use(express.json())
pullResourceRoute(app);
indexRoute(app);
internalRoutes(app);
const port = process.env.SERVER_PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
