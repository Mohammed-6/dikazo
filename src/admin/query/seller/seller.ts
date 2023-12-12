import { serverHeader, serverURL } from "../../data/stuff";
import {sellerProps} from '../../types/seller/seller'
import axios from "axios";
const create = axios.create();

export async function listSeller(){
    const res = await create.post(serverURL + '/list-seller');
    return res
}

export async function createSeller(data:sellerProps){
    const res = await create.post(serverURL + '/add-seller', data);
    return res
}

export async function deleteSeller(id:string){
    const res = await create.post(serverURL + '/delete-seller', {sellerId: id});
    return res
}

export async function editSeller(id:string){
    const res = await create.post(serverURL + '/edit-seller', {sellerId: id});
    return res
}

export async function updateSeller(data:sellerProps){
    const res = await create.post(serverURL + '/update-seller', data);
    return res
}
