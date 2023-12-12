import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { serverHeader, serverURL, Preloader } from "./data/stuff";

import { loginProps, branchProps } from "./types/login";
import { toaster } from "./types/basic";
import { checkLogin } from "./query/login";
const Login = () => {
  const router = useRouter();
  const clinicid = router.query.clinicid as string;
  const [collectdata, setcollectdata] = useState<loginProps>({
    loginUsername: "",
    loginPassword: "",
  });
  const [selectbranch, setselectbranch] = useState<string>("");
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  useEffect(() => {}, [router.isReady]);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    let event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    setshowpreloader(true);
    setshowtoaster(false);

    if (collectdata.loginUsername == "" || collectdata.loginPassword == "") {
      settoasterdata({
        type: "error",
        message: "Username or password required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }

    checkLogin(collectdata).then((response) => {
      if (response.data.type == "success") {
        localStorage.setItem("clinicId", clinicid);
        localStorage.setItem("clinicUser", response.data.data.id);
        localStorage.setItem("clinicBranch", selectbranch);
        localStorage.setItem(
          "adminUserData",
          JSON.stringify(response.data.data)
        );
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
        router.push("/admin/user");
      } else {
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
      }
    });
  };

  return (
    <>
      <div className="">
        {showpreloader ? <Preloader /> : ""}
        <main className="">
          <div className="h-full">
            <div className="container mx-auto flex justify-center min-w-0 h-full">
              <div className="card min-w-[320px] md:min-w-[450px] card-shadow">
                <div className="card-body md:p-10">
                  <div className="text-center">
                    <div className="logo w-auto">
                      <img
                        className="mx-auto w-[200px]"
                        src="/images/logo.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 text-center">
                      <h3 className="mb-1 font-semibold text-2xl">Welcome!</h3>
                      <p>Please enter your credentials to sign in!</p>
                    </div>
                    <div>
                      <form action="#">
                        <div className="form-container">
                          <div className="form-item">
                            <label className="form-label mb-1">User Name</label>
                            <div className="">
                              <input
                                className="form-input"
                                type="text"
                                name="loginUsername"
                                autoComplete="off"
                                placeholder="User Name"
                                defaultValue={collectdata.loginUsername}
                                onChange={changeForm}
                              />
                            </div>
                          </div>
                          <div className="form-item">
                            <label className="form-label mb-1">Password</label>
                            <div className="">
                              <span className="input-wrapper ">
                                <input
                                  className="form-input"
                                  type="password"
                                  name="loginPassword"
                                  autoComplete="off"
                                  placeholder="Password"
                                  defaultValue={collectdata.loginPassword}
                                  onChange={changeForm}
                                />
                                <div className="input-suffix-end">
                                  <span className="cursor-pointer text-xl"></span>
                                </div>
                              </span>
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
                          <div className="py-3 text-center">
                            <a
                              onClick={submitForm}
                              className="w-full btn"
                              type="button"
                            >
                              Sign In
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
