import axios from 'axios';
import * as flatCache from 'flat-cache';
import { Cache } from 'flat-cache';
import { JWT } from 'jose';
import { IdTokenClaims, TokenSet } from 'openid-client';
import { IBundle, IBundle_Entry, IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import * as env from 'env-var';

const getConfig = (): fkrClientConfig => {
  const envInst = env.from(process.env);
  return {
    stsUrl: envInst.get('FKR_STS_URL').required().asString(),
    fhirUrl: envInst.get('FKR_FHIR_URL').required().asString(),
    clientId: envInst.get('FKR_CLIENT_ID').required().asString(),
    accessKey: envInst.get('FKR_CLIENT_SECRET').required().asString(),
  };
};

const getFreshToken = async (): Promise<TokenSet> => {
  const config = getConfig();
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
  });
  const result = await axios.post(config.stsUrl, params, {
    auth: {
      username: config.clientId,
      password: config.accessKey,
    },
  });
  return result.data as TokenSet;
};

const cache = flatCache.load('FKR');

export type fkrClientConfig = {
  clientId: string;
  accessKey: string;
  stsUrl: string;
  fhirUrl: string;
};

export const getCache = (): Cache => {
  return cache;
};
export const fkrGetToken = async (): Promise<string> => {
  const token = cache.getKey('token');
  if (token) {
    const nowTime = new Date().getTime() / 1000;
    try {
      const tokenContent = JWT.decode(token.access_token) as IdTokenClaims;
      if (nowTime < tokenContent.exp) {
        return token.access_token;
      }
    } catch (e) {}
  }
  const newToken = await getFreshToken();
  cache.setKey('token', newToken);
  cache.save();
  return newToken.access_token;
};
export type fkrGetPatientParams = {
  identifier?: string;
  name?: string;
};

export async function fkrGetPatient(params?: fkrGetPatientParams): Promise<IPatient[]> {
  const config = getConfig();
  const url = config.fhirUrl + '/Patient';
  const token = await fkrGetToken();
  const result = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  const returnValue: IPatient[] = [];
  (result.data as IBundle).entry.forEach((entry: IBundle_Entry) => {
    returnValue.push(entry.resource as IPatient);
  });
  return returnValue;
}
