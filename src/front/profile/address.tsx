import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProfileLayout from "./layout";
import { addressProps, arrAddressProps } from "../types/customer";
import { AlertUserNotification } from "@/src/admin/data/stuff";
import { AddEditAddress } from "../checkout";
import { defaultAddress, listAddress, removeAddress } from "../query/customer";

const Address = () => {
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

  useEffect(() => {
    allListAddress();
  }, []);
  const allListAddress = () => {
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
  };
  const hideAddress = () => {
    setshowaddress(false);
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
  const removeAdd = (dd: any) => {
    const colte = {
      addressId: dd,
      accessToken: localStorage.getItem("dkz_user_token"),
    };
    removeAddress(colte)
      .then((address) => {
        allListAddress();
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
  };
  const updateDefault = (dd: any) => {
    const colte = {
      addressId: dd,
      accessToken: localStorage.getItem("dkz_user_token"),
    };
    defaultAddress(colte)
      .then((address) => {
        allListAddress();
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
      {showaddress ? (
        <AddEditAddress
          hideCoupon={hideAddress}
          editData={editaddress}
          returnData={returnData}
        />
      ) : (
        ""
      )}
      <div className="mx-auto p-4">
        <div className="grid grid-cols-2 gap-x-4">
          <div
            className="flex items-center justify-center min-h-[250px] bg-white border-4 border-dashed border-gray-300 rounded-md"
            onClick={showAddress}
          >
            <div className="">
              <PlusIcon className="w-20" />
            </div>
          </div>
          {addresslist.map((add: addressProps) => (
            <div className="min-h-[250px] bg-white border border-gray-300 rounded-md my-2">
              {add?.isDefault ? (
                <>
                  <div className="flex px-4 py-2 border-b text-sm">
                    Default:&nbsp;&nbsp;
                    <img
                      src="https://www.dikazo.com/assets/images/dikazo-logo-main.png"
                      className="w-10 object-contain"
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="flex flex-col justify-between min-h-[250px] p-4">
                <div className="leading-normal w-[auto]">
                  <div className="font-bold">{add.contactDetail?.name}</div>
                  <div className="">
                    {add.addressDetail?.address},{add.addressDetail?.locality},
                  </div>
                  <div className="">
                    {add.addressDetail?.city},{add.addressDetail?.state},{" "}
                    {add.addressDetail?.pincode} &nbsp;
                  </div>
                  <div className="">
                    Phone number: {add.contactDetail?.mobile}
                  </div>
                </div>
                <div className="">
                  <div className="flex">
                    <div className="border-r-2 pr-4">
                      <button
                        className="text-blue-500"
                        onClick={() => editAddress(add)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="border-r-2 px-4">
                      <button
                        className="text-blue-500"
                        onClick={() => removeAdd(add._id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="pl-4">
                      <button
                        className="text-blue-500"
                        onClick={() => updateDefault(add._id)}
                      >
                        Set as Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Address;
