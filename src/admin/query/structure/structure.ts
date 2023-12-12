import { serverHeader, serverURL } from "../../data/stuff";
import axios from "axios";
const create = axios.create();


export async function listContent(){
    const res = await create.post(serverURL + '/list-structure');
    return res
}

export async function getStructure_(data:any){
    const res = await create.post(serverURL + '/get-structure', data);
    return res
}

export async function deleteContent(data:string){
    const res = await create.post(serverURL + '/delete-structure',  {structureId: data});
    return res
}

export async function createContent(data:any){
    const res = await create.post(serverURL + '/create-structure', data);
    return res
}

export async function getStructure(data:any){
    const res = await create.post(serverURL + '/get-content', data);
    return res
}

export async function createStructure(data:any){
    const res = await create.post(serverURL + '/create-content', data);
    return res
}

export async function updateStructure(data:any){
    const res = await create.post(serverURL + '/update-content', data);
    return res
}

export async function updateStructure_(data:any){
    const res = await create.post(serverURL + '/update-structure', data);
    return res
}

export async function homepageUpdateStructure(data:any){
    const res = await create.post(serverURL + '/homepage-update-structure', data);
    return res
}