
import { serverHeader, serverURL } from "../data/stuff";
import {loginProps} from '../types/login'
import axios from "axios";
const create = axios.create();

export async function searchProduct(data:any){
    const check = await create.post(serverURL + '/search-product', data);
    return check;
}