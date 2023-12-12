import React, { useEffect, useState } from "react";
import Layout from "../layout";
import ProfileLayout from "./layout";
import { toaster } from "@/src/admin/types/basic";
import { getProfileOrder } from "../query/profile";
import { Preloader, Toaster, imageURL } from "@/src/admin/data/stuff";
import { SingleOrder, formatDate } from "./orders";
import { useRouter } from "next/router";
import Link from "next/link";
const OrderDetails = () => {
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
  const router = useRouter();
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  const [collectdata, setcollectdata] = useState<any>([]);
  const [discount, setdiscount] = useState<number>(0);
  const [subtotal, setsubtotal] = useState<number>(0);
  const [coupondetails, setcoupondetails] = useState<any>();
  useEffect(() => {
    if (router.query.order_id !== undefined) {
      getProfileOrder(router.query.order_id as string)
        .then((ord) => {
          setcollectdata(ord.data.data);
          setshowpreloader(false);
          ord.data.data.productDetail.map((prd: any) => {
            const price = prd.productDetail.price;
            setsubtotal(subtotal + price);
          });
          if (
            ord.data.data.promotionDetail.discount &&
            ord.data.data.promotionDetail.discount !== undefined
          ) {
            setcoupondetails({
              discount: ord.data.data.promotionDetail.discount,
              code: ord.data.data.promotionDetail.code,
            });
            if (
              ord.data.data.promotionDetail.discountType === "percent" &&
              ord.data.data.amountTotal
            ) {
              var totalValue: any =
                ord.data.data.amountTotal -
                (ord.data.data.amountTotal *
                  ord.data.data.promotionDetail.discount) /
                  100;

              setdiscount(ord.data.data.amountTotal - totalValue);
            } else if (
              ord.data.data.promotionDetail.discountType === "amount" &&
              ord.data.data.amountTotal
            ) {
              setdiscount(ord.data.data.promotionDetail.discount);
            }
          }
        })
        .catch((err) => {
          setshowtoaster(true);
          setshowpreloader(false);
          settoasterdata({ type: "error", message: "Something went wrong" });
          setTimeout(() => {
            setshowtoaster(false);
          }, 3000);
        });
    }
  }, [router.isReady]);
  return (
    <>
      <>
        {showtoaster ? (
          <Toaster type={toasterdata.type} message={toasterdata.message} />
        ) : (
          ""
        )}
        {showpreloader ? (
          <Preloader />
        ) : (
          <div className="p-3">
            <h2 className="text-2xl font-bold py-2">Order Details</h2>
            <div className="flex justify-between">
              <div className="text-sm flex items-center">
                <div className="border-r pr-3">
                  Ordered on {formatDate(new Date(collectdata.created_at))}
                </div>
                <div className="pl-3">Order# {collectdata.orderCode}</div>
              </div>
              <div className="">
                <h3 className="text-xl">Invoice</h3>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md p-3 my-3">
              <div className="grid grid-cols-3 text-sm gap-x-5">
                <div className="">
                  <div className="font-bold">Shipping Address</div>
                  <div className="">{collectdata.addressDetail.name}</div>
                  <div className="">
                    {collectdata.addressDetail?.address},
                    {collectdata.addressDetail?.locality},
                    {collectdata.addressDetail?.city},
                    {collectdata.addressDetail?.state},{" "}
                    {collectdata.addressDetail?.pincode}
                  </div>
                </div>
                <div className="">
                  <div className="font-bold">Payment Method</div>
                  <div className="">{collectdata.paymentMethod}</div>
                </div>
                <div className="">
                  <div className="font-bold">Order Summary</div>
                  <div className="flex justify-between">
                    <div>Item(s) Subtotal:</div>
                    <div>₹{subtotal}</div>
                  </div>
                  <div className="flex justify-between">
                    <div> Promotion:</div>
                    <div>-₹{discount.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div> Shipping:</div>
                    <div>₹0</div>
                  </div>
                  <div className="flex justify-between">
                    <div> Total:</div>
                    <div>₹{collectdata.amountTotal}</div>
                  </div>
                  <div className="flex justify-between font-bold">
                    <div>Grand Total:</div>
                    <div>₹{collectdata.amountTotal}</div>
                  </div>
                </div>
              </div>
            </div>
            {collectdata.productDetail.map((ord: any) => (
              <>
                <div className="border border-gray-300 rounded-lg my-4">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="grid grid-cols-12">
                      <div className="col-span-9">
                        <div className="pb-3">
                          <h2 className="font-bold text-xl">Processing</h2>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2">
                          <div className="col-span-3">
                            <img
                              src={imageURL + ord.productDetail.images[0]}
                              className="w-[200px]object-contain"
                            />
                          </div>
                          <div className="text-sm col-span-9">
                            <h5 className="font-bold text-lg">
                              {ord.productDetail?.brand}
                            </h5>
                            <Link
                              href={"/product/" + ord.productDetail?.seoTitle}
                              className="hover:underline text-blue-500 hover:text-primary"
                            >
                              {ord.productDetail.name}
                            </Link>
                            <div className="">
                              Sold by: {ord.shopInformation?.name}
                            </div>
                            <div className="text-red-500">
                              ₹{ord.productDetail.price}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="">
                          <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-3">
                            Track package
                          </button>
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
            ))}
          </div>
        )}
      </>
    </>
  );
};

export default OrderDetails;
