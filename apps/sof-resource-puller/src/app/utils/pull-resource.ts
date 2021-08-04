import { IResourceList } from '@ahryman40k/ts-fhir-types/lib/R4';
import axios from 'axios';

async function pullResource(
  serverUrl: URL,
  resource: string,
  authHeader: string
): Promise<IResourceList> {
  const url = [serverUrl.toString(), resource].join('/');
  try {
    const result = await axios.request({
      url: url,
      method: 'get',
      headers: {
        Authorization: authHeader,
      },
    });
    return result.data as IResourceList;
  } catch (error) {
    error.message = 'Failed pulling ' + url + ' (' + error.message + ')';
    throw error;
  }
}

export default pullResource;
