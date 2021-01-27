import {Application} from "express";
import {BESTILLINGER} from "../../paths-server.json";
import {BestillingInterface} from "types/test-test";

export default (app: Application) => {
    app.get(BESTILLINGER, (req, res) => {
        const data: BestillingInterface = {
            "name": "Hello",
            "value": "World",
        }
        res.send(data);
    })
}

/*

request interface
response interface

/api/questionnaire
/api/questionnaire-response
 */
