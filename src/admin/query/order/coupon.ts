import { serverHeader, serverURL } from "../../data/stuff";
import {couponProps} from '../../types/order/coupon'
import axios from "axios";
const create = axios.create();

export async function listCoupon(){
    const res = await create.post(serverURL + '/list-coupon');
    return res
}

export async function createCoupon(data:couponProps){
    const res = await create.post(serverURL + '/add-coupon', data);
    return res
}

export async function deleteCoupon(id:string){
    const res = await create.post(serverURL + '/delete-coupon', {couponId: id});
    return res
}

export async function editCoupon(id:string){
    const res = await create.post(serverURL + '/edit-coupon', {couponId: id});
    return res
}

export async function updateCoupon(data:couponProps){
    const res = await create.post(serverURL + '/update-coupon', data);
    return res
}
