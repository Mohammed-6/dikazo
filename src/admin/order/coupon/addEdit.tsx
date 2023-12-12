import React, { useState, useEffect, cloneElement } from "react";
import { toaster } from "../../types/basic";
import { Preloader, Toaster } from "../../data/stuff";
import router from "next/router";
import { addEditProps, couponProps } from "../../types/order/coupon";
import { createCoupon, updateCoupon } from "../../query/order/coupon";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddEdit = (props: addEditProps) => {
  const [collectdata, setcollectdata] = useState<couponProps>({
    _id: "",
    code: "",
    discount: 0,
    discountType: "",
    validFrom: new Date(),
    validUntil: new Date(),
    minPurchase: 0,
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (props.data._id !== "") {
      setcollectdata(props.data);
      // Sample date retrieved from MongoDB
      const mongoDBDate = new Date(props.data.validFrom);
      const mongoDBDate1 = new Date(props.data.validUntil);

      setcollectdata({
        ...collectdata,
        _id: props.data._id,
        code: props.data.code,
        discount: props.data.discount,
        discountType: props.data.discountType,
        validFrom: mongoDBDate,
        validUntil: mongoDBDate1,
      });
    }
  }, []);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
    setcollectdata({ ...collectdata, discountType: event.value });
  };

  const validFromChange = (e: Date) => {
    setcollectdata({ ...collectdata, validFrom: e });
  };

  const validUntilChange = (e: Date) => {
    setcollectdata({ ...collectdata, validUntil: e });
  };

  const submitForm = () => {
    setshowpreloader(false);
    if (
      collectdata.code === "" ||
      collectdata.discount === 0 ||
      collectdata.discountType === "" ||
      collectdata.validFrom === null ||
      collectdata.validUntil === null
    ) {
      settoasterdata({
        type: "error",
        message: "*All fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }
    if (collectdata._id !== "" && collectdata._id !== undefined) {
      updateCoupon(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    } else {
      createCoupon(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    }
  };

  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="max-w-2xl relative top-6 mx-auto">
          <div className="card">
            <div className="card-header">Add / Edit Coupon</div>
            <div className="card-body">
              <div className="form-item">
                <label className="form-label mb-1">Code*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="code"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.code}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Discount</label>
                <div className="">
                  <input
                    className="form-input"
                    type="number"
                    name="discount"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.discount}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Discount</label>
                <div className="">
                  <select
                    className="w-full"
                    name="discountType"
                    value={collectdata.discountType}
                    onChange={changeType}
                  >
                    <option value="">Select Type</option>
                    <option value="amount">Amount</option>
                    <option value="percent">Percent</option>
                  </select>
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Discount Valid From</label>
                <div className="">
                  <DatePicker
                    selected={collectdata.validFrom}
                    onChange={(date) => validFromChange(date as any)}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd'T'HH:mm.SSS'Z'"
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Discount Valid Until</label>
                <div className="">
                  <DatePicker
                    selected={collectdata.validUntil}
                    onChange={(date) => validUntilChange(date as any)}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd'T'HH:mm.SSS'Z'"
                  />
                </div>
              </div>
              {showtoaster ? (
                <div className="py-1">
                  <div
                    className={`${
                      toasterdata.type === "error" ||
                      toasterdata.type === "info"
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
              <div className="">
                <button
                  className="bg-primary text-sm text-white text-md font-bold px-6 py-2 rounded-md mr-3"
                  onClick={submitForm}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-sm text-white text-md font-bold px-6 py-2 rounded-md"
                  onClick={() => props.closePopUp()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
