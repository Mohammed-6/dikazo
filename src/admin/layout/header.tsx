import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
const create = axios.create();
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { userDetails } from "../login";

import { FaBars, FaTimes } from "react-icons/fa";

import { serverURL } from "../data/stuff";
import {
  adminUserDataProps,
  permissionsProps,
  permissionProps,
  headerMenuProps,
} from "../types/layout";
const allData: headerMenuProps[] = [
  {
    name: "User",
    link: "/user",
    menu: [],
  },
  {
    name: "Patient",
    link: "/patient",
    menu: [],
  },
  {
    name: "Dispense",
    link: "/dispense",
    menu: [],
  },
  {
    name: "Case History",
    link: "/cases",
    menu: [],
  },
  {
    name: "Follow Up",
    link: "/followups",
    menu: [],
  },
  {
    name: "Accounts",
    link: "/accounts",
    menu: [],
  },
  {
    name: "Messages",
    link: "/message",
    menu: [],
  },
  {
    name: "Change Password",
    link: "/change-password",
    menu: [],
  },
  //   {
  //     name: "Customers",
  //     link: "/admin/customer",
  //     menu: [
  //       {
  //         name: "Add Customer",
  //         link: "/admin/customer/add-customer",
  //       },
  //     ],
  //   },
];

type mainMenuProps = {
  menu: any;
};

const Header = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [showsupport, setshowsupport] = useState(false);
  const [menudata, setmenudata] = useState<adminUserDataProps>({
    email: "",
    fullname: "",
    id: "",
    permissions: [],
    phone: "",
    username: "",
  });
  const [getprofile, setprofile] = useState("/images/logo.png");
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // if (localStorage.getItem("clinicUser") == "") {
      //   router.push("/login/" + localStorage.getItem("clinicId"));
      //   return;
      // }
      setmenudata(JSON.parse(localStorage.getItem("adminUserData")!));
      setloading(true);
      // set profile
      if (
        localStorage.getItem("profilePicture") !== "" &&
        localStorage.getItem("profilePicture") !== undefined
      ) {
        setprofile(serverURL + "/" + localStorage.getItem("profilePicture"));
      }
    }
  }, []);

  useEffect(() => {}, []);
  const logout = () => {
    router.push("/login/" + localStorage.getItem("clinicId"));
    localStorage.setItem("clinicUser", "");
    localStorage.setItem("adminUserData", "");
  };
  return (
    <>
      <div>
        <div className="bg-primary text-white shadow-lg flex justify-between py-4 px-3 items-center">
          <div className="">
            <div className="md:hidden lg:flex hidden">
              <img
                src="/images/logo-white.png"
                className="h-[55px] w-auto"
                alt=""
                width="55"
                height="55"
              />
            </div>
            <div className="md:flex lg:hidden">
              <Sidebar />
            </div>
          </div>
          <div className="">
            <div className="lg:hidden md:flex">
              <img
                src="/images/logo-white.png"
                className="h-[55px] w-auto"
                alt=""
                width="55"
                height="55"
              />
            </div>

            <div className="hidden lg:flex">
              <DeskMenu />
            </div>
          </div>
          <div className="relative">
            <div className="header-action-item flex items-center gap-2">
              <span
                className="avatar avatar-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  minWidth: "32px",
                  lineHeight: "32px",
                  fontSize: "12px",
                }}
              >
                <img
                  className="avatar-img rounded-full hidden"
                  src="/images/logo-white.png"
                  loading="lazy"
                />
              </span>
              <div className="hidden md:block text-white">
                {loading ? (
                  <>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => setshowsupport(!showsupport)}
                    >
                      <div className="text-xs capitalize">
                        {menudata?.username}
                      </div>
                      <div className="font-bold">{menudata?.fullname}</div>
                    </div>
                    {showsupport ? (
                      <div className="absolute top-10 right-0 w-[200px] z-20">
                        <ul className="bg-white shadow-lg p-2 rounded-md">
                          <li className="py-1 hover:cursor-pointer">
                            {/* <Link href="/support">Support</Link> */}
                          </li>
                          <li className="border-t py-1 hover:cursor-pointer">
                            <a onClick={() => logout()}>Logout</a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DeskMenu = () => {
  const router = useRouter();
  // const [menudata, setmenudata] = useAtom(userDetails);
  const [loading, setloading] = useState(false);
  const [menudata, setmenudata] = useState<adminUserDataProps>({
    email: "",
    fullname: "",
    id: "",
    permissions: [],
    phone: "",
    username: "",
  });
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (localStorage.getItem("clinicUser") == "") {
        router.push("/login/" + localStorage.getItem("clinicId"));
        return;
      }
      const udata: adminUserDataProps = JSON.parse(
        localStorage.getItem("adminUserData")!
      );
      setmenudata(udata);
      setloading(true);
    }
  }, []);
  return (
    <>
      <div className="w-full px-[10px]">
        <div className="flex">
          {allData.map((dd) => {
            return (
              <>
                <div className="text-white text-lg px-3 border-b-0 duration-50 pb-2 border-white hover:border-b-2 hover:pb-[6px]">
                  {dd.name}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Sidebar = () => {
  const [show, setshow] = useState(false);
  const [menu, setmenu] = useState<adminUserDataProps>({
    email: "",
    fullname: "",
    id: "",
    permissions: [],
    phone: "",
    username: "",
  });
  const [loading, setloading] = useState(false);
  const [getprofile, setprofile] = useState("/images/logo.png");
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setmenu(JSON.parse(localStorage.getItem("adminUserData")!));
      setloading(true);
      // set profile
      if (
        localStorage.getItem("profilePicture") !== "" &&
        localStorage.getItem("profilePicture") !== undefined
      ) {
        // setprofile(serverURL + "/" + localStorage.getItem("profilePicture"));
      }
    }
    // document.addEventListener("keydown", handleHideDropdown, true);
    // document.addEventListener("click", handleClickOutside, true);

    // return () => {
    //   document.removeEventListener("keydown", handleHideDropdown, true);
    //   document.removeEventListener("click", handleClickOutside, true);
    // };
  }, []);

  const ref = useRef(null);
  //   const handleHideDropdown = (event) => {
  //     if (event.key === "Escape") {
  //       //   console.log("escape");
  //       setshow(false);
  //     }
  //   };
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       //   console.log("outside");
  //       setshow(false);
  //     }
  //   };
  const outSideClick = () => {
    setshow(true);
  };
  return (
    <>
      <FaBars fill="black" onClick={outSideClick} className="text-xl" />
      <div
        className={`fixed inset-0 z-20 h-full w-[300px] sm:w-[450px] ease-in-out duration-300 bg-white shadow-lg ${
          show ? "translate-x-[0px]" : "-translate-x-full"
        }`}
      >
        <div className="">
          <div
            ref={ref}
            className="w-[300px] sm:w-[400px] relative h-auto py-[20px] px-[3%] "
          >
            <img
              src={getprofile}
              className="h-[55px] w-auto mb-5"
              alt=""
              width="55"
              height="55"
            />
            {show ? (
              <div className="absolute -right-12 top-6 z-[20]">
                <div
                  className="text-white py-2 px-3 bg-red-500 rounded-md"
                  onClick={() => setshow(false)}
                >
                  <FaTimes className="h-6" />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="block">
              {allData.map((data) => (
                <div className="py-3">
                  <span className="text-black font-semibold text-lg">
                    <Link href={"/" + data.link}>{data.name}</Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
