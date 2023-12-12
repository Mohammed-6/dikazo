import React, { useState, useEffect } from "react";
import { sellerProps, addEditProps } from "../types/seller/seller";
import { createSeller, editSeller, updateSeller } from "../query/seller/seller";
import { toaster } from "../types/basic";
import { Preloader, Toaster } from "../data/stuff";
import { useRouter } from "next/router";
import { Country, State, City } from "country-state-city";
import Layout from "../layout";
import Link from "next/link";

const AddEdit = (props: addEditProps) => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};
const Content = (props: addEditProps) => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<sellerProps>({
    _id: "",
    personalInfomration: {
      name: "",
      email: "",
      gender: "",
      dob: "",
      state: "",
      city: "",
      personalAddress: "",
    },
    bankAccountInformation: {
      bankName: "",
      accountNumber: "",
      accountName: "",
      ifscCode: "",
    },
    shopInformation: {
      shopName: "",
      shopAddress: "",
      shopPhone: "",
      gst: "",
      trademark: "",
    },
    socialInformation: {
      instagram: "",
      google: "",
      facebook: "",
      twitter: "",
      youtube: "",
    },
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [states, setstates] = useState<any>([]);
  const [cities, setcities] = useState<any>([]);

  useEffect(() => {
    setstates(State.getStatesOfCountry("IN"));
    if (router.query.editid !== "" && router.query.editid !== undefined) {
      editSeller(router.query.editid as string).then((res) => {
        console.log(res.data.data);
        setcollectdata(res.data.data);
      });
    }
    collectdata;
  }, [router.isReady]);

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      personalInfomration: {
        ...collectdata?.personalInfomration,
        [event.name]: event.value,
      },
    });
  };

  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      bankAccountInformation: {
        ...collectdata?.bankAccountInformation,
        [event.name]: event.value,
      },
    });
  };

  const changeForm2 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      shopInformation: {
        ...collectdata?.shopInformation,
        [event.name]: event.value,
      },
    });
  };

  const changeForm3 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      socialInformation: {
        ...collectdata?.socialInformation,
        [event.name]: event.value,
      },
    });
  };

  const changeCEForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
    const llt = event.value.split("-");
    if (event.name === "state") {
      setcities(City.getCitiesOfState("IN", llt[1]));
    }
    setcollectdata({
      ...collectdata,
      personalInfomration: {
        ...collectdata?.personalInfomration,
        [event.name]: llt[0],
      },
    });
  };

  const formChangeTXT = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const event = e.target as HTMLTextAreaElement;
    setcollectdata({
      ...collectdata,
      shopInformation: {
        ...collectdata?.shopInformation,
        [event.name]: event.value,
      },
    });
  };

  const submitForm = () => {
    console.log(collectdata);
    // return;
    setshowpreloader(true);
    if (collectdata?.personalInfomration?.name === "") {
      settoasterdata({
        type: "error",
        message: "*Name are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }
    // console.log(colte);
    if (router.query.edit !== "" && router.query.editid !== undefined) {
      updateSeller(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        router.push("/admin/seller");
      });
    } else {
      createSeller(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        router.push("/admin/seller");
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
      <div className="">
        <div className="">
          <div className="card">
            <div className="card-header">Add / Edit Seller</div>
            <div className="card-body">
              <div className="">
                <div className="grid grid-cols-2 gap-x-10">
                  <div className="">
                    <h2 className="text-xl font-bold py-3">
                      Seller Personal Information
                    </h2>
                    <div className="form-item">
                      <label className="form-label mb-1">Name*</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="name"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.name}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Email Address</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="email"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.email}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Gender</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="gender"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.gender}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Date of Birth</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="dob"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.dob}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">State</label>
                      <div className="">
                        <select
                          className="w-full rounded-md"
                          name="state"
                          onChange={changeCEForm}
                          value={collectdata?.personalInfomration?.state}
                        >
                          <option
                            value={collectdata?.personalInfomration?.state}
                          >
                            {collectdata?.personalInfomration?.state === ""
                              ? "Select State"
                              : collectdata?.personalInfomration?.state}
                          </option>
                          {states.map((state: any) => (
                            <option
                              selected={
                                collectdata?.personalInfomration?.state ==
                                state.name
                                  ? true
                                  : false
                              }
                              value={state.name + "-" + state.isoCode}
                            >
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">City</label>
                      <div className="">
                        <select
                          className="w-full rounded-md"
                          name="city"
                          onChange={changeCEForm}
                          value={collectdata?.personalInfomration?.city}
                        >
                          <option
                            value={collectdata?.personalInfomration?.city}
                          >
                            {collectdata?.personalInfomration?.city}
                          </option>
                          {cities.map((state: any) => (
                            <option value={state.name}>{state.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Personal Address
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="personalAddress"
                          autoComplete="off"
                          placeholder=""
                          value={
                            collectdata?.personalInfomration?.personalAddress
                          }
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="border-b border-gray-500 my-2"></div>
                    <h2 className="text-xl font-bold py-3">
                      Bank Account Information
                    </h2>
                    <div className="form-item">
                      <label className="form-label mb-1">Bank Name</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="bankName"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.bankAccountInformation?.bankName}
                          onChange={changeForm1}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Bank IFSC Code</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="ifscCode"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.bankAccountInformation?.ifscCode}
                          onChange={changeForm1}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Bank Account Name
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="accountName"
                          autoComplete="off"
                          placeholder=""
                          value={
                            collectdata?.bankAccountInformation?.accountName
                          }
                          onChange={changeForm1}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Bank Account No.
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="accountNumber"
                          autoComplete="off"
                          placeholder=""
                          value={
                            collectdata?.bankAccountInformation?.accountNumber
                          }
                          onChange={changeForm1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <h2 className="text-xl font-bold py-3">Shop Information</h2>
                    <div className="form-item">
                      <label className="form-label mb-1">Shop Name</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="shopName"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.shopName}
                          onChange={changeForm2}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Shop Address</label>
                      <div className="">
                        <textarea
                          className="form-control rounded-md w-full"
                          name="shopAddress"
                          value={collectdata?.shopInformation?.shopAddress}
                          onChange={formChangeTXT}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">GST Number</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="gst"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.gst}
                          onChange={changeForm2}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Trademark</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="trademark"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.trademark}
                          onChange={changeForm2}
                        />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold py-3">Social Media</h2>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Instagram Page Link
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="instagram"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.socialInformation?.instagram}
                          onChange={changeForm3}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Google Page Link
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="google"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.socialInformation?.google}
                          onChange={changeForm3}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Twitter Page Link
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="twitter"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.socialInformation?.twitter}
                          onChange={changeForm3}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Facebook Page Link
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="facebook"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.socialInformation?.facebook}
                          onChange={changeForm3}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Youtube Page Link
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="youtube"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.socialInformation?.youtube}
                          onChange={changeForm3}
                        />
                      </div>
                    </div>
                  </div>
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
                <Link
                  href="/admin/seller"
                  className="bg-red-500 text-sm text-white text-md font-bold px-6 py-2 rounded-md"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
