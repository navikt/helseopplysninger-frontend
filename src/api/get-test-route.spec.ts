import mockAxios from 'jest-mock-axios';
import getTestRoute from "./get-test-route";
import {TEST_TEST_API} from "../paths-server.json";

afterEach(() => mockAxios.reset());

test('should test test route', async () => {
    const promise = getTestRoute()
    expect(mockAxios.get).toHaveBeenCalledWith(TEST_TEST_API)
    mockAxios.mockResponse({data: "xyz"});
    const result = await promise;
    expect(result).toEqual("xyz")
});
