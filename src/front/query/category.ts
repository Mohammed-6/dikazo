import { serverHeader, serverURL } from "../../admin/data/stuff";

import axios from "axios";
const create = axios.create();

export async function loadCategory(data:any){
    const res = await create.post(serverURL + '/v2/get-category/' + data.category, {q:data.q});
    return res
}

export async function filterCategory(filter:any, page:number, category:string){
    const res = await create.post(serverURL + '/v2/filter-category/' +category,  {filter:filter, page:page});
    return res
}