import React, { useEffect, useState, useContext, createContext } from "react";

import { serverURL } from "@/src/admin/data/stuff";

// Create the context
export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetchHeaderData();
  }, []);
  // Function to fetch header data
  const fetchHeaderData = async () => {
    try {
      // Replace with your actual API calls
      const categoriesResponse = await fetch(serverURL + "/v2/load-header");
      const categoriesData = await categoriesResponse.json();
      const dd = categoriesData.data;
      setCategories(dd.menu);
      setSearchData(dd.keyword);
    } catch (error) {
      console.error("Failed to fetch header data:", error);
    }
  };
  return (
    <>
      <HeaderContext.Provider value={{ categories, searchData }}>
        {children}
      </HeaderContext.Provider>
    </>
  );
};
