import axios from "axios"
import * as flatCache from 'flat-cache'
import {Cache} from 'flat-cache'
import {JWT} from "jose"
import {IdTokenClaims} from "openid-client";
import {IBundle_Entry, IPatient} from "@ahryman40k/ts-fhir-types/lib/R4";


const getFreshToken = async (config: fkrClientConfig) => {
    const result = await axios.post(
        config.stsUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
        }), {
            auth: {
                username: config.clientId,
                password: config.accessKey,
            },
        });

    return result.data;
};

const cache = flatCache.load('FKR');

export type fkrClientConfig = {
    clientId: string;
    accessKey: string;
    stsUrl: string;
    fhirUrl: string;
}

export const getCache = (): Cache => {
    return cache;
}
export const fkrGetToken = async (config: fkrClientConfig): Promise<string> => {
    const token = cache.getKey('token');
    if (token) {
        const nowTime = (new Date()).getTime() / 1000;
        try {
            const tokenContent = JWT.decode(token.access_token) as IdTokenClaims;
            if (nowTime < tokenContent.exp) {
                return token.access_token;
            }
        } catch (e){}
    }
    const newToken = await getFreshToken(config);
    cache.setKey('token', newToken);
    cache.save();
    return newToken.access_token;
};
export type fkrGetPatientParams = {
    identifier?: string;
    name?: string;
}

export async function fkrGetPatient(config: fkrClientConfig, params?: fkrGetPatientParams): Promise<IPatient[]> {
    const url = config.fhirUrl + "/Patient";
    const token = await fkrGetToken(config);
    const result = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`},
        params,
    });
    const returnValue: IPatient[] = [];
    result.data.entry.forEach((entry: IBundle_Entry) => {
        returnValue.push(entry.resource as IPatient)

    })
    return returnValue;
}
