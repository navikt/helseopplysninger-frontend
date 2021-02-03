import {Express} from "express";


function helloWorld(app: Express): void {
    app.get('/api', (req, res) => {
        res.send({message: 'Welcome to hops-bestiller-backend!'});
    });
}


export default helloWorld;
