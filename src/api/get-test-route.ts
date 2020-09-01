import axios from "axios";
import {TEST_ROUTE} from "paths.json";
import {TestTestInterface} from "../types/test-test";

export default async (): Promise<TestTestInterface> => {
    const result = await axios.get(TEST_ROUTE);
    return result.data;
}
