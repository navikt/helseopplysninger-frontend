export const wsClient = (location: Location, onMessage: (message: MessageEvent) => void): WebSocket => {
    const wsProtocol = location.protocol === "http:" ? "ws" : "wss";
    const client = new WebSocket(wsProtocol + '://' + location.host + '/ws');
    //const client = new WebSocket('ws://localhost:2022/ws');
    client.onopen = () => {
        // Causes the server to print "Hello"
        client.send('Hello');
    };
    client.onmessage = (message) => {
        console.log("Mottok beskjed fra backend", message.data);
        onMessage(message);
    };
    return client;
}
