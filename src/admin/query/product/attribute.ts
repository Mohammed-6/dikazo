import { serverHeader, serverURL } from "../../data/stuff";
import {attributeProps} from '../../types/product/attribute'
import axios from "axios";
const create = axios.create();

export async function listAttribute(){
    const res = await create.post(serverURL + '/list-attribute');
    return res
}

export async function createAttribute(data:attributeProps){
    const res = await create.post(serverURL + '/add-attribute', data);
    return res
}

export async function deleteAttribute(id:string){
    const res = await create.post(serverURL + '/delete-attribute', {attributeId: id});
    return res
}

export async function editAttribute(id:string){
    const res = await create.post(serverURL + '/edit-attribute', {attributeId: id});
    return res
}

export async function updateAttribute(data:attributeProps){
    const res = await create.post(serverURL + '/update-attribute', data);
    return res
}
