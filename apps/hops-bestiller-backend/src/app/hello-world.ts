import {Express} from "express";


function helloWorld(app: Express): void {
    app.get('/api', (req:any, res) => {
        res.send({
            message: 'Welcome to hops-bestiller-backend!',
            just: "doing a small update",
            AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
            login: process.env.APP_INGRESS + "/login",
            user: req.user || null,
        });
    });
}


export default helloWorld;
