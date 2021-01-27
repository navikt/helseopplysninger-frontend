import axios from "axios";
import {resolveUrlTemplate} from "./resolve-url-template";

export async function fetchData(
    path: string,
    params?: { [key: string]: string; }
): Promise<any> {
    const url = params ? resolveUrlTemplate(path, params) : path;
    const result = await axios.get(url);
    return result.data;
}

export async function postData(
    path: string,
    params: { [key: string]: string; } | undefined,
    data: any
): Promise<any> {
    const url = params ? resolveUrlTemplate(path, params) : path;
    const result = await axios.post(url, data);
    return result.data;
}
