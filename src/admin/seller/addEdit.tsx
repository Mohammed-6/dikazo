import React, { useState, useEffect } from "react";
import { sellerProps, addEditProps } from "../types/seller/seller";
import {
  createSeller,
  editSeller,
  goswiftAddress,
  updateSeller,
} from "../query/seller/seller";
import { toaster } from "../types/basic";
import { Preloader, Toaster, gstStates } from "../data/stuff";
import { useRouter } from "next/router";
import { Country, State, City } from "country-state-city";
import Layout from "../layout";
import Link from "next/link";
import { getPincodeDetails } from "@/src/front/query/customer";

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
      panNo: "",
      gender: "",
      dob: "",
      pincode: 0,
      state: "",
      city: "",
      personalAddress: "",
      stateCode: 0,
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
      pincode: 0,
      state: "",
      city: "",
      stateCode: 0,
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
    if (event.name === "pincode") {
      if (event.value.length >= 6) {
        getPincode(event.value);
      }
    }
  };

  const changeSelectForm = (e: React.FormEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
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
    if (event.name === "pincode") {
      if (event.value.length >= 6) {
        getPincodeShop(event.value);
      }
    }
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
    // goswift data
    const goswiftData = {
      alias: collectdata.shopInformation.shopName,
      phone: parseInt(collectdata.shopInformation.shopPhone),
      address_line1: collectdata.shopInformation.shopAddress,
      address_line2: "",
      pincode: collectdata.shopInformation.pincode,
      city: collectdata.shopInformation.city,
      state: collectdata.shopInformation.state,
      country: "India",
    };
    // console.log(colte);
    if (router.query.edit !== "" && router.query.editid !== undefined) {
      updateSeller(collectdata).then(async (resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        await goswiftAddress(goswiftData).then((ress) => {
          if (ress.data.type === "error") {
            settoasterdata({
              type: "error",
              message: ress.data.data.description,
            });
            setshowtoaster(true);
          } else {
            router.push("/admin/seller");
          }
        });
        setshowpreloader(false);
      });
    } else {
      createSeller(collectdata).then(async (resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        await goswiftAddress(goswiftData).then((ress) => {
          if (ress.data.type === "error") {
            settoasterdata({
              type: "error",
              message: ress.data.data.description,
            });
            setshowtoaster(true);
          } else {
            router.push("/admin/seller");
          }
        });
        setshowpreloader(false);
      });
    }
  };

  function searchByKey(jsonData: any, searchValue: string) {
    // Validate input (optional)
    if (typeof jsonData !== "object" || jsonData === null) {
      throw new Error("Invalid JSON data provided.");
    }

    if (typeof searchValue !== "string") {
      throw new Error("Search value must be a string.");
    }

    // Search for the value in the object
    for (const key in jsonData) {
      if (jsonData[key] === searchValue) {
        return key;
      }
    }

    // If not found, return null or undefined (adjust as needed)
    return null; // You can change this to 'Value not found' or undefined
  }

  const getPincode = (pincode: string) => {
    getPincodeDetails(pincode).then((detail: any) => {
      const colte = detail.data[0];
      // console.log(colte);
      const gstState = gstStates;
      const key: any = searchByKey(gstState, colte.PostOffice[0].State);
      if (colte.Status === "Success") {
        if (colte.PostOffice.length > 0) {
          setcollectdata({
            ...collectdata,
            personalInfomration: {
              ...collectdata.personalInfomration,
              state: colte.PostOffice[0].State,
              city: colte.PostOffice[0].Name,
              pincode: colte.PostOffice[0].Pincode,
              stateCode: key,
            },
          });
          setshowtoaster(false);
        } else {
          setshowtoaster(true);
          settoasterdata({ type: "error", message: "Wrong pincode" });
          return;
        }
      } else {
        setshowtoaster(true);
        settoasterdata({ type: "error", message: "Wrong pincode" });
        return;
      }
    });
  };

  const getPincodeShop = (pincode: string) => {
    getPincodeDetails(pincode).then((detail: any) => {
      const colte = detail.data[0];
      // console.log(colte);
      const gstState = gstStates;
      const key: any = searchByKey(gstState, colte.PostOffice[0].State);
      if (colte.Status === "Success") {
        if (colte.PostOffice.length > 0) {
          setcollectdata({
            ...collectdata,
            shopInformation: {
              ...collectdata.shopInformation,
              state: colte.PostOffice[0].State,
              city: colte.PostOffice[0].Name,
              pincode: colte.PostOffice[0].Pincode,
              stateCode: key,
            },
          });
          setshowtoaster(false);
        } else {
          setshowtoaster(true);
          settoasterdata({ type: "error", message: "Wrong pincode" });
          return;
        }
      } else {
        setshowtoaster(true);
        settoasterdata({ type: "error", message: "Wrong pincode" });
        return;
      }
    });
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
                      <label className="form-label mb-1">Pan No*</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="panNo"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.panNo}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Gender</label>
                      <div className="">
                        <select
                          className="form-input"
                          name="gender"
                          autoComplete="off"
                          value={collectdata?.personalInfomration?.gender}
                          onChange={changeSelectForm}
                        >
                          <option value={""}>Select</option>
                          <option value={"Male"}>Male</option>
                          <option value={"Female"}>Female</option>
                        </select>
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
                      <label className="form-label mb-1">Pincode</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="pincode"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.pincode}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">City</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="city"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.city}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">State</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="state"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.personalInfomration?.state}
                          onChange={changeForm}
                        />
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
                      <label className="form-label mb-1">Shop Phone</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="number"
                          name="shopPhone"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.shopPhone}
                          onChange={changeForm2}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Pincode</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="pincode"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.pincode}
                          onChange={changeForm2}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">City</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="city"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.city}
                          onChange={changeForm2}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">State</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="state"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata?.shopInformation?.state}
                          onChange={changeForm2}
                        />
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
