import {Application} from "express";
// @ts-ignore
import {QUESTIONNAIRE_RESPONSE} from "../../paths-server.json";
import {BestillingInterface} from "types/test-test";

export default (app: Application) => {
    app.get(QUESTIONNAIRE_RESPONSE, (req, res) => {
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
