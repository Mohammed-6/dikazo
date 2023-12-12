import React, { useState, useEffect } from "react";
import {
  addEditProps,
  arrcategoryProps,
  categoryProps,
} from "../../types/product/category";
import { listCategory, deleteCategory } from "../../query/product/category";
import Layout from "../../layout/index";
import Link from "next/link";

import { deleteProps } from "../../types/basic";
import { AlertAction } from "../../data/stuff";
import AddEdit from "./addEdit";
const Category = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [categorylist, setcategorylist] = useState(arrcategoryProps);
  const [showaddedit, setshowaddedit] = useState<boolean>(false);
  const [deleteaction, setdeleteaction] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<string>("");
  const [deletedata, setdeletedata] = useState<deleteProps>({
    heading: "Delete category",
    paragraph:
      "Are you sure you want to delete this category. This action cannot be undone",
    type: "alert",
    successButtonText: "Delete category",
    successAction: () => {},
    cancelAction: () => {},
  });
  const [editdata, seteditdata] = useState<categoryProps>({
    _id: "",
    name: "",
    banner: "",
    icon: "",
    metaTitle: "",
    metaDescription: "",
    status: false,
  });
  useEffect(() => {
    listCategory().then((category) => {
      setcategorylist(category.data.data);
    });
  }, []);

  const cancelAction = () => {
    setdeleteaction(false);
  };
  const successAction = () => {
    deleteCategory(deleteid).then((response) => {
      setcategorylist(response.data.data);
      setdeleteaction(false);
    });
  };
  const closeAddEdit = () => {
    setshowaddedit(false);
    listCategory().then((category) => {
      setcategorylist(category.data.data);
    });
    seteditdata({
      _id: "",
      name: "",
      banner: "",
      icon: "",
      metaTitle: "",
      metaDescription: "",
      status: true,
    });
  };

  const editCategory = (data: categoryProps) => {
    seteditdata(data);
    setshowaddedit(true);
  };
  return (
    <>
      {deleteaction ? (
        <AlertAction
          heading={deletedata.heading}
          paragraph={deletedata.paragraph}
          type={deletedata.type}
          successButtonText={deletedata.successButtonText}
          cancelAction={cancelAction}
          successAction={successAction}
        />
      ) : (
        ""
      )}
      {showaddedit ? <AddEdit closePopUp={closeAddEdit} data={editdata} /> : ""}
      <div className="card">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Category List</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <button onClick={() => setshowaddedit(true)}>
                    <button className="btn btn-primary">Add category</button>
                  </button>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs">
                <label className="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="block w-full p-3 pl-10 text-sm border border-gray-700 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search..."
                  //   value={searchTerm}
                  //   onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Category ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Icon
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Banner
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Edit / Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {categorylist !== undefined &&
                      categorylist.map((dd, k) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {k + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <img src={dd.icon} className="w-auto" />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <img src={dd.banner} className="w-auto" />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <button
                              className="btn btn-primary"
                              onClick={() => editCategory(dd)}
                            >
                              Edit
                            </button>{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setdeleteid(dd._id);
                                setdeleteaction(true);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
