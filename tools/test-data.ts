import {loadEnv} from "./utils/func";
import {fkrGetPatient} from "@navikt/fkr-client";
import {writeFileSync} from "fs";
import {fileExists} from "@nrwl/workspace/src/utils/fileutils";
import {join} from "path";

loadEnv();

const config = {
    "fhirUrl": process.env.FKR_FHIR_URL,
    "stsUrl": process.env.FKR_STS_URL,
    "clientId": process.env.FKR_CLIENT_ID,
    "accessKey": process.env.FKR_CLIENT_SECRET,
}
console.log(config)
fkrGetPatient(config).then(patients => {
    if (!fileExists(join(process.cwd(), "package.json"))) {
        console.warn("Exiting script, not in project root directory")
        process.exit(-1)
    }
    const patientsFolder = join(process.cwd(), "examples", "fkr");
    writeFileSync(join(patientsFolder, "patients.json"), JSON.stringify(patients), "utf-8")
    patients.forEach(patient => {
        console.log(patient.id)
    })
})



