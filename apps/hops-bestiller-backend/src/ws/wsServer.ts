import {Server} from "http";
import ws from "ws";
import logger from "../utils/logger";

export const wsServer = (server: Server) => {
    const wsServer = new ws.Server({noServer: true});
    wsServer.on('connection', socket => {
        socket.on('message', message => {
            logger.info("Websocket received message: " + message);
        });
    });

    // `server` is a vanilla Node.js HTTP server, so use
    // the same ws upgrade process described here:
    // https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
    server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
            wsServer.emit('connection', socket, request);
        });
    });
}
