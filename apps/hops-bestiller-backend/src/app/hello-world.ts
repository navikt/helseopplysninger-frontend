import {Express} from "express";


function helloWorld(app: Express): void {
    app.get('/api', (req, res) => {
        res.send({
            message: 'Welcome to hops-bestiller-backend!',
            just: "doing a small update",
            AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID
        });
    });
}


export default helloWorld;
