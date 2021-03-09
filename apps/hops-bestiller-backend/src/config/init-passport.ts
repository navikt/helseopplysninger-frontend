import {Express} from "express";
import passport from "passport";
import createAzureClient from "../auth/create-azure-client";
import createStrategy from "../auth/strategy";
import bodyParser from "body-parser";

async function initPassport(app: Express): Promise<void> {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    const azureAuthClient = await createAzureClient();
    passport.use('azureOidc', createStrategy(azureAuthClient));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.use((req, res, next) => {
        next();
    })

    app.get('/login', (req, res, next) => {
        passport.authenticate('azureOidc', {response: res})(req, res, next);
    }, (req, res) => {
        res.send({result: 'succeeded'});
    });
    app.get('/oauth2/callback', (req, res, next) => {
        passport.authenticate('azureOidc', {response: res})(req, res, next);

    }, (req, res) => {
        res.redirect("/api");
    });

}

export {initPassport}
