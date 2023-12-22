import { serverHeader, serverURL } from "../../data/stuff";
import {couponProps} from '../../types/order/coupon'
import axios from "axios";
const create = axios.create();

export async function listOrder(){
    const res = await create.post(serverURL + '/list-order');
    return res
}
