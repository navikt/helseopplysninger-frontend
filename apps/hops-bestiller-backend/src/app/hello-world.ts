import {Express} from "express";
import getUserFromToken from "../auth/get-user-from-token";
import {JWT} from "jose";


function helloWorld(app: Express): void {
    app.get('/api', (req:any, res) => {
        res.send({
            message: 'Welcome to hops-bestiller-backend!',
            just: "doing a small update",
            auth: req.isAuthenticated(),
            AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
            login: process.env.APP_INGRESS + "/login",
            user: req.user || null,
            token:  req.user && JWT.decode(req.user.token.access_token)
        });
    });
    app.get('/api/user', (req:any, res) => {
        res.send(getUserFromToken(req.user.token.access_token));
    });
}


export default helloWorld;
