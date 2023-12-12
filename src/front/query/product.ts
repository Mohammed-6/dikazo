import { serverHeader, serverURL } from "../../admin/data/stuff";

import axios from "axios";
const create = axios.create();

export async function loadProductDetails(product:string){
    const res = await create.get(serverURL + '/v2/get-product/' + product);
    return res
}