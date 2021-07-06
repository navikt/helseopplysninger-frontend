import {IResourceList} from "@ahryman40k/ts-fhir-types/lib/R4";
import axios from "axios";

async function pullResource(resourceUrl: URL, token: string): Promise<IResourceList> {
    const result = await axios.request({
        url: resourceUrl.toString(),
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    return result.data as IResourceList
}

export default pullResource
