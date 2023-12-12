import { serverHeader, serverURL } from "../../admin/data/stuff";

import axios from "axios";
const create = axios.create();

export async function loadCategory(category:string){
    const res = await create.get(serverURL + '/v2/get-category/' + category);
    return res
}

export async function filterCategory(filter:any, page:number, category:string){
    const res = await create.post(serverURL + '/v2/filter-category/' +category,  {filter:filter, page:page});
    return res
}