import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import React from "react";
import Layout from "../../layout";

const OrderDetail = () => {
  return (
    <>
      <Layout>
        <div className="card">
          <div className="card-header">Order Details</div>
          <div className="card-body">
            <MoreDetail />
          </div>
        </div>
      </Layout>
    </>
  );
};

const MoreDetail = () => {
  return (
    <>
      <div className="">
        <div className="flex-auto p-6">
          <div className="flex flex-wrap  gutters-5">
            <div className="relative flex-grow max-w-full flex-1 px-4 md:text-left text-center"></div>

            <div className="md:w-1/4 pr-4 pl-4 ml-auto">
              <label htmlFor="assign_deliver_boy">
                Assign Shipping Partner
              </label>
              <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                value=""
                disabled
              />
            </div>

            <div className="md:w-1/4 pr-4 pl-4 ml-auto">
              <label htmlFor="update_payment_status">Payment Status</label>
              <select
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded aiz-selectpicker"
                data-minimum-results-for-search="Infinity"
                id="update_payment_status"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
              <div className=" absolute left-0 z-50 float-left hidden list-reset	 py-2 mt-1 text-base bg-white border border-gray-300 rounded overflow-hidden">
                <div
                  className="inner opacity-100 block overflow-y-auto"
                  aria-activedescendant="bs-select-1-1"
                >
                  <ul
                    className=" absolute left-0 z-50 float-left list-reset	my-0 py-2 mt-1 text-base bg-white border border-gray-300 rounded inner opacity-100 block"
                    role="presentation"
                  >
                    <li>
                      <a
                        role="option"
                        className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0"
                        id="bs-select-1-0"
                      >
                        <span className="text">Unpaid</span>
                      </a>
                    </li>
                    <li className="selected active">
                      <a
                        role="option"
                        className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0 active selected"
                      >
                        <span className="text">Paid</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:w-1/4 pr-4 pl-4 ml-auto">
              <label htmlFor="update_delivery_status">Delivery Status</label>
              <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                value="delivered"
                disabled
              />
            </div>
          </div>
          <div className="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <rect x="0" y="0" width="100" height="100" fill="#ffffff"></rect>
              <g transform="scale(4.762)">
                <g transform="translate(0,0)">
                  <path
                    fill-rule="evenodd"
                    d="M8 0L8 4L9 4L9 5L8 5L8 7L9 7L9 5L10 5L10 7L11 7L11 5L12 5L12 7L13 7L13 2L12 2L12 1L13 1L13 0L12 0L12 1L11 1L11 2L10 2L10 1L9 1L9 0ZM9 3L9 4L10 4L10 3ZM11 3L11 4L12 4L12 3ZM0 8L0 9L2 9L2 13L3 13L3 11L4 11L4 13L5 13L5 12L6 12L6 13L7 13L7 12L8 12L8 14L9 14L9 15L8 15L8 17L9 17L9 18L10 18L10 19L13 19L13 20L12 20L12 21L13 21L13 20L14 20L14 19L13 19L13 16L12 16L12 14L13 14L13 15L14 15L14 16L15 16L15 17L14 17L14 18L16 18L16 20L17 20L17 19L19 19L19 18L21 18L21 17L20 17L20 16L18 16L18 14L17 14L17 13L18 13L18 12L20 12L20 13L19 13L19 14L20 14L20 15L21 15L21 12L20 12L20 11L21 11L21 10L20 10L20 9L21 9L21 8L17 8L17 9L18 9L18 10L15 10L15 9L16 9L16 8L15 8L15 9L13 9L13 8L12 8L12 11L10 11L10 9L9 9L9 11L8 11L8 10L6 10L6 11L4 11L4 10L5 10L5 9L7 9L7 8L4 8L4 10L3 10L3 9L2 9L2 8ZM0 10L0 11L1 11L1 10ZM13 10L13 12L12 12L12 13L11 13L11 12L10 12L10 11L9 11L9 14L10 14L10 16L11 16L11 14L12 14L12 13L13 13L13 14L14 14L14 15L15 15L15 16L17 16L17 18L18 18L18 16L17 16L17 15L15 15L15 14L14 14L14 13L13 13L13 12L15 12L15 10ZM18 10L18 11L20 11L20 10ZM6 11L6 12L7 12L7 11ZM16 11L16 13L17 13L17 11ZM0 12L0 13L1 13L1 12ZM11 17L11 18L12 18L12 17ZM8 19L8 21L9 21L9 19ZM20 19L20 20L18 20L18 21L21 21L21 19ZM10 20L10 21L11 21L11 20ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM14 0L14 7L21 7L21 0ZM15 1L15 6L20 6L20 1ZM16 2L16 5L19 5L19 2ZM0 14L0 21L7 21L7 14ZM1 15L1 20L6 20L6 15ZM2 16L2 19L5 19L5 16Z"
                    fill="#000000"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap">
            <div className="relative flex-grow max-w-full flex-1 px-0 md:text-left text-center">
              <span className="font-bold">Paul K. Jensen</span>
              <br />
              customer@example.com
              <br />
              201-287-7714
              <br />
              3947 West Side Avenue Hackensack, NJ 07601, College, Alaska - 1254
              <br />
              United States
            </div>
            <div className="md:w-1/3 pr-4 pl-4 ml-auto">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-bold">Order #</td>
                    <td className="text-teal-500 text-bold text-right">
                      {" "}
                      20220912-10085522
                    </td>
                  </tr>
                  <tr>
                    <td className="text-bold">Order status</td>
                    <td className="text-right">
                      <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded badge-inline bg-green-500 text-white hover:green-600">
                        Delivered
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-bold">Order date </td>
                    <td className="text-right">12-09-2022 10:08 AM</td>
                  </tr>
                  <tr>
                    <td className="text-bold">Total amount</td>
                    <td className="text-right">$999.000</td>
                  </tr>
                  <tr>
                    <td className="text-bold">Payment method</td>
                    <td className="text-right">Cash On Delivery</td>
                  </tr>
                  <tr>
                    <td className="text-bold">Additional Info</td>
                    <td className="text-right"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr className="new-section-sm bord-no" />
          <div className="flex flex-wrap ">
            <div className="lg:w-full block w-full overflow-auto scrolling-touch">
              <table className="order-collapse border border-slate-500">
                <thead>
                  <tr className="bg-trans-dark footable-header">
                    <th className="border border-slate-600 py-2 ">#</th>
                    <th className="border border-slate-600 py-2 footable-first-visible w-[10%]">
                      Photo
                    </th>
                    <th className="border border-slate-600 py-2 uppercase footable-last-visible">
                      Description
                    </th>
                    <th className="border border-slate-600 py-2 uppercase">
                      Delivery Type
                    </th>
                    <th className="border border-slate-600 py-2  uppercase text-center">
                      Qty
                    </th>
                    <th className="border border-slate-600 py-2 uppercase text-center">
                      Price
                    </th>
                    <th className="border border-slate-600 py-2  uppercase text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-600 p-2">1</td>
                    <td
                      className="footable-first-visible border border-slate-600 py-2"
                      style={{ display: "table-cell" }}
                    >
                      <span className="footable-toggle fooicon fooicon-plus"></span>
                      <a
                        href="https://demo.activeitzone.com/ecommerce/product/apple-iphone-14-pro-128gb-512gb-deep-purple-unlocked"
                        target="_blank"
                      >
                        <img
                          height="50"
                          src="https://demo.activeitzone.com/ecommerce/public/uploads/all/vxCXmeSpPOpczUjh0RVX1I0jXrFPUFTdZCXNNReY.webp"
                        />
                      </a>
                    </td>
                    <td className="footable-last-visible border border-slate-600 p-2 table-cell">
                      <strong>
                        <a
                          href="https://demo.activeitzone.com/ecommerce/product/apple-iphone-14-pro-128gb-512gb-deep-purple-unlocked"
                          target="_blank"
                          className="text-gray-700"
                        >
                          SAMSUNG Galaxy S23+ Plus Cell Phone, Unlocked Android
                          Smartphone, 512GB, 50MP Camera, Night Mode, 8K Video,
                          Long Battery Life, Fastest Mobile Processor, Adaptive
                          Display, US Version, 2023, Green
                        </a>
                      </strong>
                      <small>128GB</small>
                      <br />
                      <small>SKU:</small>
                    </td>
                    <td className="border border-slate-600 py-2">
                      Home Delivery
                    </td>
                    <td className="text-center border border-slate-600 py-2">
                      1
                    </td>
                    <td className="text-center border border-slate-600 py-2">
                      $999.000
                    </td>
                    <td className="text-center border border-slate-600 py-2">
                      $999.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-12 py-3">
            <div className="col-span-12 col-start-11">
              <table className="w-full max-w-full mb-4 bg-transparent">
                <tbody>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Sub Total :</strong>
                    </td>
                    <td>$999.000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Tax :</strong>
                    </td>
                    <td>$0.000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Shipping :</strong>
                    </td>
                    <td>$0.000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Coupon :</strong>
                    </td>
                    <td>$0.000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Total :</strong>
                    </td>
                    <td className="text-gray-700 h5">$999.000</td>
                  </tr>
                </tbody>
              </table>
              <div className="no-print text-right">
                <a
                  href="https://demo.activeitzone.com/ecommerce/invoice/80"
                  type="button"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-icon bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <ArrowDownTrayIcon className="w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
