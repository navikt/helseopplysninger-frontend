import {Express} from "express";
import passport from "passport";
import createAzureClient from "../auth/create-azure-client";
import createStrategy from "../auth/strategy";
import bodyParser from "body-parser";
import {API_CALLBACK_PATH, API_LOGIN_PATH, API_PATH} from "../paths";

async function initPassport(app: Express): Promise<void> {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    const azureAuthClient = await createAzureClient();
    const strategyName = 'azureOidc'
    passport.use(strategyName, createStrategy(azureAuthClient));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.use((req, res, next) => {
        next();
    })

    app.get(API_LOGIN_PATH, (req, res, next) => {
        // @ts-ignore
        passport.authenticate(strategyName, {response: res})(req, res, next);
    }, (req, res) => {
        res.send({result: 'succeeded'});
    });

    app.get(API_CALLBACK_PATH, (req, res, next) => {
        // @ts-ignore
        passport.authenticate(strategyName, {response: res})(req, res, next);

    }, (req, res) => {
        res.redirect(API_PATH);
    });

}

export {initPassport}
