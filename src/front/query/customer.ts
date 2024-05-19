import { serverHeader, serverURL } from "../../admin/data/stuff";

import axios from "axios";
const create = axios.create();

export async function generateOTPValv(phone:any){
    const res = await create.post(serverURL + '/v2/generate-otp/', phone);
    return res
}
export async function confirmOtpValv(otp:any){
    const res = await create.post(serverURL + '/v2/confirm-otp/', otp);
    return res
}

export async function wishlistProduct(product:any){
    const res = await create.post(serverURL + '/v2/add-to-wishlist/', product);
    return res
}

export async function buyNowProduct(product:any){
    const res = await create.post(serverURL + '/v2/buy-now/', product);
    return res
}

export async function getCartItem(){
    const res = await create.post(serverURL + '/v2/get-cart-item/', {accessToken: localStorage.getItem('dkz_user_token')});
    return res
}

export async function updateCartQuantity(data:any){
    const res = await create.post(serverURL + '/v2/update-cart-item-quantity/', data);
    return res
}

export async function deleteCartItem(data:any){
    const res = await create.post(serverURL + '/v2/delete-cart-item/', data);
    return res
}

export async function checkCoupon(data:any){
    const res = await create.post(serverURL + '/v2/check-coupon/', data);
    return res
}

export async function applyCoupon(data:any){
    const res = await create.post(serverURL + '/v2/apply-coupon/', data);
    return res
}

export async function removedCoupon(data:any){
    const res = await create.post(serverURL + '/v2/remove-coupon/', data);
    return res
}

export async function listAddress(data:any){
    const res = await create.post(serverURL + '/list-address/', data);
    return res
}

export async function addAddress(data:any){
    const res = await create.post(serverURL + '/add-address/', data);
    return res
}

export async function updateAddress(data:any){
    const res = await create.post(serverURL + '/update-address/', data);
    return res
}

export async function removeAddress(data:any){
    const res = await create.post(serverURL + '/remove-address/', data);
    return res
}

export async function defaultAddress(data:any){
    const res = await create.post(serverURL + '/v2/update-default-address/', data);
    return res
}

export async function createOrder(data:any){
    const res = await create.post(serverURL + '/v2/create-order/', data);
    return res
}

export async function updateCartChecked(data:any){
    const res = await create.post(serverURL + '/v2/update-cart-item/', data);
    return res
}

export async function confirmOrder(data:any){
    const res = await create.post(serverURL + '/v2/confirm-order/', data);
    return res
}

export async function getOrder(data:any){
    const res = await create.post(serverURL + '/v2/get-order-payment/', data);
    return res
}
export async function submitSellerFeedback(data:any){
    const res = await create.post(serverURL + '/v2/submit-seller-feedback/', data);
    return res
}
export async function submitDeliveryFeedback(data:any){
    const res = await create.post(serverURL + '/v2/submit-delivery-feedback/', data);
    return res
}
export async function submitProductFeedback(data:any){
    const res = await create.post(serverURL + '/v2/submit-product-feedback/', data);
    return res
}