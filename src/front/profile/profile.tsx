import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { CheckBadgeIcon, PlusIcon } from "@heroicons/react/24/solid";
import ProfileLayout from "./layout";
import {
  editMobileProps,
  editProfileProps,
  profileProps,
} from "../types/profile";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  confirmOTP,
  getProfile,
  requestOTP,
  updateProfile,
} from "../query/profile";
import { toaster } from "@/src/admin/types/basic";

const Profile = () => {
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
  const [showedit, setshowedit] = useState<boolean>(false);
  const [collectdata, setcollectdata] = useState<profileProps>({
    _id: "",
    phone: 0,
    fullname: "",
    email: "",
    gender: "",
    birthday: "",
    altphone: 0,
  });

  useEffect(() => {
    getProfile().then((profile) => {
      setcollectdata(profile.data.data);
    });
  }, []);
  const changeShowEdit = () => {
    setshowedit(!showedit);
  };
  return (
    <>
      <div className="mx-auto p-4">
        {showedit ? (
          <EditProfile data={collectdata} changeShowEdit={changeShowEdit} />
        ) : (
          <ProfileDetails data={collectdata} changeShowEdit={changeShowEdit} />
        )}
      </div>
    </>
  );
};

const ProfileDetails = (props: editProfileProps) => {
  const showEdit = () => {
    if (props.changeShowEdit) {
      props.changeShowEdit();
    }
  };
  return (
    <>
      <div className="border border-gray-300 px-20 py-10">
        <div className="border-b border-gray-300">
          <h2 className="py-6 font-bold text-2xl">Profile Details</h2>
        </div>
        <div className="py-10">
          <div className="px-6">
            <div className="w-4/6">
              <div className="flex justify-between py-3">
                <div className="">Full Name</div>
                <div className="">{props.data.fullname}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="">Mobile Number</div>
                <div className="">{props.data.phone}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="">Email ID</div>
                <div className="">{props.data.email}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="">Gender</div>
                <div className="">{props.data.gender}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="">Date of Birth</div>
                <div className="">{props.data.birthday}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="">Alternate Mobile</div>
                <div className="">{props.data.altphone}</div>
              </div>
              <div className="flex py-3">
                <button
                  className="bg-orange-500 py-2 px-5 text-white font-bold block w-full uppercase"
                  onClick={showEdit}
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EditMobile = (props: editMobileProps) => {
  const [showverify, setshowverify] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [inputotp, setinputotp] = useState<number>();
  const [newmobile, setnewmobile] = useState<number>(0);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const requestForOTP = () => {
    requestOTP({
      accessToken: localStorage.getItem("dkz_user_token"),
      mobile: localStorage.getItem("dkz_user_mobile"),
    })
      .then((response) => {
        settoasterdata({
          type: response.data.type,
          message: response.data.message,
        });
        setshowtoaster(true);
        setshowverify(true);
      })
      .catch(function (err) {
        settoasterdata({
          type: "error",
          message: "Something went wrong",
        });
        setshowtoaster(true);
      });
  };

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget as HTMLInputElement;
    setinputotp(evt.value as any);
  };
  const changeForm1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget as HTMLInputElement;
    setnewmobile(evt.value as any);
  };

  const confirmYOTP = () => {
    if (newmobile < 10) {
      settoasterdata({
        type: "error",
        message: "Phone number is not valid",
      });
      setshowtoaster(true);
      return;
    }
    confirmOTP({
      accessToken: localStorage.getItem("dkz_user_token"),
      otp: inputotp,
      oldmobile: localStorage.getItem("dkz_user_mobile"),
      newmobile: newmobile,
    })
      .then((response) => {
        if (response.data.type === "success") {
          localStorage.setItem("dkz_user_mobile", newmobile.toString());
        }
        settoasterdata({
          type: response.data.type,
          message: response.data.message,
        });
        setshowtoaster(true);
        setshowverify(true);
        setTimeout(function () {
          props.changeShowEdit();
        }, 2000);
      })
      .catch(function (err) {
        settoasterdata({
          type: "error",
          message: "Something went wrong",
        });
        setshowtoaster(true);
      });
  };

  const changeShow = () => {
    props.changeShowEdit();
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="max-w-lg relative top-[20%] mx-auto bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="py-2">
              <h2 className="font-bold text-2xl">
                2-Step Verification Required
              </h2>
            </div>
            <div className="">
              <XMarkIcon
                className="w-8 hover:cursor-pointer"
                onClick={changeShow}
              />
            </div>
          </div>
          {!showverify ? (
            <>
              <div className="py-2">
                For better security, OTP is sent to a previously used number on
                your account.
              </div>
              <div className="py-2 font-bold">Select a mobile number</div>
              <div>
                <label>
                  <input
                    type="radio"
                    value={localStorage.getItem("dkz_user_mobile")!}
                  />{" "}
                  {localStorage.getItem("dkz_user_mobile")}
                </label>
              </div>
              <div className="">
                <button
                  className="uppercase bg-primary text-white w-full py-2 my-4"
                  onClick={requestForOTP}
                >
                  request otp
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="py-2 text-xl font-bold">Confirm your OTP</div>
              <div>
                <label>Enter your OTP</label>
                <input
                  type="number"
                  className="form-input"
                  onChange={changeForm}
                />
              </div>
              <div>
                <label>New Mobile Number</label>
                <input
                  type="number"
                  className="form-input"
                  onChange={changeForm1}
                />
              </div>
              <div className="">
                <button
                  className="uppercase bg-primary text-white w-full py-2 my-4"
                  onClick={confirmYOTP}
                >
                  confirm otp
                </button>
              </div>
            </>
          )}

          {showtoaster ? (
            <div className="py-1">
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
        </div>
      </div>
    </>
  );
};

const EditProfile = (props: editProfileProps) => {
  const [showeditmobile, setshoweditmobile] = useState<boolean>(false);
  const [collectdata, setcollectdata] = useState<profileProps>({
    _id: "",
    phone: 0,
    fullname: "",
    email: "",
    gender: "",
    birthday: "",
    altphone: 0,
  });
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    setcollectdata(props.data);
  }, []);
  const changeShow = () => {
    setshoweditmobile(!showeditmobile);
  };
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };
  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };
  const formSubmit = () => {
    console.log(collectdata);
    updateProfile(collectdata).then((res) => {
      settoasterdata({
        type: res.data.type,
        message: res.data.message,
      });
      setshowtoaster(true);
      setTimeout(() => {
        if (props.changeShowEdit) {
          props.changeShowEdit(collectdata);
        }
      }, 1500);
    });
  };
  return (
    <>
      {showeditmobile ? <EditMobile changeShowEdit={changeShow} /> : ""}
      <div className="border border-gray-300 px-20 py-10">
        <div className="border-b border-gray-300">
          <h2 className="py-6 font-bold text-2xl">Edit Profile Details</h2>
        </div>
        <div className="py-10">
          <div className="px-6">
            <div className="">
              <div className="grid grid-cols-2 items-center justify-between p-3 border border-gray-300">
                <div className="">
                  <label className="text-xs">Mobile Number*</label>
                  <br />
                  <div className="flex">
                    {collectdata.phone}
                    <CheckBadgeIcon className="w-6" />
                  </div>
                </div>
                <div className="">
                  <button
                    className="bg-white py-2 px-5 text-black border border-gray-300 text-sm font-bold block w-full uppercase"
                    onClick={changeShow}
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="py-2">
                <div className="form-item">
                  <label className="form-label mb-1">Full Name</label>
                  <div className="">
                    <input
                      className="w-full border-gray-300"
                      type="text"
                      name="fullname"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.fullname}
                      onChange={changeForm}
                    />
                  </div>
                </div>
              </div>

              <div className="py-2">
                <div className="form-item">
                  <label className="form-label mb-1">Email</label>
                  <div className="">
                    <input
                      className="w-full border-gray-300"
                      type="text"
                      name="email"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.email}
                      onChange={changeForm}
                    />
                  </div>
                </div>
              </div>

              <div className="py-2">
                <div className="form-item">
                  <label className="form-label mb-1">Gender</label>
                  <div className="flex items-center gap-x-2">
                    <div className="">
                      <label>
                        <input
                          className="border-gray-300 pr-2"
                          type="radio"
                          name="gender"
                          autoComplete="off"
                          checked={collectdata.gender == "male" ? true : false}
                          placeholder=""
                          value={"male"}
                          onClick={changeForm1}
                        />
                        Male
                      </label>
                    </div>
                    <div className="">
                      <label>
                        <input
                          className="border-gray-300"
                          type="radio"
                          name="gender"
                          checked={
                            collectdata.gender == "female" ? true : false
                          }
                          autoComplete="off"
                          placeholder=""
                          value={"female"}
                          onClick={changeForm1}
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <div className="form-item">
                  <label className="form-label mb-1">Birthday</label>
                  <div className="">
                    <input
                      className="w-full border-gray-300"
                      type="date"
                      name="birthday"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.birthday}
                      onChange={changeForm}
                    />
                  </div>
                </div>
              </div>

              <div className="py-4">
                <div className="form-item">
                  <label className="form-label mb-1">
                    Alternate mobile number
                  </label>
                  <div className="">
                    <input
                      className="w-full border-gray-300"
                      type="number"
                      name="altphone"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.altphone}
                      onChange={changeForm}
                    />
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
              <div className="flex py-3">
                <button
                  className="bg-orange-500 py-2 px-5 text-white font-bold block w-full uppercase"
                  onClick={formSubmit}
                >
                  save details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
