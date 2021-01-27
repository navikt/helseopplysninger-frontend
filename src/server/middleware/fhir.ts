import {Application} from "express";
import fhirClient from "fhirclient";
import session from "express-session";
import {INDEX} from "../../paths-client.json"

export default (app: Application) => {
    app.use(session({
        secret: "something vise"
    }))
    app.use(async (req, res, next) => {
        const {launch, iss, code} = req.query
        if (launch && iss || code) {
            await fhirClient(req, res).init({
                client_id: "my_web_app",
                scope: "patient/*.read",
                redirectUri: INDEX,
                target:"_blank",
            })
            console.log('Params:', req.query)
        }
        next()
    })
}
