import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { getOrder } from "../query/customer";
import {
  AlertUserNotification,
  Preloader,
  imageURL,
} from "@/src/admin/data/stuff";
import Link from "next/link";

const Payment = () => {
  return (
    <>
      <Layout>
        <div className="py-10">
          <Content />
        </div>
      </Layout>
    </>
  );
};
const getDateAfterDays = (days: number) => {
  const today = new Date();
  const nextDays = new Date(today.getTime() + days * 24 * 60 * 60 * 1000); // Adding milliseconds for four days

  return nextDays.toDateString(); // Format the date as a string (e.g., "Sat Nov 20 2023")
};
const Content = () => {
  const router = useRouter();
  const [orderdata, setorderdata] = useState<any>();
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [toasterdata, settoasterdata] = useState<any>({
    isShow: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    if (router.query.order_id !== undefined) {
      const colte = {
        orderId: router.query.order_id,
        accessToken: localStorage.getItem("dkz_user_token"),
      };
      getOrder(colte)
        .then((order) => {
          setorderdata(order.data.data);
          setshowpreloader(false);
        })
        .catch((error) => {
          // setshowpreloader(false);
          settoasterdata({
            ...toasterdata,
            isShow: true,
            type: "error",
            message: "Something went wrong",
          });
          setTimeout(() => {
            settoasterdata({ ...toasterdata, isShow: false });
          }, 10000);
        });
    }
  }, [router.isReady]);
  return (
    <>
      {toasterdata.isShow ? (
        <AlertUserNotification
          type={toasterdata.type}
          message={toasterdata.message}
        />
      ) : (
        ""
      )}
      {showpreloader ? (
        <Preloader />
      ) : (
        <>
          <div className="bg-white p-standard">
            <div className="py-4 border-b-2 border-gray-500">
              <div className="flex items-center gap-x-3">
                <div className="">
                  <CheckCircleIcon className="w-8 stroke-primary" />
                </div>
                <div className="">
                  <h2 className="text-primary font-bold text-2xl">
                    Order placed, thank you!
                  </h2>
                </div>
              </div>
              <div className="py-2 text-gray-800 font-bold">
                Confirmation will be sent to your mobile
              </div>
            </div>
            <div className="py-4 border-b-2 border-gray-500">
              <div className="">
                <b>Shipping to {orderdata?.address.name}, </b>
                {orderdata?.address.address}, {orderdata?.address.locality},{" "}
                {orderdata?.address.city},{orderdata?.address.state},{" "}
                {orderdata?.address.pincode}
                <br />
                Phone Number {orderdata?.address.mobile},
              </div>
            </div>
            <div className="py-4 border-b-2 border-gray-500">
              <div className="flex justify-between max-w-2xl">
                <div className="">
                  <b>{getDateAfterDays(4)}</b>
                  <div className="">Estimated delivery</div>
                </div>
                <div className="">
                  <img
                    src={
                      imageURL + orderdata?.product?.productDetail?.images[0]
                    }
                    className="w-[150px]"
                  />
                </div>
              </div>
              <div className="">
                <Link
                  href="/profile/orders"
                  className="text-blue-500 font-bold"
                >
                  Review or edit your recent orders
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Payment;
