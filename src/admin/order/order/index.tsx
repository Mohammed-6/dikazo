import React, { useState, useEffect } from "react";
import {
  arrProductProps,
  filterProps,
  loadResourceProps,
} from "../../types/product/product";
import {
  deleteProduct,
  updateProduct,
  filterProduct,
} from "../../query/product/product";
import Layout from "../../layout/index";
import Link from "next/link";

import { deleteProps, toaster } from "../../types/basic";
import { AlertAction, Preloader, Toaster, serverURL } from "../../data/stuff";
import {
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { listOrder } from "../../query/order/order";

const Order = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [filter, setFilter] = useState<filterProps>({
    seller: "",
    sort: "",
    search: "",
    category: "",
    brand: "",
  });
  const [productlist, setproductlist] = useState(arrProductProps);
  const [showaddedit, setshowaddedit] = useState<boolean>(false);
  const [deleteaction, setdeleteaction] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<string>("");
  const [deletedata, setdeletedata] = useState<deleteProps>({
    heading: "Delete product",
    paragraph:
      "Are you sure you want to delete this product. This action cannot be undone",
    type: "alert",
    successButtonText: "Delete product",
    successAction: () => {},
    cancelAction: () => {},
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [listorder, setlistorder] = useState<any>();
  useEffect(() => {
    listOrder()
      .then((res) => {
        setlistorder(res.data.data);
      })
      .catch(() => {
        setshowtoaster(true);
        settoasterdata({ type: "error", message: "Something went wrong" });
      });
  }, []);

  const cancelAction = () => {
    setdeleteaction(false);
  };
  const successAction = () => {
    deleteProduct(deleteid).then((response) => {
      setproductlist(response.data.data);
      setdeleteaction(false);
    });
  };

  const [showseller, setshowseller] = useState<boolean>(false);
  const showHideSeller = () => {
    setshowseller(!showseller);
  };
  const deliveryStatus = [
    "Pending",
    "Confirmed",
    "Picked Up",
    "On The Way",
    "Delivered",
    "Cancel",
  ];
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
      {showpreloader ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="card">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Product List</div>

            <div className="flex items-center gap-x-2"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="m-2">
              <div className="grid grid-cols-6 gap-x-2 items-center">
                <div className="">
                  <div className="relative">
                    <div
                      className="px-2 py-2 rounded-md border border-gray-200 bg-white w-full text-gray-500"
                      onClick={showHideSeller}
                    >
                      Filter by Delivery Status
                    </div>
                    <div className="" onMouseLeave={showHideSeller}>
                      {showseller ? (
                        <div className="h-48 overflow-x-auto overflow-y-auto absolute z-20 top-12 rounded-md bg-white w-full border border-gray-200 text-gray-500">
                          {deliveryStatus.map((status) => (
                            <div
                              className="px-2 py-2 rounded-md border-b"
                              // onClick={() => changeSeller(dd._id)}
                            >
                              <div className="flex justify-between">
                                <div className="">{status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <select className="w-full rounded-md">
                    <option value="">Filter by Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
                <div className="">
                  <input
                    type="date"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Type Order code"
                  />
                </div>
                <div className="">
                  <input
                    type="date"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Type Order code"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Type Order code"
                  />
                </div>
                <div>
                  <button className="bg-primary text-white px-5 py-2 block rounded-sm w-full">
                    Filter
                  </button>
                </div>
              </div>
            </div>
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden overflow-x-auto border rounded-lg">
                <table className="border-collapse table-auto w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-start">
                      <th>Order Code</th>
                      <th>Num. of Products</th>
                      <th>Customer</th>
                      <th>Seller</th>
                      <th>Amount</th>
                      <th>Delivery Status</th>
                      <th>Payment method</th>
                      <th className="text-right footable-last-visible">
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {listorder !== undefined &&
                      listorder.map((ord: any) => (
                        <>
                          <tr className="m-2">
                            <td>{ord.orderCode}</td>
                            <td>{ord.productDetail.length}</td>
                            <td>{ord.addressDetail.name}</td>
                            <td>{ord.productDetail[0].shopInformation.name}</td>
                            <td>₹ {ord.amountTotal}</td>
                            <td>Delivered</td>
                            <td>{ord.paymentMethod}</td>
                            <td>
                              <span className="badge badge-inline badge-success">
                                {ord.paymentStatus}
                              </span>
                            </td>
                            <td className="text-right footable-last-visible">
                              <div className="flex items-center gap-x-3">
                                <a
                                  href={"/admin/order/detail/" + ord.ordercode}
                                  title="View"
                                >
                                  <PencilIcon className="w-6" />
                                </a>
                                <a href="" title="Download Invoice">
                                  <ArrowDownTrayIcon className="w-6" />
                                </a>
                                <a href="#" data-href="" title="Delete">
                                  <TrashIcon className="w-6" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        </>
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

export default Order;
