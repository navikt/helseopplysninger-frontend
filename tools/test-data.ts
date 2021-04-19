import {loadEnv} from "./utils/func";
import {fkrGetPatient} from "../libs/fkr-client/src";

loadEnv();

fkrGetPatient({
    "fhirUrl": process.env.FKR_FHIR_URL,
    "stsUrl": process.env.FKR_STS_URL,
    "clientId": process.env.FKR_CLIENT_ID,
    "accessKey": process.env.FKR_CLIENT_SECRET,
}).then(p => console.log(p))



