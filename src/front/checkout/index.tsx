import {
  ArrowUturnLeftIcon,
  LockClosedIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { addressProps, arrAddressProps } from "../types/customer";
import { toaster } from "@/src/admin/types/basic";
import {
  addAddress,
  confirmOrder,
  createOrder,
  getCartItem,
  listAddress,
  updateAddress,
} from "../query/customer";
import {
  AlertUserNotification,
  Preloader,
  imageURL,
} from "@/src/admin/data/stuff";
import { useRouter } from "next/router";
import useRazorpay from "react-razorpay";

const CheckHeader = () => {
  return (
    <>
      <div className="px-2">
        <div className="py-3 bg-gray-100">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="">
              <img
                src="https://dikazo.com/assets/images/dikazo-logo-main.png"
                className="h-16 w-32"
              />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl">Checkout</h2>
            </div>
            <div className="">
              <LockClosedIcon className="w-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CheckoutFooter = () => {
  return (
    <>
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto py-3">
          <div className="flex justify-between">
            <div className="flex">
              <img
                className="footer-bank-ssl"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png"
                width="70"
                height="37"
              />{" "}
              <img
                className="footer-bank-visa"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-mc"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-ae"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-dc"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-dc.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-nb"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-cod"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-cod.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-rupay"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-paypal"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png"
                width="60"
                height="37"
              />{" "}
              <img
                className="footer-bank-bhim"
                src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png"
                width="60"
                height="37"
              />
            </div>
            <div className="">
              <button className="font-bold text-lg">
                Need help? Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CheckoutView = () => {
  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<any>({
    address: "",
    paymentMethod: "",
    shipping: 0,
  });
  const [changeaddress, setchangeaddress] = useState<boolean>(true);
  const [changepaymentmethod, setchangepaymentmethod] =
    useState<boolean>(false);
  const [reviewitems, setreviewitems] = useState<boolean>(false);
  const [showpayment, setshowpayment] = useState<boolean>(false);

  const [cartitem, setcartitem] = useState<any>();
  const [stockitem, setstockitem] = useState<any>();
  const [totalamt, settotalamt] = useState<any>();
  const [totalmrp, settotalmrp] = useState<any>();
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [toasterdata, settoasterdata] = useState<any>({
    isShow: false,
    type: "",
    message: "",
  });
  const [swiftratecard, _] = useState<any>([
    { name: "zone-a", rates: [92, 38, 240, 24] },
    { name: "zone-b", rates: [114, 46, 258, 42] },
    { name: "zone-c", rates: [126, 52, 295, 48] },
    { name: "zone-d", rates: [140, 60, 336, 56] },
    { name: "zone-e", rates: [166, 74, 382, 70] },
  ]);
  useEffect(() => {
    getCartItem()
      .then((res) => {
        if (res.data.data.length === 0) {
          router.push("/cart");
        }
        console.log(res.data.data);
        setcartitem(res.data.data);
        setstockitem(res.data.stock);
        settotalamt(res.data.total);
        settotalmrp(res.data.mrp);
        setshowpreloader(false);
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  }, [router.isReady]);
  const showAddress = () => {
    setchangeaddress(true);
    setchangepaymentmethod(true);
  };
  const showPaymentMethod = () => {
    setchangepaymentmethod(true);
  };
  const changeAddress = (dd: any) => {
    setcollectdata({ ...collectdata, address: dd });
    setchangeaddress(false);
    setchangepaymentmethod(true);
  };
  const changePayment = (dd: any) => {
    setcollectdata({ ...collectdata, paymentMethod: dd });
    setchangepaymentmethod(false);
    setreviewitems(true);
  };
  const payNow = () => {
    if (collectdata.paymentMethod === "" && collectdata.address === "") {
      settoasterdata({
        ...toasterdata,
        isShow: true,
        type: "error",
        message: "Something went wrong! please try again later",
      });
      setshowpreloader(false);
      setTimeout(() => {
        settoasterdata({ ...toasterdata, isShow: false });
      }, 3000);
      return;
    }
    setshowpayment(true);
    const colte = {
      accessToken: localStorage.getItem("dkz_user_token"),
      collect: collectdata,
    };
    createOrder(colte)
      .then((res) => {
        // console.log(res.data);
        const options = {
          key: "rzp_test_s7rXzSSkEG43th",
          amount: "50000",
          currency: "INR",
          name: "Dikazo Online Shopping",
          description: "incoming order",
          image: "https://www.dikazo.com/assets/images/dikazo-logo-main.png",
          order_id: res.data.data.id,
          handler: function (response: any) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            confirmOrder(response).then(function () {
              router.push("/payment?order_id=" + response.razorpay_order_id);
            });
          },
          prefill: {
            name: res.data.detail.addressDetail.name,
            // email: "youremail@example.com",
            contact: res.data.detail.addressDetail.mobile,
          },
          notes: {
            address: res.data.detail.addressDetail.address,
          },
          theme: {
            color: "#10A37F",
          },
        };
        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response: any) {
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
          settoasterdata({
            ...toasterdata,
            isShow: true,
            type: "error",
            message: response.error.description,
          });
          setshowpreloader(false);
          setTimeout(() => {
            settoasterdata({ ...toasterdata, isShow: false });
          }, 6000);
        });

        rzp1.open();
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };
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
      <CheckHeader />
      {showpreloader ? (
        <Preloader />
      ) : (
        <>
          {showpayment ? <PaymentProcess /> : ""}
          <div className="min-h-screen">
            <div className="grid grid-cols-12 max-w-6xl mx-auto gap-x-10">
              <div className="col-span-8">
                {changeaddress ? (
                  <AddressList returnData={changeAddress} />
                ) : (
                  <>
                    <div className="flex items-center justify-between py-10">
                      <div className="text-lg text-gray-400 font-bold">
                        Select Delivery Address
                      </div>
                      <div className="">
                        <button
                          className="text-blue-500 text-sm font-bold"
                          onClick={showAddress}
                        >
                          Change delivery address
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {changepaymentmethod ? (
                  <PaymentMethod returnData={changePayment} />
                ) : (
                  <>
                    <div className="flex items-center justify-between py-5 pb-10">
                      <div className="text-lg text-gray-400 font-bold">
                        Payment Method
                      </div>
                      <div className="">
                        {collectdata.paymentMethod !== "" ? (
                          <button
                            className="text-blue-500 text-sm font-bold"
                            onClick={showPaymentMethod}
                          >
                            Change payment method
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </>
                )}
                {reviewitems ? (
                  <OrderReview
                    data={cartitem}
                    stock={stockitem}
                    total={totalamt}
                    mrp={totalmrp}
                    payNow={payNow}
                  />
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-10">
                      <div className="text-lg text-gray-400 font-bold">
                        Review items and delivery
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col-span-4">
                <PriceDetails
                  address={changeaddress}
                  payment={changepaymentmethod}
                  review={reviewitems}
                  data={cartitem}
                  stock={stockitem}
                  total={totalamt}
                  mrp={totalmrp}
                  payNow={payNow}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <CheckoutFooter />
    </>
  );
};

const PaymentProcess = () => {
  return (
    <>
      <div className="fixed inset-0 bg-white z-[100] h-screen overflow-x-hidden overflow-y-hidden flex items-center justify-center">
        <div className="">
          <div className="flex justify-center">
            <LockClosedIcon className="w-20" />
          </div>
          <div className="">
            <h2 className="text-6xl font-bold py-3 text-center">
              Payment in process...
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

type addressListProps = {
  returnData: Function;
};
const AddressList = (props: addressListProps) => {
  const [showaddress, setshowaddress] = useState<boolean>(false);
  const [addresslist, setaddresslist] = useState(arrAddressProps);
  const [editaddress, seteditaddress] = useState<addressProps>({
    _id: "",
    isDefault: false,
    customerId: "",
    contactDetail: {
      name: "",
      mobile: 0,
    },
    addressDetail: {
      pincode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
      type: "",
    },
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [toasterdata, settoasterdata] = useState<any>({
    isShow: false,
    type: "",
    message: "",
  });
  const [selectaddress, setselectaddress] = useState<string>("");
  useEffect(() => {
    const id = localStorage.getItem("dkz_user_mobile");
    const colte = { customerId: id };
    listAddress(colte)
      .then((address) => {
        setaddresslist(address.data.data);
      })
      .catch((error) => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  }, []);
  const hideAddress = () => {
    setshowaddress(false);
  };
  const showAddress = () => {
    setshowaddress(true);
  };
  const returnData = (dd: any) => {
    setaddresslist(dd);
    seteditaddress({
      _id: "",
      isDefault: false,
      customerId: "",
      contactDetail: {
        name: "",
        mobile: 0,
      },
      addressDetail: {
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
        type: "",
      },
    });
  };
  const editAddress = (dd: any) => {
    seteditaddress(dd);
    setshowaddress(true);
  };
  const returnData1 = (dd: any) => {
    setselectaddress(dd);
  };
  const changePayment = () => {
    if (selectaddress === "") {
      settoasterdata({
        ...toasterdata,
        isShow: true,
        type: "error",
        message: "Please select a address",
      });
      setshowpreloader(false);
      setTimeout(() => {
        settoasterdata({ ...toasterdata, isShow: false });
      }, 3000);
      return;
    }
    props.returnData(selectaddress);
  };
  return (
    <>
      {" "}
      {toasterdata.isShow ? (
        <AlertUserNotification
          type={toasterdata.type}
          message={toasterdata.message}
        />
      ) : (
        ""
      )}
      {showaddress ? (
        <AddEditAddress
          hideCoupon={hideAddress}
          editData={editaddress}
          returnData={returnData}
        />
      ) : (
        ""
      )}
      <div className="">
        <div className="py-10">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">Select Delivery Address</div>
            <div className="">
              <button
                className="uppercase px-5 py-2 border border-gray-400 text-xs font-bold"
                onClick={showAddress}
              >
                Add new address
              </button>
            </div>
          </div>
          <div className="">
            <div className="bg-white rounded-md py-5">
              <h2 className="text-2xl font-bold border-b border-gray-400 pb-2">
                Your Addresses
              </h2>
              {addresslist.map((add: addressProps) => (
                <ListAddress
                  data={add}
                  editAddress={editAddress}
                  returnData={returnData1}
                />
              ))}
              <div className="">
                <div className="">
                  <button className="flex text-blue-500" onClick={showAddress}>
                    <PlusIcon className="w-6 stroke-blue-500" /> Add a new
                    address
                  </button>
                </div>
              </div>

              <button
                className="w-auto px-5 bg-primary text-white font-bold text-center text-sm py-2 rounded-md"
                onClick={changePayment}
              >
                Use this address
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
type listAddressProps = {
  data: addressProps;
  editAddress: Function;
  returnData: Function;
};
const ListAddress = (props: listAddressProps) => {
  useEffect(() => {
    if (props.data.isDefault) {
      props.returnData(props.data?._id);
    }
  }, []);
  const editAddress = () => {
    props.editAddress(props.data);
  };
  const useAddress = (e: React.MouseEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData(evt.value);
  };
  return (
    <>
      <div className="p-2 border border-gray-400 bg-gray-100/50 rounded-lg my-2">
        <div className="flex gap-x-1">
          <div className="">
            <input
              type="radio"
              checked={props.data.isDefault ? true : false}
              value={props.data?._id}
              onClick={useAddress}
              name="pickaddress"
              className=""
            />
          </div>
          <div className="">
            <span className="font-bold">{props.data.contactDetail?.name}</span>
            &nbsp;|&nbsp;
            <span className="font-bold">
              {props.data.contactDetail?.mobile}
            </span>
            <p className="">
              {props.data.addressDetail?.address},{" "}
              {props.data.addressDetail?.locality},{" "}
              {props.data.addressDetail?.city},{props.data.addressDetail?.state}
              , {props.data.addressDetail?.pincode} &nbsp;
              <button className="text-blue-500" onClick={editAddress}>
                Edit address
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
type addeditaddressProps = {
  hideCoupon: Function;
  returnData: Function;
  editData: addressProps;
};
export const AddEditAddress = (props: addeditaddressProps) => {
  const [collectdata, setcollectdata] = useState<addressProps>({
    _id: "",
    isDefault: false,
    customerId: "",
    contactDetail: {
      name: "",
      mobile: 0,
    },
    addressDetail: {
      pincode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
      type: "",
    },
  });
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    setcollectdata(props.editData);
  }, []);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setcollectdata({
      ...collectdata,
      contactDetail: { ...collectdata.contactDetail, [evt.name]: evt.value },
    });
  };
  const changeForm1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setcollectdata({
      ...collectdata,
      addressDetail: { ...collectdata.addressDetail, [evt.name]: evt.value },
    });
  };
  const formSubmit = () => {
    setshowtoaster(false);
    if (
      collectdata.contactDetail.name === "" ||
      collectdata.contactDetail.mobile === null ||
      collectdata.addressDetail.address === "" ||
      collectdata.addressDetail.city === "" ||
      collectdata.addressDetail.locality === "" ||
      collectdata.addressDetail.pincode === "" ||
      collectdata.addressDetail.state === "" ||
      collectdata.addressDetail.type === ""
    ) {
      setshowtoaster(true);
      settoasterdata({ type: "error", message: "All fields are required" });
      return;
    }
    const id = localStorage.getItem("dkz_user_mobile");
    const colte = { ...collectdata, customerId: id };
    if (collectdata._id !== "") {
      updateAddress(collectdata)
        .then((res) => {
          props.returnData(res.data.data);
          setshowtoaster(true);
          settoasterdata({
            type: "success",
            message: "Address updated successfully",
          });
          setTimeout(() => {
            hideCoupon();
          }, 1500);
        })
        .catch(() => {
          setshowtoaster(true);
          settoasterdata({ type: "error", message: "Something went wrong" });
        });
    } else {
      addAddress(colte)
        .then((res) => {
          props.returnData(res.data.data);
          setshowtoaster(true);
          settoasterdata({
            type: "success",
            message: "Address added successfully",
          });
          setTimeout(() => {
            hideCoupon();
          }, 1500);
        })
        .catch(() => {
          setshowtoaster(true);
          settoasterdata({ type: "error", message: "Something went wrong" });
        });
    }
  };
  const changeType = (e: React.MouseEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setcollectdata({
      ...collectdata,
      addressDetail: { ...collectdata.addressDetail, type: evt.value },
    });
  };
  const hideCoupon = () => {
    props.hideCoupon();
  };
  return (
    <>
      <div className="fixed bg-black/50 z-30 inset-0">
        <div className="bg-white max-w-lg mx-auto relative top-10">
          <div className="border-b border-gray-300">
            <div className="flex justify-between border-b border-gray-300 py-4 p-3">
              <div className="font-bold text-md">
                {collectdata._id !== "" ? "Update" : "Add"} a new address
              </div>
              <div className="">
                <XMarkIcon
                  className="w-6 hover:cursor-pointer"
                  onClick={hideCoupon}
                />
              </div>
            </div>
          </div>
          <div className="px-3 py-5">
            <h2 className="text-lg font-bold">Contact Details</h2>
            <div className="">
              <div className="mb-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Name*
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder=""
                  name="name"
                  onChange={changeForm}
                  value={collectdata.contactDetail.name}
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Mobile*
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder=""
                  name="mobile"
                  onChange={changeForm}
                  value={collectdata.contactDetail.mobile}
                />
              </div>
            </div>
            <h2 className="text-lg font-bold pt-3">Address</h2>
            <div className="">
              <div className="mb-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Pincode*
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder=""
                  name="pincode"
                  onChange={changeForm1}
                  value={collectdata.addressDetail.pincode}
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Address (Area, Street, Sector, Village )*
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder=""
                  name="address"
                  onChange={changeForm1}
                  value={collectdata.addressDetail.address}
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Locality*
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder=""
                  name="locality"
                  onChange={changeForm1}
                  value={collectdata.addressDetail.locality}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <div className="">
                  <div className="mb-1">
                    <label className="block mb-1 text-sm font-medium text-gray-900">
                      City*
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                      placeholder=""
                      name="city"
                      onChange={changeForm1}
                      value={collectdata.addressDetail.city}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="mb-1">
                    <label className="block mb-1 text-sm font-medium text-gray-900">
                      State*
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                      placeholder=""
                      name="state"
                      onChange={changeForm1}
                      value={collectdata.addressDetail.state}
                    />
                  </div>
                </div>
              </div>

              <label className="block mb-1 text-sm font-medium text-gray-900">
                Address type*
              </label>
              <div className="flex items-center space-x-2">
                <div className="mb-1">
                  <input
                    type="radio"
                    id="option1"
                    name="type"
                    onClick={changeType}
                    checked={collectdata.addressDetail.type === "home"}
                    value="home"
                    className="rounded-full h-4 w-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                  <label htmlFor="option1" className="text-gray-700">
                    Home
                  </label>
                </div>
                <div className="">
                  <input
                    type="radio"
                    id="option2"
                    name="type"
                    onClick={changeType}
                    checked={collectdata.addressDetail.type === "office"}
                    value="office"
                    className="rounded-full h-4 w-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                  <label htmlFor="option2" className="text-gray-700">
                    Office
                  </label>
                </div>
              </div>
            </div>
          </div>
          {showtoaster ? (
            <div className="py-1 px-3">
              <div
                className={`${
                  toasterdata.type === "error" || toasterdata.type === "info"
                    ? "bg-red-500"
                    : "bg-green-500"
                } px-3 py-2 text-white text-md rounded-md`}
              >
                {toasterdata.message}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="p-3">
            <div className="grid grid-cols-1">
              <div className="">
                <button
                  className="bg-primary w-full text-white py-2 rounded-md"
                  onClick={formSubmit}
                >
                  {collectdata._id !== "" ? "Update" : "Add"} Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
type priceDetailsProps = {
  address: boolean;
  review: boolean;
  payment: boolean;
  data: any;
  stock: any;
  total?: number;
  mrp?: number;
  payNow: Function;
};
const PriceDetails = (props: priceDetailsProps) => {
  const [cartitem, setcartitem] = useState<any>();
  const [discount, setdiscount] = useState<number>(0);
  const [coupondetails, setcoupondetails] = useState<any>();

  useEffect(() => {
    setcartitem(props.data);
    props.data !== undefined &&
      props.data.map((dd: any) => {
        if (dd.discount && dd.discount !== undefined) {
          setcoupondetails({
            discount: dd.discount.discount,
            code: dd.discount.code,
          });
          if (dd.discount.discountType === "percent" && props.total) {
            var totalValue: any =
              props.total - (props.total * dd.discount.discount) / 100;

            setdiscount(props.total - totalValue);
          } else if (dd.discount.discountType === "amount" && props.total) {
            setdiscount(dd.discount.discount);
          }
        }
      });
  }, []);
  const payNow = () => {
    props.payNow();
  };
  return (
    <>
      <div className="py-10">
        <div className="bg-white p-3 rounded-lg border border-gray-300">
          <div className="">
            <div className="py-2 text-center">
              {/* {props.review ? ( */}
              <button
                className="w-auto px-6 bg-primary text-white font-bold text-center text-lg py-2 rounded-md"
                onClick={payNow}
              >
                Place your order
              </button>
              {/* ) : (
                ""
              )} */}
              <p className="text-xs text-gray-700 font-semibold py-2">
                Choose a shipping address and payment method to calculate
                shipping, handling and tax.
              </p>
            </div>
            <div className="border-t border-b border-gray-400 py-3">
              <h2 className="font-bold text-lg pb-3">Order Summary</h2>
              <div className="">
                <div className="flex justify-between text-sm py-2">
                  <span className="">
                    Price details ({cartitem?.length} items){" "}
                  </span>
                </div>
                <div className="flex justify-between text-md py-2">
                  <span className="">Total MRP </span>
                  <div className="font-bold">
                    <small>₹</small> {props.mrp}
                  </div>
                </div>
                <div className="flex justify-between text-md py-2">
                  <span className="">Discount on MRP </span>
                  <div className="font-bold">
                    <small>₹</small>{" "}
                    {props.total && props.mrp
                      ? (props.total - props.mrp).toFixed(2)
                      : 0}
                  </div>
                </div>
                {discount !== 0 ? (
                  <div className="flex justify-between text-md py-2">
                    <span className="">Coupon Discount </span>
                    <div className="font-bold">
                      <small>₹</small> {discount.toFixed(2)}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex justify-between text-md py-2">
                  <span className="">Shipping Fee </span>
                  <div className="font-bold">
                    <small>₹</small> 0
                  </div>
                </div>
                <div className="flex justify-between text-md font-bold py-2">
                  <span className="">Total Amount </span>
                  <div className="font-bold">
                    <small>₹</small>{" "}
                    {props.total ? (props.total - discount).toFixed(2) : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type paymentMethodProps = {
  returnData: Function;
};
const PaymentMethod = (props: paymentMethodProps) => {
  const [paymentmethod, setpaymentmethod] = useState<string>("");
  const changepaymentmethod = (e: React.MouseEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setpaymentmethod(evt.value);
  };
  const changePayment = () => {
    if (paymentmethod === "") {
      return false;
    } else {
      props.returnData(paymentmethod);
    }
  };
  return (
    <>
      <div className="pb-10">
        <div className="pb-0">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">Select Payment Method</div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-x-3 py-3">
            <div className="">
              <input
                type="radio"
                value="online"
                onClick={changepaymentmethod}
                name="paymentmethod"
              />
            </div>
            <div className="font-bold text-md">Onine</div>
          </div>
          <div className="flex items-center gap-x-3 py-3">
            <div className="">
              <input
                type="radio"
                value="cod"
                onClick={changepaymentmethod}
                name="paymentmethod"
              />
            </div>
            <div className="font-bold text-md">
              Cash on Delivery/Pay on Delivery
            </div>
          </div>
        </div>
        <div>
          <button
            className="w-auto px-5 bg-primary text-white font-bold text-center text-sm py-2 rounded-md"
            onClick={changePayment}
          >
            Use this payemnt method
          </button>
        </div>
      </div>
    </>
  );
};

type orderReviewProps = {
  data: any;
  stock: any;
  total?: number;
  mrp?: number;
  payNow: Function;
};
const OrderReview = (props: orderReviewProps) => {
  const [cartitem, setcartitem] = useState<any>();
  const [discount, setdiscount] = useState<number>(0);
  const [coupondetails, setcoupondetails] = useState<any>();

  useEffect(() => {
    setcartitem(props.data);
    props.data.map((dd: any) => {
      if (dd.discount && dd.discount !== undefined) {
        setcoupondetails({
          discount: dd.discount.discount,
          code: dd.discount.code,
        });
        if (dd.discount.discountType === "percent" && props.total) {
          var totalValue: any =
            props.total - (props.total * dd.discount.discount) / 100;

          setdiscount(props.total - totalValue);
        } else if (dd.discount.discountType === "amount" && props.total) {
          setdiscount(dd.discount.discount);
        }
      }
    });
  }, []);

  const payNow = () => {
    props.payNow();
  };
  return (
    <>
      <div className="">
        <div className="pb-5">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">Review items and delivery</div>
          </div>
        </div>
        <div className="">
          {props.data?.length !== 0 ? (
            <>
              {props.data?.map((item: any, ix: number) => (
                <>
                  {item.isChecked ? (
                    <ProductCartGrid data={item} stock={props.stock[ix]} />
                  ) : (
                    ""
                  )}
                </>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="my-5">
          <div className="py-1 border rounded-lg border-gray-300">
            <div className="flex items-center p-3 gap-x-5">
              <div>
                <button
                  className="w-auto px-5 bg-primary text-white font-bold text-center text-sm py-2 rounded-md"
                  onClick={payNow}
                >
                  Place your order
                </button>
              </div>
              <div className="">
                <div className="flex justify-between font-bold text-primary text-lg py-0">
                  <div className="">
                    Order Total: ₹&nbsp;
                    {props.total ? (props.total - discount).toFixed(2) : 0}
                  </div>
                  <div className=""></div>
                </div>
                <small>
                  By placing your order, you agree to Dikazo's privacy , terms
                  and conditions.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type productGridProps = {
  data: any;
  stock: any;
};
const ProductCartGrid = (props: productGridProps) => {
  const [showmoreqty, setshowmoreqty] = useState<boolean>(false);
  const [qty, setqty] = useState<number>(0);
  const [cqty, setcqty] = useState<number>(0);
  const changeQty = (e: React.FormEvent<HTMLSelectElement>) => {
    const val: any = e.currentTarget.value;
    if (val === "10") {
      setshowmoreqty(true);
    }
    const pint = parseInt(val);
    setqty(pint);
  };
  const updateQty = () => {
    if (cqty < 10) {
      setshowmoreqty(false);
    }
    // setshowmoreqty(false);
    const pint = cqty;
    setqty(pint);
  };
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const pint = parseInt(val);
    setcqty(pint);
  };

  const brk = props.data.variantName.split("-");
  return (
    <>
      <div className="py-3 border-b-2 border-gray-200">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-3">
            <img src={imageURL + props.stock?.images[0]} className="" />
          </div>
          <div className="col-span-9">
            <h5 className="font-bold text-lg">
              {props.data.productId.productInformation?.brand.name}
            </h5>
            <h2 className="text-lg">
              {props.data.productId.productInformation?.name}
            </h2>
            <div className="text-primary font-semibold text-lg">
              ₹{props.stock?.sellingPrice}
            </div>
            <p className="text-sm">
              Sold by:{" "}
              {
                props.data.productId.productInformation?.seller
                  .personalInfomration.name
              }
            </p>
            <p className="hidden">
              <div className="flex items-center gap-x-2 py-2">
                <ArrowUturnLeftIcon className="w-6" /> <b>14 days</b> return
                policy
              </div>
            </p>
            <div className="text-sm">
              {props.data.productId.productVariation.attributes.map(
                (attr: any, i: number) => (
                  <div className="flex">
                    <b>{attr}:&nbsp; </b> {brk[i]}
                  </div>
                )
              )}
            </div>
            <div className="flex items-center gap-x-1 py-0">
              <div className="font-bold">Qty:</div>
              <div className="">{props.data.quantity}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
