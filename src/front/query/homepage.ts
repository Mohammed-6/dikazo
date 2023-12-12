import { serverHeader, serverURL } from "../../admin/data/stuff";

import axios from "axios";
const create = axios.create();

export async function getHomepage(){
    const res = await create.get(serverURL + '/v2/get-homepage-structure/');
    return res
}