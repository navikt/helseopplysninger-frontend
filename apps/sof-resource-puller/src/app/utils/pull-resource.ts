import {IResourceList} from "@ahryman40k/ts-fhir-types/lib/R4";
import axios from "axios";

async function pullResource(
    fhirServerUrl: URL,
    resource: string,
    token: string
): Promise<IResourceList> {
    const result = await axios.request({
        url: [fhirServerUrl.toString(), resource].join("/"),
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    return result.data as IResourceList
}

export default pullResource
