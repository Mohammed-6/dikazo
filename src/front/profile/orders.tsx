import React, { useEffect, useState } from "react";
import Layout from "../layout";
import ProfileLayout from "./layout";
import Link from "next/link";
import { getProfileOrders } from "../query/profile";
import { toaster } from "@/src/admin/types/basic";
import { Toaster, imageURL } from "@/src/admin/data/stuff";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Orders = () => {
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
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  const [collectdata, setcollectdata] = useState<any>([]);
  useEffect(() => {
    getProfileOrders()
      .then((ord) => {
        setcollectdata(ord.data.data);
      })
      .catch((err) => {
        setshowtoaster(true);
        settoasterdata({ type: "error", message: "Something went wrong" });
        setTimeout(() => {
          setshowtoaster(false);
        }, 3000);
      });
  }, []);
  return (
    <>
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="p-3">
        {collectdata.map((ord: any) => (
          <>
            <SingleOrder data={ord} />
          </>
        ))}
      </div>
    </>
  );
};

type singleOrderProps = {
  data: any;
};
export const formatDate = (date: Date) => {
  const options: any = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Format the date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
export const SingleOrder = (props: singleOrderProps) => {
  const [showaddress, setshowaddress] = useState<boolean>(false);

  const shoAddress = () => {
    setshowaddress(!showaddress);
  };
  const getLast = props.data.productDetail[props.data.productDetail.length - 1];
  return (
    <>
      <div className="border border-gray-300 rounded-lg">
        <div className="bg-gray-100 p-3 rounded-tl-lg rounded-tr-lg">
          <div className="grid grid-cols-2 items-center justify-between">
            <div className="text-sm text-gray-500">
              <div className="flex items-center gap-x-6">
                <div className="">
                  <div className="uppercase">order placed</div>
                  <div className="">
                    {formatDate(new Date(props.data.created_at))}
                  </div>
                </div>
                <div className="">
                  <div className="uppercase">total</div>
                  <div className="">₹{props.data.amountTotal}</div>
                </div>
                <div className="relative">
                  <div className="uppercase">ship to</div>
                  <div
                    className="flex items-center text-blue-500 gap-x-2 hover:cursor-pointer"
                    onClick={shoAddress}
                  >
                    {props.data.addressDetail.name}
                    <ChevronDownIcon className="w-4" />
                  </div>
                  {showaddress ? (
                    <div className="absolute p-2 top-10 bg-white w-[200px] -left-[50px] rounded-md shadow-lg h-auto">
                      <b>{props.data.addressDetail.name}</b>
                      <div className="">
                        {props.data.addressDetail?.address},
                        {props.data.addressDetail?.locality},
                      </div>
                      <div className="">
                        {props.data.addressDetail?.city},
                        {props.data.addressDetail?.state},{" "}
                        {props.data.addressDetail?.pincode} &nbsp;
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 flex flex-col items-end">
              <div className="uppercase">ORDER # {props.data.orderCode}</div>
              <div className="flex">
                <Link
                  href={"/profile/order-details?order_id=" + props.data._id}
                  className="text-blue-500 border-r border-gray-300 pr-3"
                >
                  View order details
                </Link>
                <button className="text-blue-500 pl-3">Invoice</button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white">
          <div className="grid grid-cols-12">
            <div className="col-span-9">
              <div className="pb-3">
                <h2 className="font-bold text-xl">Processing</h2>
                {/* <p className="">Package was handed to resident</p> */}
              </div>
              <div className="grid grid-cols-12 gap-x-2">
                <div className="col-span-3">
                  <img
                    src={imageURL + getLast.productDetail.images[0]}
                    className="w-[200px]object-contain"
                  />
                </div>
                <div className="text-sm col-span-9">
                  <Link
                    href={"/product/" + getLast.productDetail?.seoTitle}
                    className="hover:underline text-blue-500 hover:text-primary"
                  >
                    {getLast.productDetail.name}
                  </Link>
                  <div className="">
                    {/* Return eligible through 27-Nov-2023 <br />
                    Return window closed on 27-Nov-2023 */}
                  </div>
                  <Link
                    href={"/profile/order-details?order_id=" + props.data._id}
                    className="mt-2 border rounded-md px-4 py-1 text-sm shadow-none hover:bg-gray-100 text-center mb-3"
                  >
                    View your item
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="">
                <Link
                  href={"/profile/order-details?order_id=" + props.data._id}
                  className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-3"
                >
                  Track package
                </Link>
                <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1">
                  Return items
                </button>
                <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1">
                  Leave seller feedback
                </button>
                <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1">
                  Leave delivery feedback
                </button>
                <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1">
                  Write a product review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
