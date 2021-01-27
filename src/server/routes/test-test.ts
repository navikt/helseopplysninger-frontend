import {Application} from "express";
import {TEST_TEST_API} from "../../paths-server.json";
import {TestTestInterface} from "types/test-test";

export default (app: Application) => {
    app.get(TEST_TEST_API, function (req, res) {
        const data: TestTestInterface = {
            "name": "Hello",
            "value": "World",
        }
        res.send(data)
    })
}
