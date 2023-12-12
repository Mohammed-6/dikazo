import { serverHeader, serverURL } from "../../data/stuff";
import {colorProps} from '../../types/product/color'
import axios from "axios";
const create = axios.create();

export async function listColor(){
    const res = await create.post(serverURL + '/list-color');
    return res
}

export async function createColor(data:colorProps){
    const res = await create.post(serverURL + '/add-color', data);
    return res
}

export async function deleteColor(id:string){
    const res = await create.post(serverURL + '/delete-color', {colorId: id});
    return res
}

export async function editColor(id:string){
    const res = await create.post(serverURL + '/edit-color', {colorId: id});
    return res
}

export async function updateColor(data:colorProps){
    const res = await create.post(serverURL + '/update-color', data);
    return res
}
