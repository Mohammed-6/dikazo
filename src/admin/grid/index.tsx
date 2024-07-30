import React, { useState, useEffect } from "react";
import { arrPageCategoryProps, categoryProps } from "../types/category";
import Layout from "../layout/index";
import Link from "next/link";

import { deleteProps } from "../types/basic";
import { AlertAction } from "../data/stuff";
import {
  deleteContent,
  homepageUpdateStructure,
  listContent,
  updateStructure_,
} from "../query/structure/structure";
const GridView = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [structurelist, setstructurelist] = useState<any>();
  const [deleteaction, setdeleteaction] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<string>("");
  const [deletedata, setdeletedata] = useState<deleteProps>({
    heading: "Delete structure",
    paragraph:
      "Are you sure you want to delete this structure. This action cannot be undone",
    type: "alert",
    successButtonText: "Delete structure",
    successAction: () => {},
    cancelAction: () => {},
  });
  useEffect(() => {
    listContent().then((response) => {
      setstructurelist(response.data.data);
    });
  }, []);

  const cancelAction = () => {
    setdeleteaction(false);
  };
  const successAction = () => {
    deleteContent(deleteid).then((response) => {
      setstructurelist(response.data.data);
      setdeleteaction(false);
    });
  };
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>, sid: string) => {
    const evt = e.currentTarget;
    const colte = { structureId: sid, homepage: evt.checked };
    homepageUpdateStructure(colte)
      .then((res) => {
        setstructurelist(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
      <div className="card">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Structure List</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <Link href={"admin/grid/add"}>
                    <button className="btn btn-primary">Add Structure</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Structure ID
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
                        Set Homepage
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
                    {structurelist !== undefined &&
                      structurelist.map((dd: any, k: number) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {dd.structureId}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={dd.homepage}
                                onChange={(e) => changeForm(e, dd.structureId)}
                                name="isColor"
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <Link
                              href={"/admin/grid/structure/" + dd.structureId}
                              className="btn btn-primary"
                            >
                              Edit
                            </Link>{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setdeleteid(dd.structureId);
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

export default GridView;
