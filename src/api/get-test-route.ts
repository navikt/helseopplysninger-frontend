import axios from "axios";
import {TEST_TEST_API} from "../paths-server.json";
import {TestTestInterface} from "../types/test-test";

export default async (): Promise<TestTestInterface> => {
    const result = await axios.get(TEST_TEST_API);
    return result.data;
}
