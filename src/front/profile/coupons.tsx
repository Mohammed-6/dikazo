import React, { useEffect, useState } from "react";
import Layout from "../layout";
import ProfileLayout from "./layout";
import { arrcouponProps } from "@/src/admin/types/order/coupon";
import { listProfileCoupon } from "../query/profile";

const Coupons = () => {
  return (
    <>
      <Layout>
        <ProfileLayout>
          <Content />
        </ProfileLayout>
      </Layout>
    </>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(arrcouponProps);
  useEffect(() => {
    listProfileCoupon().then((cc) => {
      setcollectdata(cc.data.data);
    });
  }, []);
  return (
    <>
      <div className="">
        {collectdata.map((cc) => (
          <div className="m-3 border border-gray-300 shadow-lg">
            <div className="grid grid-cols-12 mx-4 border-b border-gray-300">
              <div className="border-r border-gray-300 flex items-center justify-center h-[100px] col-span-3">
                <h2 className="font-bold">
                  {cc.discount}
                  {cc.discountType === "percent" ? "%" : ""}&nbsp; OFF
                </h2>
              </div>
              <div className="flex items-center justify-start px-3 h-[100px] col-span-9">
                <span className="">
                  On minimum purchase of Rs. {cc.minPurchase}
                  <br />
                  Code: {cc.code}
                </span>
              </div>
            </div>
            <div className="px-4">
              <div className="p-2">
                Expiry: <b>{new Date(cc.validUntil).toLocaleString()}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Coupons;
