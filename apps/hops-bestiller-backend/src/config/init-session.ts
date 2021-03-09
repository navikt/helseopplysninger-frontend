import session from "express-session"
import connectPgSimple from "connect-pg-simple"
import dbPool from "../database/connection"

const cookieParser = require("cookie-parser")
const pgSession = connectPgSimple(session)
const initSession = (app) => {
    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(session({
        store: new pgSession({
            pool: dbPool
        }),
        name: 'session',
        secure: false,
        resave: false,
        saveUninitialized: false,
        secret: "sdafasdfasd",
        cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
    }))
};

export default initSession;
