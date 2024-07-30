import React, { useEffect, useState } from "react";

import { indexProp } from "../types/layout";
import Link from "next/link";

const ProfileLayout = ({ children }: indexProp) => {
  return (
    <>
      <Content>{children}</Content>
    </>
  );
};

const Content = ({ children }: indexProp) => {
  return (
    <>
      <div className="max-w-5xl mx-auto py-20">
        <div className="flex items-center justify-between border-b border-gray-300">
          <div className="">
            <h2 className="font-bold text-xl">Account</h2>
            <div className="">Rehan Khan</div>
          </div>
          <div className="">
            <Link
              href="/profile/"
              className="text-white px-4 py-1 bg-primary border border-white rounded-sm"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-2 border-r border-gray-300">
            <div className="pr-7">
              <div className="border-b border-gray-300 py-6">
                <div className="">
                  <Link href="profile/overview">Overview</Link>
                </div>
              </div>
              <div className="border-b border-gray-300 py-6">
                <div className="grid">
                  <div className="text-xs text-gray-600 pb-2 uppercase">
                    Orders
                  </div>
                  <Link href="profile/orders">Orders & Returns</Link>
                </div>
              </div>
              <div className="border-b border-gray-300 py-6">
                <div className="grid">
                  <div className="text-xs text-gray-600 pb-2 uppercase">
                    Credits
                  </div>
                  <Link href="profile/coupons">Coupons</Link>
                </div>
              </div>
              <div className="border-b border-gray-300 py-6">
                <div className="grid">
                  <div className="text-xs text-gray-600 pb-2 uppercase">
                    Accounts
                  </div>
                  <Link href="profile">Profile</Link>
                  <Link href="profile/address">Addresses</Link>
                </div>
              </div>
              <div className="border-b border-gray-300 py-6">
                <div className="grid">
                  <div className="text-xs text-gray-600 pb-2 uppercase">
                    Legal
                  </div>
                  <Link href="profile/overview">Terms of Use</Link>
                  <Link href="profile/overview">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
