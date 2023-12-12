
import { serverHeader, serverURL } from "../data/stuff";
import {loginProps} from '../types/login'
import axios from "axios";
const create = axios.create();

export async function checkLogin(data:loginProps){
    const check = await create.post(serverURL + '/login', data);
    return check;
}