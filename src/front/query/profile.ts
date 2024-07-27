import { serverHeader, serverURL } from "../../admin/data/stuff";

import axios from "axios";
import { profileProps } from "../types/profile";
const create = axios.create();

export async function requestOTP(product: any) {
  const res = await create.post(serverURL + "/v2/request-otp/", product);
  return res;
}

export async function confirmOTP(product: any) {
  const res = await create.post(
    serverURL + "/v2/request-confirm-otp/",
    product
  );
  return res;
}

export async function getProfile() {
  const res = await create.post(serverURL + "/v2/get-profile/", {
    accessToken: localStorage.getItem("dkz_user_token"),
  });
  return res;
}

export async function trackPackage(shippingId: string) {
  const res = await create.post(serverURL + "/goswift/track/" + shippingId);
  return res;
}

export async function updateProfile(profile: profileProps) {
  const colte = {
    accessToken: localStorage.getItem("dkz_user_token"),
    data: profile,
  };
  const res = await create.post(serverURL + "/v2/update-profile/", colte);
  return res;
}

export async function listProfileCoupon() {
  const res = await create.post(serverURL + "/v2/list-profile-coupon/", {
    accessToken: localStorage.getItem("dkz_user_token"),
  });
  return res;
}

export async function getProfileAddress() {
  const res = await create.post(serverURL + "/v2/get-profile-address/", {
    accessToken: localStorage.getItem("dkz_user_token"),
  });
  return res;
}

export async function getProfileOrders() {
  const res = await create.post(serverURL + "/v2/list-profile-orders/", {
    accessToken: localStorage.getItem("dkz_user_token"),
  });
  return res;
}

export async function getProfileOrder(orderid: string) {
  const res = await create.post(
    serverURL + "/v2/list-profile-order/" + orderid,
    { accessToken: localStorage.getItem("dkz_user_token") }
  );
  return res;
}
