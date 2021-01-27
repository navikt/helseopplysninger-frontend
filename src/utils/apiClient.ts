import axios from "axios";
import {useFhirContext} from "../client/context/FhirContext";


export const apiClient = async () => {
    const context = useFhirContext();
    if (context.client) {
        return axios.create({
            headers: {
                Authorization: context.client.getAuthorizationHeader()
            }
        });
    } else {

    }

}
