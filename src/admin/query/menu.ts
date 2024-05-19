import { serverHeader, serverURL } from "../data/stuff";
import {menuProps} from '../types/menu'
import axios from "axios";
const create = axios.create();

export async function listMenu(){
    const res = await create.post(serverURL + '/list-menu');
    return res
}

export async function createMenu(data:menuProps){
    const res = await create.post(serverURL + '/add-menu', data);
    return res
}

export async function deleteMenu(id:string){
    const res = await create.post(serverURL + '/delete-menu', {menuId: id});
    return res
}

export async function editMenu(id:string){
    const res = await create.post(serverURL + '/edit-menu', {menuId: id});
    return res
}

export async function updateMenu(data:menuProps){
    const res = await create.post(serverURL + '/update-menu', data);
    return res
}
