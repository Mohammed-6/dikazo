import React, { useEffect, useState } from "react";

import Header from "./header";
import Footer from "./footer";
import { HeaderProvider } from "./HeaderContext";

import { indexProp } from "../types/layout";

const Layout = ({ children }: indexProp) => {
  return (
    <>
      <React.StrictMode>
        <HeaderProvider>
          <Header />
          {children}
          <Footer />
        </HeaderProvider>
      </React.StrictMode>
    </>
  );
};

export default Layout;
