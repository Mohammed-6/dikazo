import { serverHeader, serverURL } from "../../data/stuff";
import {categoryProps} from '../../types/product/category'
import axios from "axios";
const create = axios.create();

export async function listCategory(){
    const res = await create.post(serverURL + '/list-category');
    return res
}

export async function createCategory(data:categoryProps){
    const res = await create.post(serverURL + '/add-category', data);
    return res
}

export async function deleteCategory(id:string){
    const res = await create.post(serverURL + '/delete-category', {categoryId: id});
    return res
}

export async function editCategory(id:string){
    const res = await create.post(serverURL + '/edit-category', {categoryId: id});
    return res
}

export async function updateCategory(data:categoryProps){
    const res = await create.post(serverURL + '/update-category', data);
    return res
}
