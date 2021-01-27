import axios from "axios";
import {BESTILLINGER} from "../paths-server.json";
import {BestillingInterface} from "../types/test-test";

async function ListBestilling(): Promise<BestillingInterface[]> {
    const result = await axios.get(BESTILLINGER);
    return result.data;
}

export default ListBestilling;
