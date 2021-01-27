import {Application} from "express";
import testTest from './routes/test-test';
import config from "./routes/config";

export default (app: Application) => {
    config(app);
    testTest(app);
};
