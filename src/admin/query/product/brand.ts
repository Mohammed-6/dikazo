import { serverHeader, serverURL } from "../../data/stuff";
import {brandProps} from '../../types/product/brand'
import axios from "axios";
const create = axios.create();

export async function listBrand(){
    const res = await create.post(serverURL + '/list-brand');
    return res
}

export async function createBrand(data:brandProps){
    const res = await create.post(serverURL + '/add-brand', data);
    return res
}

export async function deleteBrand(id:string){
    const res = await create.post(serverURL + '/delete-brand', {brandId: id});
    return res
}

export async function editBrand(id:string){
    const res = await create.post(serverURL + '/edit-brand', {brandId: id});
    return res
}

export async function updateBrand(data:brandProps){
    const res = await create.post(serverURL + '/update-brand', data);
    return res
}
