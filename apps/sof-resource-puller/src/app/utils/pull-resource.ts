import { IResourceList } from '@ahryman40k/ts-fhir-types/lib/R4';
import axios from 'axios';

async function pullResource(
  serverUrl: URL,
  resource: string,
  authHeader: string
): Promise<IResourceList> {
  const result = await axios.request({
    url: [serverUrl.toString(), resource].join('/'),
    method: 'get',
    headers: {
      Authorization: authHeader,
    },
  });
  return result.data as IResourceList;
}

export default pullResource;
