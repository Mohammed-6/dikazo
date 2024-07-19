import React, { useState, useEffect } from "react";
import {
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { deleteProps, toaster } from "../types/basic";

// export const Breadcrumb = (props) => {
//   return (
//     <>
//       <div className="py-2">
//         <div className="flex justify-start relative">
//           <div className="block">
//             <ul className="list-none m-0 p-0 flex justify-center">
//               {props.alldata.subtitle.map((dd, k) => {
//                 return (
//                   <>
//                     {k === 0 ? (
//                       <li>
//                         <div className="text-gray-500 font-bold">
//                           <Link href={dd.link}>{dd.title}</Link>
//                         </div>
//                       </li>
//                     ) : (
//                       <li>
//                         <div
//                           className={`flex ${
//                             k + 1 === props.alldata.subtitle.length
//                               ? "text-gray-500"
//                               : "text-gray-500"
//                           } items-center  font-bold`}
//                         >
//                           <span className="">
//                             <ChevronRightIcon
//                               className={`w-3 fill-gray-500 mx-2`}
//                             />
//                           </span>
//                           <Link href={dd.link}>{dd.title}</Link>
//                         </div>
//                       </li>
//                     )}
//                   </>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export const Toaster = (props: toaster) => {
  const propsdata = props;
  const [showtoaster, setshowtoaster] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      // setshowtoaster(false);
    }, 3000);
  }, []);
  return (
    <>
      <div
        className={`fixed right-10 top-10 ${showtoaster ? "block" : "hidden"}`}
      >
        <div
          className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div
            className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8  ${
              propsdata.type == "success"
                ? "bg-green-700 text-green-100"
                : propsdata.type == "error"
                ? "bg-red-500 text-red-100"
                : propsdata.type == "info"
                ? "bg-orange-500 text-orange-100"
                : "bg-orange-500 text-orange-100"
            } rounded-lg`}
          >
            {propsdata.type == "success" ? (
              <CheckIcon className="w-6" />
            ) : propsdata.type == "info" ? (
              <ExclamationTriangleIcon className="w-6" />
            ) : propsdata.type == "error" ? (
              <XMarkIcon className="w-6" />
            ) : (
              <XMarkIcon className="w-6" />
            )}
          </div>
          <div className="ml-3 text-sm font-semibold w-52 block">
            {propsdata.message}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => setshowtoaster(false)}
          >
            <XMarkIcon className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export function calculatePercentage(part: number, whole: number) {
  if (isNaN(part) || isNaN(whole) || whole === 0) {
    // return 'Invalid input. Please provide valid numbers.';
    return 0;
  }

  const percentage: any = (part / whole) * 100;
  return 100 - percentage.toFixed(0); // Round the percentage to 2 decimal places
}

export const Preloader = () => {
  return (
    <>
      <div className="bg-gray-200/50 fixed inset-0 z-50 flex justify-center items-center">
        <div className="bg-white p-10 shadow-md rounded-xl relative">
          <svg
            className="w-12 h-12 animate-spin text-indigo-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.75V6.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M17.1266 6.87347L16.0659 7.93413"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M19.25 12L17.75 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M17.1266 17.1265L16.0659 16.0659"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 17.75V19.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7.9342 16.0659L6.87354 17.1265"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M6.25 12L4.75 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7.9342 7.93413L6.87354 6.87347"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export const MiniPreLoader = () => {
  return (
    <>
      <div className="absolute preloader1 right-0 top-0 bg-white p-2">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export const calculateAge = (dob: string) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const AlertAction = (props: deleteProps) => {
  return (
    <>
      <main className="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
        <div className="fixed inset-0 z-50 px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-black/50 opacity-15 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex items-center">
              <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <ExclamationTriangleIcon className="w-8" />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">{props.heading}</p>
                <p className="text-sm text-gray-700 mt-1">{props.paragraph}</p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                onClick={() => props.successAction()}
              >
                {props.successButtonText}
              </button>
              <button
                onClick={() => props.cancelAction()}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const AlertUserNotification = (props: any) => {
  const propsdata = props;
  return (
    <>
      <div className="">
        <div className="fixed inset-0 z-50 h-36">
          <div className="bg-white shadow-lg mx-auto relative top-3 max-w-sm p-3 rounded-md">
            <div className="flex items-center">
              <div
                className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8  ${
                  propsdata.type == "success"
                    ? "bg-green-700 text-green-100"
                    : propsdata.type == "error"
                    ? "bg-red-500 text-red-100"
                    : propsdata.type == "info"
                    ? "bg-orange-500 text-orange-100"
                    : "bg-orange-500 text-orange-100"
                } rounded-lg`}
              >
                {propsdata.type == "success" ? (
                  <CheckIcon className="w-6" />
                ) : propsdata.type == "info" ? (
                  <ExclamationTriangleIcon className="w-6" />
                ) : propsdata.type == "error" ? (
                  <XMarkIcon className="w-6" />
                ) : (
                  <XMarkIcon className="w-6" />
                )}
              </div>
              <div className="ml-3 text-lg font-semibold w-auto block">
                {propsdata.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const serverHeader = {
  "Content-Type": "application/json",
};

export const gstStates = {
  "01": "Jammu And Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "25": "Daman And Diu (old)",
  "26": "Dadra & Nagar Haveli and Daman & Diu",
  "27": "Maharashtra",
  "28": "Andhra Pradesh (Old)",
  "29": "Karnataka",
  "30": "Goa",
  "31": "Lakshadweep",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "34": "Puducherry",
  "35": "Andaman And Nicobar islands",
  "36": "Telangana",
  "37": "Andhra Pradesh",
  "38": "Ladakh",
  "97": "Other Territory",
};
// export const serverURL = "https://cos-api.exllab.in";
export const serverURL = "http://localhost:4004";

export const imageURL = "http://localhost:4004/";
