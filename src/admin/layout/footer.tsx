import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      <footer className="footer flex flex-auto items-center h-16 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between flex-auto w-full">
            <span>
              Copyright © 2023 <span className="font-semibold">Dikazo</span> All
              rights reserved.
            </span>
            <div className="">
              <a className="text-gray" href="/#">
                Term &amp; Conditions
              </a>
              <span className="mx-2 text-muted"> | </span>
              <a className="text-gray" href="/#">
                Privacy &amp; Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
