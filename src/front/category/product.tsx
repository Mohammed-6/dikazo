import {
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { productGridProps } from "../types/category";
import {
  AlertUserNotification,
  Preloader,
  calculatePercentage,
  imageURL,
} from "@/src/admin/data/stuff";
import { useEffect, useState } from "react";
import { confirmOtpValv, generateOTPValv } from "../query/customer";
import { AfterOtpProps, SigninProps } from "../types/customer";

export const ProductGrid = (props: productGridProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="group shadow-none group-hover:shadow-lg duration-100 bg-white rounded-lg m-2">
        <div className="">
          <div className="relative z-0 group-hover:cursor-pointer">
            <a href={`/product/` + props.data?.seoMetaTags.url}>
              <img
                src={`${imageURL + props.data?.productImages.thumbnail}`}
                className="rounded-tl-lg rounded-tr-lg"
              />
            </a>
            <div className="absolute bg-red-500 top-3 left-3 text-xs px-2 py-1 text-white z-10 rounded-full font-semibold">
              {calculatePercentage(
                props.data?.productStocks?.sellingPrice,
                props.data?.productStocks?.unitPrice
              )}
              % OFF
            </div>
            <div className="absolute inset-0 bg-black/10 z-10 rounded-tl-lg rounded-tr-lg duration-100 opacity-0 group-hover:opacity-100"></div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 duration-300 z-20">
              <div className="flex items-center gap-x-2">
                <div className="">
                  <ShoppingBagIcon className="w-12 rounded-full bg-white p-3 pb-3" />
                </div>
                <div className="">
                  <HeartIcon className="w-12 rounded-full bg-white p-3 pb-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="text-xs">
              {props.data?.brd !== undefined && props.data?.brd.length > 0
                ? props.data.brd[0].name
                : ""}
            </div>
            <div className="textmd font-semibold">
              <a href={`/product/` + props.data?.seoMetaTags.url}>
                {props.data?.productInformation.name}
              </a>
            </div>
            <div className="flex items-center font-bold gap-x-2">
              <div className="text-md text-gray-300">
                <del>₹{props.data?.productStocks?.unitPrice}</del>
              </div>
              <div className="text-primary text-md">
                ₹{props.data?.productStocks?.sellingPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductGridHM = () => {
  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="group">
          <div className="relative z-0 group-hover:cursor-pointer">
            <img
              src="https://d1t3sch6xgtfd4.cloudfront.net/3utAUGSZfWCQGHdfqToqUg5990paiOGKo1d0FYHfdAWf0bCumm5vpjDqbwI2Bf6HgWlaLNUqMlbRMpXw9zznrfJdzWHKFsCIJ82N.png"
              className="rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div className="p-2 text-center">
            <div className="textmd font-semibold">
              <Link href="product/mens-light-weight-leather-belt">
                Men's light weight leather belt
              </Link>
            </div>
            <div className="flex items-center justify-center font-bold gap-x-2 py-3">
              <div className="text-primary text-md">₹427</div>
              <div className="text-md text-gray-300">
                <del>₹599</del>
              </div>
              <div className="bg-red-500 text-xs px-2 py-1 text-white z-10 rounded-full font-semibold">
                67% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type loginPopupprops = {
  hidePopup: Function;
};
const LoginSetup = (props: loginPopupprops) => {
  const [showverified, setshowverified] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<any>({
    isShow: false,
    type: "",
    message: "",
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const hidePopup = () => {
    props.hidePopup();
  };

  const setTaoster = (dd: any) => {
    settoasterdata({
      ...toasterdata,
      isShow: true,
      type: dd.type,
      message: dd.message,
    });
    setTimeout(() => {
      settoasterdata({ ...toasterdata, isShow: false });
    }, 3000);
    if (dd.close) {
      setTimeout(() => {
        hidePopup();
        location.reload();
      }, 1500);
    }
  };
  const showVerified = () => {
    setshowverified(true);
  };
  const changeNumber = () => {
    setshowverified(false);
  };
  const showLoader = (dd: boolean) => {
    setshowpreloader(dd);
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
      {showpreloader ? <Preloader /> : ""}
      <div className="fixed inset-0 bg-black/50 z-30">
        <div className="grid grid-cols-12">
          <div className="col-start-9 col-span-4">
            <div className="bg-white h-screen shadow-2xl p-4">
              <div className="flex justify-end">
                <XMarkIcon
                  className="w-10 hover:cursor-pointer"
                  onClick={hidePopup}
                />
              </div>
              <div className="">
                <img
                  src="https://dikazo.com/assets/images/dikazo-logo-main.png"
                  className="h-16 w-32"
                />
                {showverified ? (
                  <AfterOtpSend
                    setTaoster={setTaoster}
                    changeNumber={changeNumber}
                    showLoader={showLoader}
                  />
                ) : (
                  <SignInWithNumber
                    setTaoster={setTaoster}
                    showVerified={showVerified}
                    showLoader={showLoader}
                  />
                )}
                {/* <SigninWithPassword /> */}
                {/* <ForgotPassword /> */}
                {/* <ForgotPasswordVerification /> */}
                {/* <ResetPassword /> */}
                <div className="text-xs">
                  By continuing, I agree to the <a href="/">Terms of Use</a>
                  &nbsp;&&nbsp;
                  <a href="/">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SignInWithNumber = (props: SigninProps) => {
  const [phone, setphone] = useState<any>("");
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setphone(evt.value);
  };

  const generateOTP = () => {
    if (phone.length > 10 || phone.length < 10) {
      props.setTaoster({
        type: "error",
        message: "Phone Number must be at least 10 characters",
      });
      return;
    }
    props.showLoader(true);
    const colte = { phone: phone };
    generateOTPValv(colte).then(function (res) {
      localStorage.setItem("dkz_user_token", res.data.data);
      localStorage.setItem("dkz_user_mobile", phone);
      props.setTaoster({
        type: res.data.type,
        message: res.data.message,
        close: false,
      });
      props.showVerified();
      props.showLoader(false);
    });
  };
  return (
    <>
      <h2 className="py-3 font-bold text-xl">
        Sign in or register to continue
      </h2>
      <div className="">
        <div className="mb-1">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Enter your mobile number
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            placeholder="Enter 10 digits number"
            onChange={changeForm}
          />
        </div>
      </div>
      <div className="py-3">
        <button
          className="bg-primary w-full text-white py-2 text-sm rounded-md"
          onClick={generateOTP}
        >
          Next
        </button>
      </div>
    </>
  );
};
const AfterOtpSend = (props: AfterOtpProps) => {
  const [seconds, setSeconds] = useState<number>(120);
  const [otp, setotp] = useState<any>("");
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setotp(evt.value);
  };
  const getNewCode = () => {
    props.showLoader(true);
    const colte = { phone: localStorage.getItem("dkz_user_mobile") };
    generateOTPValv(colte).then(function (res) {
      localStorage.setItem("dkz_user_token", res.data.data);
      props.setTaoster({
        type: res.data.type,
        message: res.data.message,
        close: false,
      });
      props.showLoader(false);
    });
  };
  const confirmOtp = () => {
    props.showLoader(true);
    const colte = {
      phone: localStorage.getItem("dkz_user_mobile"),
      accessToken: localStorage.getItem("dkz_user_token"),
      otp: otp,
    };
    confirmOtpValv(colte).then(function (res) {
      if (res.data.verified) {
        props.setTaoster({
          type: res.data.type,
          message: res.data.message,
          close: true,
        });
      } else {
        props.setTaoster({
          type: res.data.type,
          message: res.data.message,
          close: false,
        });
      }
      props.showLoader(false);
    });
  };
  const changeNumber = () => {
    props.changeNumber();
  };
  return (
    <>
      <div className="">
        <div className="mb-1">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Enter the code we just sent to <br />
            IN +91 {localStorage.getItem("dkz_user_mobile")}{" "}
            <button className="text-blue-500" onClick={changeNumber}>
              &nbsp;Change
            </button>
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            placeholder=""
            onChange={changeForm}
          />
          <div className="py-2">
            {seconds === 0 ? (
              <button className="text-blue-500" onClick={getNewCode}>
                Get new code
              </button>
            ) : (
              `Re-generate in ${seconds}s`
            )}
          </div>
        </div>
        <div className="py-3">
          <button
            className="bg-primary w-full text-white py-2 text-sm rounded-md"
            onClick={confirmOtp}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const SigninWithPassword = () => {
  return (
    <>
      <div className="">
        <div className="mb-1">
          <div className="flex justify-between">
            <div className="">
              <label className="block mb-1 text-md font-bold text-gray-900">
                Password
              </label>
            </div>
            <div className="">
              <button className="text-blue-500">Forgot Password</button>
            </div>
          </div>

          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            placeholder=""
          />
        </div>
        <div className="py-3">
          <button className="bg-primary w-full text-white py-2 text-sm rounded-md">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};
const ForgotPassword = () => {
  return (
    <>
      <div className="">
        <h2 className="pt-3 font-bold text-xl">Forgot Password</h2>
        <div className="text-sm pb-3">
          Enter the mobile phone number associated with your account.
        </div>
        <div className="">
          <div className="mb-1">
            <label className="block mb-1 text-sm font-bold text-gray-900">
              Enter phone number
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
        </div>
        <div className="py-3">
          <button className="bg-primary w-full text-white py-2 text-sm rounded-md">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const ForgotPasswordVerification = () => {
  return (
    <>
      <div className="">
        <h2 className="pt-3 font-bold text-xl">Verification required</h2>
        <div className="text-sm pb-3">
          To continue, complete this verification step. We've sent an OTP to the
          mobile number +918686433748. Please enter it below to complete
          verification.
        </div>
        <div className="">
          <div className="mb-1">
            <label className="block mb-1 text-sm font-bold text-gray-900">
              Enter OTP
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
        </div>
        <div className="py-3">
          <button className="bg-primary w-full text-white py-2 text-sm rounded-md">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const ResetPassword = () => {
  return (
    <>
      <div className="">
        <h2 className="pt-3 font-bold text-xl">Password reset</h2>
        <div className="text-sm pb-3">
          To continue, complete this verification step. We've sent an OTP to the
          mobile number +918686433748. Please enter it below to complete
          verification.
        </div>
        <div className="">
          <div className="mb-1">
            <label className="block mb-1 text-sm font-bold text-gray-900">
              New Password
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
          <small>Passwords must be at least 6 characters.</small>
        </div>
        <div className="">
          <div className="mb-1">
            <label className="block mb-1 text-sm font-bold text-gray-900">
              Password again
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder=""
            />
          </div>
        </div>
        <div className="py-3">
          <button className="bg-primary w-full text-white py-2 text-sm rounded-md">
            Save changes and sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginSetup;
