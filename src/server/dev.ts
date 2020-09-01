import {Application} from "express";
import testTest from './routes/test-test';

export default (app: Application) => {
    testTest(app);
};
