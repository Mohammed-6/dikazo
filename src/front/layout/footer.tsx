import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <FooterContent />
    </>
  );
};

const FooterContent = () => {
  return (
    <>
      <div className="bg-black">
        <div className="p-standard py-[50px]">
          <div className="grid grid-cols-4">
            <div className="">
              <ul>
                <li className="pb-5">
                  <img
                    src="https://dikazo.com/assets/images/footer-logo.png"
                    className="h-16 w-32"
                  />
                </li>
                <li className="pb-5">
                  <img
                    src="https://dikazo.com/assets/images/Play-Store.png"
                    className="h-14"
                  />
                </li>
                <li className="pb-5">
                  <img
                    src="https://dikazo.com/assets/images/App-Store.png"
                    className="h-14"
                  />
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-gray-300 font-semibold text-md pb-5">
                Contact Info
              </h2>
              <ul className="text-white">
                <li className="pb-3">
                  <a href="">+91 7702097321</a>
                </li>
                <li className="pb-3">
                  <a href="">support@dikazo.com</a>
                </li>
                <li className="pb-3 font-bold">
                  <a href="">Address</a>
                </li>
                <li className="pb-3">
                  <a href="">
                    Third Floor, Samridhi Vasyam,
                    <br />
                    D No 1, 98/9/3/23, Image Gardens Rd,
                    <br />
                    above Axis bank, Madhapur,
                    <br />
                    Hyderabad, Telangana 500081
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-gray-300 font-semibold text-md pb-5">Help</h2>
              <ul className="text-white">
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    About Us
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Shipping Policy
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Return & Refund Policy
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    FAQ's
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-gray-300 font-semibold text-md pb-5">
                Account
              </h2>
              <ul className="text-white">
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Login
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Seller Login
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    My Account
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    My Orders
                  </a>
                </li>
                <li className="pb-3">
                  <a
                    className="hover:text-primary duration-100 selection:bg-primary"
                    href=""
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="px-4 border-t m-10 border-gray-200 pb-4">
          <div className="py-5 flex justify-between">
            <div className="text-gray-400 text-sm">Copyright © 2023 Dikazo</div>
            <div className="">
              <ul className="flex gap-x-3 text-white text-2xl">
                <li>
                  <a
                    href="https://www.facebook.com/TheOfficialDikazo/"
                    target="_blank"
                  >
                    <FaFacebookSquare className="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/Dikazo_Official?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                    target="_blank"
                  >
                    <FaTwitterSquare className="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/dikazosolutions"
                    target="_blank"
                  >
                    <FaLinkedin className="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCAUL56Xg9IkUBipqLXBtfOA"
                    target="_blank"
                  >
                    <FaYoutubeSquare className="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dikazo_official/?hl=en"
                    target="_blank"
                  >
                    <FaInstagramSquare className="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
