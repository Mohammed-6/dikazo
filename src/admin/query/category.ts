import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
import { categoryProps } from "../types/category";
const create = axios.create();

export async function listPageCategory(){
    const res = await create.post(serverURL + '/list-page-category');
    return res
}

export async function createCategory(data:categoryProps){
    const res = await create.post(serverURL + '/add-page-category', data);
    return res
}

export async function editPageCategory(data:string){
    const res = await create.post(serverURL + '/edit-page-category/'+data);
    return res
}

export async function updatePageCategory(data:categoryProps){
    const res = await create.post(serverURL + '/update-page-category', data);
    return res
}

export async function deletePageCategory(data:string){
    const res = await create.post(serverURL + '/delete-page-category/'+data);
    return res
}