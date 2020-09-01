import {Application} from "express";
import {TEST_ROUTE} from "../../paths.json";
import {TestTestInterface} from "types/test-test";

export default (app: Application) => {
    app.get(TEST_ROUTE, function (req, res) {
        const data: TestTestInterface = {
            "name": "Hello",
            "value": "World",
        }
        res.send(data)
    })
}
