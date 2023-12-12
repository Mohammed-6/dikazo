import React, { useState, useEffect } from "react";
import {
  arrUsertypeProps,
  userTypeListProps,
  addUserTypeProps,
  addUserProps,
} from "../types/user";
import {
  editUser,
  updateUser,
  createUserType,
  createUser,
  preLoadUser,
} from "../query/user";
import Layout from "../layout/index";
import { useRouter } from "next/router";
import { toaster } from "../types/basic";
import { Preloader, Toaster } from "../data/stuff";

const AddEdit = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const router = useRouter();
  const [usertypelist, setusertypelist] = useState(arrUsertypeProps);
  const [showaddusertype, setshowaddusertype] = useState<boolean>(false);
  const [collectdata, setcollectdata] = useState<addUserProps>({
    fullname: "",
    loginUsername: "",
    loginPassword: "",
    email: "",
    phone: "",
    userType: "",
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    preLoadUser().then((res) => {
      setusertypelist(res.data.data);
      setloading(true);
      if (router.query.editid !== undefined && router.query.editid !== "") {
        editUser(router.query.editid as string).then((res) => {
          setcollectdata(res.data.data);
        });
      }
    });
  }, [router.isReady]);

  const closeUserType = () => {
    setshowaddusertype(false);
  };

  const submitUserType = (data: userTypeListProps) => {
    setshowpreloader(true);
    setshowtoaster(true);
    settoasterdata({ type: data.type, message: data.message });
    setshowpreloader(false);
    //
    setusertypelist(data.data);
    setshowaddusertype(false);
  };

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeSelectForm = (e: React.FormEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    setshowpreloader(true);
    if (
      collectdata.fullname === "" ||
      collectdata.loginUsername === "" ||
      collectdata.loginPassword === "" ||
      collectdata.userType === ""
    ) {
      setshowtoaster(true);
      settoasterdata({ type: "error", message: "*Some fields are required" });
      setshowpreloader(false);
      return;
    }
    if (router.query.editid !== undefined && router.query.editid !== "") {
      setshowpreloader(true);
      updateUser(collectdata).then((res) => {
        setshowpreloader(false);
        //
        router.push("/admin/user");
      });
    } else {
      createUser(collectdata).then((res) => {
        router.push("/admin/user");
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
      {showaddusertype ? (
        <AddUserType
          closeAction={closeUserType}
          submitAction={submitUserType}
        />
      ) : (
        ""
      )}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="">Personal Details</div>
            <div className="">
              <button className="btn btn-primary" onClick={submitForm}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="p-1">
            <div className="grid grid-cols-4 gap-4">
              <div className="form-item">
                <label className="form-label mb-1">Fullname*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="fullname"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.fullname}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Login Username*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="loginUsername"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.loginUsername}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Login Password*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="loginPassword"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.loginPassword}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Email Id</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="email"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.email}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Phone</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="phone"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.phone}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="">
                <div className="flex gap-x-2 items-center">
                  <div className="w-10/12">
                    <div className="form-item">
                      <label className="form-label mb-1">User Type*</label>
                      <div className="">
                        {loading ? (
                          <select
                            name="userType"
                            value={collectdata.userType}
                            className="form-input"
                            onChange={changeSelectForm}
                          >
                            <option value="">Select</option>
                            {usertypelist !== undefined &&
                              usertypelist.map((dd) => (
                                <option value={dd._id}>{dd.userType}</option>
                              ))}
                          </select>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-2/12">
                    <button
                      className=""
                      onClick={() => setshowaddusertype(true)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div></div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddUserType = (props: addUserTypeProps) => {
  const [usertype, setusertype] = useState<string>("");

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setusertype(event.value);
  };

  const submitUserType = () => {
    createUserType(usertype).then((res) => props.submitAction(res.data));
  };

  const closePopup = () => {
    props.closeAction();
  };
  return (
    <>
      <div className="fixed top-20 bg-black/30 inset-0 z-50">
        <div className="">
          <div className="container mx-auto max-w-lg">
            <div className="card">
              <div className="card-header">Add User Type</div>
              <div className="card-body">
                <div className="form-item">
                  <label className="form-label mb-1">User Type</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="userName"
                      autoComplete="off"
                      placeholder=""
                      onKeyUp={changeForm}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={submitUserType}
                    >
                      Submit
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-danger" onClick={closePopup}>
                      Close
                    </button>
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
export default AddEdit;
