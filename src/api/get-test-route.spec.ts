import mockAxios from 'jest-mock-axios';
import getTestRoute from "./get-test-route";
import {TEST_ROUTE} from "paths.json";

afterEach(() => mockAxios.reset());

test('should test test route', async () => {
    const promise = getTestRoute()
    expect(mockAxios.get).toHaveBeenCalledWith(TEST_ROUTE)
    mockAxios.mockResponse({data: "xyz"});
    const result = await promise;
    expect(result).toEqual("xyz")
});
