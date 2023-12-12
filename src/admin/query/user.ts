import { serverHeader, serverURL } from "../data/stuff";
import {addUserProps} from '../types/user'
import axios from "axios";
const create = axios.create();

export async function listUser(){
    const res = await create.post(serverURL + '/list-user', {clinicId: localStorage.getItem('clinicId')});
    return res
}

export async function preLoadUser(){
    const res = await create.post(serverURL + '/list-usertype', {clinicId: localStorage.getItem("clinicId")});
    return res
}

export async function createUser(data:addUserProps){
    const colte = {
        ...data,
        clinicId: localStorage.getItem("clinicId"),
      };
    const res = await create.post(serverURL + '/add-user', colte);
    return res
}

export async function deleteUser(id:string){
    const res = await create.post(serverURL + '/delete-user', {clinicId: localStorage.getItem('clinicId'), userId: id});
    return res
}

export async function editUser(id:string){
    const res = await create.post(serverURL + '/edit-user', {clinicId: localStorage.getItem("clinicId"), userId: id});
    return res
}

export async function updateUser(data:addUserProps){
    const colte = {
        ...data,
        clinicId: localStorage.getItem("clinicId"),
      };
    const res = await create.post(serverURL + '/update-user', colte);
    return res
}

// add usertype
export async function createUserType(usertype:string){
    const res = await create.post(serverURL + '/add-usertype', {userType: usertype, clinicId: localStorage.getItem('clinicId')});
    return res
}