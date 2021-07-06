import {Express} from "express";


function welcomeRoute(app: Express) {

    app.get('/api', (req, res) => {
        res.send({message: 'Welcome to sof-resource-puller!'});
    });

}

export default welcomeRoute;
