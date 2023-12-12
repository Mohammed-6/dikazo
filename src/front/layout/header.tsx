import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import menuItems from "../data/menu.json";
import { headerProp, subHeaderProp } from "../types/layout";
import Link from "next/link";
import LoginSetup from "../category/product";

const Header = () => {
  return (
    <>
      <SubHeader />
      <SearchHeader />
      <MenuHeader />
    </>
  );
};

const SubHeader = () => {
  return (
    <>
      <div className="bg-gray-200 text-xs py-2 font-semibold text-gray-700">
        <div className="flex justify-between p-standard">
          <div className="">Download App</div>
          <div className="">
            <div className="flex justify-around gap-6">
              <div className="">Seller Login</div>
              <div className="">Become a Seller</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchHeader = () => {
  const [showlogin, setshowlogin] = useState<boolean>(false);
  const showLogin = () => {
    setshowlogin(!showlogin);
  };
  return (
    <>
      {showlogin ? <LoginSetup hidePopup={showLogin} /> : ""}
      <div className="">
        <div className="grid grid-cols-2 p-standard items-center">
          <div className="flex items-center gap-x-6">
            <div className="col-span-2">
              <img
                src="https://dikazo.com/assets/images/dikazo-logo-main.png"
                className="h-16 w-32"
              />
            </div>
            <div className="col-span-10 w-full relative">
              <input
                type="text"
                className="bg-gray-200 px-2 py-2 rounded-md w-full"
                placeholder="Search..."
              />
              <div className="absolute top-2 right-3">
                <MagnifyingGlassIcon className="w-6 stroke-gray-300" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-3 font-semibold text-sm">
            <div className="pr-4">
              <Link href="/cart">
                <div className="flex items-center gap-x-1">
                  <div className="">
                    <ShoppingBagIcon className="w-5" />
                  </div>
                  <div className="">Cart</div>
                </div>
              </Link>
            </div>
            <div className="pr-4">
              <div className="flex items-center gap-x-1">
                <div className="">
                  <HeartIcon className="w-5" />
                </div>
                <div className="">Wishlist</div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-x-1">
                <div className="">
                  <UserIcon className="w-5" />
                </div>
                <div className="">Profile</div>
              </div>
              {/* <button
                onClick={showLogin}
                className="bg-primary text-white px-4 py-3 rounded-md"
              >
                Login / SignUp
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuHeader = () => {
  return (
    <>
      <div className="border-t border-t-gray-200 py-3">
        <ul className="flex p-standard">
          {menuItems.map((dd) => (
            <MenuSubHeader menudata={dd} />
          ))}
        </ul>
      </div>
    </>
  );
};

type menuSubHeaderProps = {
  menudata: { menuName: string; slug: string; menu: subHeaderProp[] };
};
const MenuSubHeader = (props: menuSubHeaderProps) => {
  return (
    <>
      <li className="group">
        <a
          className="font-semibold py-3 px-5 text-sm border-b-0 hover:border-b-[3px] delay-100 border-b-primary relative z-20"
          href=""
        >
          {props.menudata.menuName}
        </a>
        <div className="fixed top-[15%] pt-10 z-10 left-10 min-w-[900px] max-h-screen h-auto bg-white hidden group-hover:block rounded-md shadow-lg">
          <div
            className={`columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:${
              props.menudata.menu.length > 2 ? "columns-4" : "columns-2"
            }`}
          >
            {props.menudata.menu.map((mn) => {
              return (
                <>
                  <div className="p-2">
                    <Link
                      href={"/" + props.menudata.slug}
                      className="font-semibold text-primary text-sm"
                    >
                      {mn.menuName}
                    </Link>
                    <div className="grid">
                      {mn.menu.map((mx) => {
                        return (
                          <>
                            <Link
                              href={"/" + mx.slug}
                              className="font-semibold text-black py-1 text-sm"
                            >
                              {mx.menuName}
                            </Link>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
            <div className=""></div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Header;
