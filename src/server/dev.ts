import {Application} from "express";
import testTest from './routes/test-test';
import oppplysning from './routes/opplysning';
import bestillinger from './routes/bestillinger';
import questionnaireResponse from "./routes/questionnaire-response";
import {isomorphic} from "../utils/isomorphic";
import config from "./routes/config";

export default (app: Application) => {
    console.log(isomorphic("from server"));
    config(app);
    testTest(app);
    bestillinger(app);
    oppplysning(app);
    questionnaireResponse(app);
};
