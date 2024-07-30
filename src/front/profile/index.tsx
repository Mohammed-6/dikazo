import React, { useEffect, useState } from "react";
import Layout from "../layout";
import ProfileLayout from "./layout";

import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import {
  MapPinIcon,
  RectangleGroupIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Layout>
        <div className="">
          <ProfileLayout>
            <Content />
          </ProfileLayout>
        </div>
      </Layout>
    </>
  );
};

const Content = () => {
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <Link href="profile/orders">
              <div className="border border-gray-300 h-[250px] flex items-center justify-center w-full duration-200 hover:bg-gray-100 hover:cursor-pointer">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div>
                      <Square3Stack3DIcon className="w-6" />
                    </div>
                  </div>
                  <h2 className="font-bold text-sm">Orders</h2>
                  <div className="text-xs">Check your order status</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="profile/">
              <div className="border border-gray-300 h-[250px] flex items-center justify-center w-full duration-200 hover:bg-gray-100 hover:cursor-pointer">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div>
                      <RectangleGroupIcon className="w-6" />
                    </div>
                  </div>
                  <h2 className="font-bold text-sm">Wishlist</h2>
                  <div className="text-xs">Your wishlist collections</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="profile/address">
              <div className="border border-gray-300 h-[250px] flex items-center justify-center w-full duration-200 hover:bg-gray-100 hover:cursor-pointer">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div>
                      <MapPinIcon className="w-6" />
                    </div>
                  </div>
                  <h2 className="font-bold text-sm">Addresses</h2>
                  <div className="text-xs">
                    Saved address for seamless checkout
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="profile/coupons">
              <div className="border border-gray-300 h-[250px] flex items-center justify-center w-full duration-200 hover:bg-gray-100 hover:cursor-pointer">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div>
                      <SwatchIcon className="w-6" />
                    </div>
                  </div>
                  <h2 className="font-bold text-sm">Coupons</h2>
                  <div className="text-xs">Manage coupons for discounts</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="profile/">
              <div className="border border-gray-300 h-[250px] flex items-center justify-center w-full duration-200 hover:bg-gray-100 hover:cursor-pointer">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div>
                      <UserIcon className="w-6" />
                    </div>
                  </div>

                  <h2 className="font-bold text-sm">Profile Details</h2>
                  <div className="text-xs">Change your profile details</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="h-[250px] flex items-center justify-center w-full">
            <button className="bg-orange-500 py-2 px-5 text-white font-bold block w-full uppercase">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
