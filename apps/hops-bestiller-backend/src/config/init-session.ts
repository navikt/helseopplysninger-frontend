const cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser")
const initSession = (app) => {
    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(cookieSession({
        name: 'session',
        secure: false,
        secret: "sdafasdfasd",
        maxAge: 86400000, // one day in milliseconds
    }))
};

export default initSession;
