import axios from "axios";
import {BackendPaths} from "@navikt/hops-types";

export async function sendBestilling(patientId, data) {
    await axios.post(BackendPaths.BESTILLING_PATH.replace(":patientId", patientId), data);
}
