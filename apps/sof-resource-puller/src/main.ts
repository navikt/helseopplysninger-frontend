import * as express from 'express';
import pullResourceRoute from "./app/routes/pull-resource-route";
import welcomeRoute from "./app/routes/welcome-route";


const app = express();

app.use(express.json())
pullResourceRoute(app);
welcomeRoute(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
