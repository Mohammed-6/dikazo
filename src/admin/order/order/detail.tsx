import {} from "@heroicons/react/24/solid";
import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../../layout";
import { orderDetail } from "../../query/order/order";
import { useRouter } from "next/router";
import { Preloader, Toaster, imageURL, serverURL } from "../../data/stuff";
import axios from "axios";
import { toaster } from "../../types/basic";
import { jsPDF } from "jspdf";
import {
  XCircleIcon,
  ArrowDownTrayIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  QueueListIcon,
  XMarkIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { downloadOrderInvoice } from "@/src/front/query/customer";
const create = axios.create();

const OrderDetail = () => {
  const router = useRouter();
  const [orderdetail, setorderdetail] = useState<any>();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    // console.log(router.query);
    if (router.query.orderid !== undefined && router.query.order !== "") {
      orderDetail(router.query.orderid as string)
        .then((res) => {
          setorderdetail(res.data.data);
          setloading(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [router.isReady]);
  return (
    <>
      <Layout>
        <div className="card">
          <div className="card-header">Order Details</div>
          <div className="card-body">
            {loading ? <MoreDetail alldata={orderdetail} /> : ""}
          </div>
        </div>
      </Layout>
    </>
  );
};

type moreDetailProps = {
  alldata: any;
};
const MoreDetail = (props: moreDetailProps) => {
  const [orderdetail, setorderdetail] = useState<any>();
  const [subtotal, setsubtotal] = useState<number>(0);
  const [discount, setdiscount] = useState<number>(0);
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [shipment, setshipment] = useState<any>({
    shippingid: "",
    show: false,
  });
  useEffect(() => {
    setorderdetail(props.alldata);
    let pp = 0;
    props.alldata.productDetail !== undefined &&
      props.alldata.productDetail.map((dd: any, i: number) => {
        const old = pp;
        const kl = dd.productDetail.quantity * dd.productDetail.price;
        pp = old + kl;
        if (i === props.alldata.productDetail.length - 1) {
          setsubtotal(pp);
        }
      });
    if (props.alldata.promotionDetail.code !== undefined) {
      if (
        props.alldata.promotionDetail.discountType === "percent" &&
        props.alldata.amountTotal
      ) {
        var totalValue: any =
          props.alldata.amountTotal -
          (props.alldata.amountTotal * props.alldata.promotionDetail.discount) /
            100;

        setdiscount(props.alldata.amountTotal - totalValue);
      } else if (
        props.alldata.promotionDetail.discountType === "amount" &&
        props.alldata.amountTotal
      ) {
        setdiscount(props.alldata.promotionDetail.discount);
      }
    }
  }, []);
  function convertMongoDateToHumanReadable(mongoDate: string) {
    const date = new Date(mongoDate);
    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
  const setShippingPartner = (k: number, id: string) => {
    setshowpreloader(true);
    const event = "goswift";
    if (event === "goswift") {
      create
        .post(serverURL + "/goswift/generate/" + orderdetail?.orderCode, {
          number: k,
          mainId: id,
        })
        .then((response) => {
          if (response.data.type === "success") {
            setorderdetail(response.data.data);
            settoasterdata(response.data);
            setshowtoaster(true);
            setshowpreloader(false);
          } else {
            settoasterdata({
              type: "error",
              message: response.data.data.description,
            });
            setshowtoaster(true);
            setshowpreloader(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setshowpreloader(false);
        });
    }
  };
  // Function to generate a random alphanumeric ID
  function generateRandomId(length: number) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  // Function to convert PDF data to a downloadable file
  function convertPDFtoDownload(pdfData: any) {
    // Generate a random alphanumeric ID
    const fileId = generateRandomId(10); // Adjust the length as needed

    // Create a Blob object from the PDF data
    const blob = new Blob([pdfData], { type: "application/pdf" });

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `file_${fileId}.pdf`; // Set the filename with the random ID
    a.style.display = "none";
    document.body.appendChild(a);

    // Trigger the click event to start the download
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  function download(filename: any, text: any) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/pdf;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("target", "_blank");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  // function test () {
  //     Api(`tempFileDownload/report`, 'Get',"",3).then((data) => {
  //         console.log(data);
  //         download("test",data)
  //         const file = new Blob([ data ], { type: 'application/pdf' });

  //         //Build a URL from the file
  //         const fileURL = URL.createObjectURL(file);
  //         //Open the URL on new Window
  //         window.open(fileURL);
  //     });
  // }

  const downloadWaybill = async (id: string) => {
    if (id === "undefined") {
      return;
    }
    await create
      .get(serverURL + "/goswift/label/" + id, {
        responseType: "arraybuffer",
        // responseEncoding: "binary",
        // headers: {
        //   "Content-Type": "application/pdf",
        // },
      })
      .then(async (response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = Date.now() + ".pdf";
        link.click();
        URL.revokeObjectURL(downloadUrl);

        setshowtoaster(true);
        setshowpreloader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelShipment = (id: string) => {
    if (id === "undefined") {
      return;
    }
    create
      .post(serverURL + "/goswift/cancel/" + id)
      .then((response) => {
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
      })
      .catch((error) => {
        // console.error(error);
        settoasterdata(error);
        setshowtoaster(true);
        setshowpreloader(false);
      });
  };

  const reAttemptShipment = (id: string) => {
    if (id === "undefined") {
      return;
    }
    create
      .post(serverURL + "/goswift/ndr/re-attempt/", {
        action: "Re-Attempt",
        wbn: id,
      })
      .then((response) => {
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
      })
      .catch((error) => {
        // console.error(error);
        settoasterdata(error);
        setshowtoaster(true);
        setshowpreloader(false);
      });
  };
  const rtoShipment = (id: string) => {
    if (id === "undefined") {
      return;
    }
    create
      .post(serverURL + "/goswift/ndr/re-attempt/", { action: "RTO", wbn: id })
      .then((response) => {
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
      })
      .catch((error) => {
        // console.error(error);
        settoasterdata(error);
        setshowtoaster(true);
        setshowpreloader(false);
      });
  };

  function downloadInvoice(id: string) {
    setshowpreloader(true);
    downloadOrderInvoice(id).then((response) => {
      downloadPDF(
        serverURL + "/public/invoice/invoice_" + orderdetail.orderCode + ".pdf",
        "invoice_" + orderdetail.orderCode + ".pdf"
      );
      setshowpreloader(false);
    });
  }
  function downloadPDF(url: string, filename = "downloaded.pdf") {
    // Create a hidden anchor element
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = filename;
    link.style.display = "none";

    // Append the anchor to the document body (optional)
    // document.body.appendChild(link); // Uncomment if needed

    // Simulate a click to initiate download
    link.click();

    // Remove the anchor element (optional)
    // document.body.removeChild(link); // Uncomment if needed
  }

  const trackShipment = (shippingid: string) => {
    setshipment({ shippingid: shippingid, show: true });
  };

  const closePopup = () => {
    setshipment({ shippingid: "", show: false });
  };

  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      {shipment.show ? (
        <TrackShipping shippingId={shipment.shippingid} close={closePopup} />
      ) : (
        ""
      )}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="">
        <div className="flex-auto p-6">
          <div className="flex flex-wrap  gutters-5">
            <div className="relative flex-grow max-w-full flex-1 px-4 md:text-left text-center"></div>

            <div className="md:w-1/4 pr-4 pl-4 ml-auto">
              <label htmlFor="assign_deliver_boy">
                Assign Shipping Partner
              </label>
              <select className="w-full rounded-md border-gray-300">
                <option>Select Delivery Partner</option>
                <option value="goswift">Goswift</option>
              </select>
            </div>

            <div className="md:w-1/4 pr-4 pl-4 ml-auto">
              <label htmlFor="update_payment_status">Payment Status</label>
              <select
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded aiz-selectpicker"
                data-minimum-results-for-search="Infinity"
                id="update_payment_status"
                value={orderdetail?.paymentStatus}
                disabled
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="md:w-1/4 pr-4 pl-4 ml-auto">
              <label htmlFor="update_delivery_status">Delivery Status</label>
              <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                value={orderdetail?.orderStatus}
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
            <div className="relative flex-grow max-w-full flex-1 px-0 md:text-left text-center lg:max-w-lg">
              <span className="font-bold">
                {orderdetail?.addressDetail.name}
              </span>
              <br />
              {orderdetail?.addressDetail.email}
              <br />
              {orderdetail?.addressDetail.mobile}
              <br />
              {orderdetail?.addressDetail.address},{" "}
              {orderdetail?.addressDetail.state} -{" "}
              {orderdetail?.addressDetail.pincode}
              <br />
              {orderdetail?.addressDetail.locality}
              {orderdetail?.addressDetail.city !== ""
                ? `, ${orderdetail?.addressDetail.city}`
                : ""}
            </div>
            <div className="md:w-1/3 pr-4 pl-4 ml-auto">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-bold">Order #</td>
                    <td className="text-teal-500 text-bold text-right">
                      {" "}
                      {orderdetail?.orderCode}
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
                    <td className="text-right">
                      {convertMongoDateToHumanReadable(orderdetail?.created_at)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-bold">Total amount</td>
                    <td className="text-right">₹{orderdetail?.amountTotal}</td>
                  </tr>
                  <tr>
                    <td className="text-bold">Payment method</td>
                    <td className="text-right">{orderdetail?.paymentMethod}</td>
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
                  {orderdetail?.productDetail !== undefined &&
                    orderdetail?.productDetail.map((dd: any, k: number) => (
                      <tr>
                        <td className="border border-slate-600 p-2">{k + 1}</td>
                        <td
                          className="footable-first-visible border border-slate-600 py-2"
                          style={{ display: "table-cell" }}
                        >
                          <span className="footable-toggle fooicon fooicon-plus"></span>
                          <a
                            href={"/product/" + dd.productDetail.seoTitle}
                            target="_blank"
                          >
                            <img
                              height="50"
                              src={imageURL + dd.productDetail.images[0]}
                            />
                          </a>
                        </td>
                        <td className="footable-last-visible border border-slate-600 p-2 table-cell">
                          <strong>
                            <a
                              href={"/product/" + dd.productDetail.seoTitle}
                              target="_blank"
                              className="text-gray-700"
                            >
                              {dd.productDetail.name}
                            </a>
                          </strong>
                          <br />
                          {dd.productDetail.attribute.attribute !== undefined &&
                            dd.productDetail.attribute.attribute.map(
                              (ll: any, i: number) => (
                                <small>
                                  {ll}:{" "}
                                  {dd.productDetail.attribute.variation[i]}
                                </small>
                              )
                            )}
                          <br />
                          <div className="flex items-center justify-between">
                            <div className="">
                              <small>SKU: {dd.productDetail.sku}</small>
                            </div>
                            <div className="">
                              <div className="flex gap-x-2">
                                {dd.shippingStatus === false ? (
                                  <>
                                    <button
                                      className="bg-green-500 py-1 px-2 rounded-md"
                                      onClick={() =>
                                        setShippingPartner(k, dd._id)
                                      }
                                      title="Create shipment"
                                    >
                                      <PlusCircleIcon className="w-6 stroke-white" />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="bg-gray-500 py-1 px-2 rounded-md"
                                      onClick={() =>
                                        trackShipment(
                                          dd?.shippingDetail.tracking_id
                                        )
                                      }
                                      title="Download shipment waybill"
                                    >
                                      <QueueListIcon className="w-6 stroke-white" />
                                    </button>
                                    <button
                                      className="bg-gray-500 py-1 px-2 rounded-md"
                                      onClick={() =>
                                        downloadWaybill(
                                          dd?.shippingDetail.tracking_id
                                        )
                                      }
                                      title="Download shipment waybill"
                                    >
                                      <ArrowDownTrayIcon className="w-6 stroke-white" />
                                    </button>
                                    <button
                                      className="bg-red-500 py-1 px-2 rounded-md"
                                      onClick={() =>
                                        cancelShipment(
                                          dd?.shippingDetail?.tracking_id
                                        )
                                      }
                                      title="Cancel shipment"
                                    >
                                      <XCircleIcon className="w-6 stroke-white" />
                                    </button>
                                    <button
                                      className="bg-green-500 py-1 px-2 rounded-md"
                                      onClick={() =>
                                        reAttemptShipment(
                                          dd?.shippingDetail?.tracking_id
                                        )
                                      }
                                      title="Re-attempt shipment"
                                    >
                                      <ArrowPathIcon className="w-6 stroke-white" />
                                    </button>
                                    <button
                                      className="bg-green-500 py-1 px-2 rounded-md"
                                      onClick={() =>
                                        rtoShipment(
                                          dd?.shippingDetail?.tracking_id
                                        )
                                      }
                                      title="RTO shipment"
                                    >
                                      <ArrowUturnLeftIcon className="w-6 stroke-white" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-slate-600 py-2">
                          {orderdetail?.addressDetail.type} Delivery
                        </td>
                        <td className="text-center border border-slate-600 py-2">
                          {dd.productDetail.quantity}
                        </td>
                        <td className="text-center border border-slate-600 py-2">
                          ₹{dd.productDetail.price}
                        </td>
                        <td className="text-center border border-slate-600 py-2">
                          ₹{dd.productDetail.quantity * dd.productDetail.price}
                        </td>
                      </tr>
                    ))}
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
                    <td>₹{subtotal}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Tax :</strong>
                    </td>
                    <td>₹0.000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Shipping :</strong>
                    </td>
                    <td>₹0.000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Coupon :</strong>
                    </td>
                    <td>₹{discount?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-gray-700">Total :</strong>
                    </td>
                    <td className="text-gray-700 h5">
                      ₹{orderdetail?.amountTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="no-print text-right">
                <button
                  onClick={() => downloadInvoice(orderdetail._id)}
                  type="button"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-icon bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <ArrowDownTrayIcon className="w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type trackProp = {
  shippingId: string;
  close: Function;
};

const TrackShipping = (props: trackProp) => {
  const [collectdata, setcollectdata] = useState<any>();
  useEffect(() => {
    create
      .post(serverURL + "/goswift/track/" + props.shippingId)
      .then((response) => {
        console.log(response.data.data);
        setcollectdata(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const convertDate = (ndate: number) => {
    // Create a Date object from the timestamp (in milliseconds)
    const timestamp = ndate;
    const date = new Date(timestamp);

    // Options for formatting the date and time
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC", // Ensure consistent time zone
    };

    // Format the date and time according to user's locale
    const formattedDateTime = date.toLocaleDateString(undefined, options);

    return formattedDateTime;
  };
  const closePopup = () => {
    props.close();
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-20">
        <div className="mx-auto max-w-2xl">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="">Track Shipment</div>
                <div className="">
                  <XMarkIcon
                    className="w-6 cursor-pointer"
                    onClick={closePopup}
                  />
                </div>
              </div>
              <div className="card-body">
                {collectdata !== undefined ? (
                  <>
                    <h2 className="text-xl font-bold">
                      Status: {collectdata.track.status}
                    </h2>
                    <table className="my-4">
                      <tbody>
                        {collectdata.track.details.map((dd: any) => (
                          <tr className="border border-gray-400">
                            <td className="px-4 py-2 border border-r-0 border-gray-400">
                              {convertDate(dd.ctime)}
                            </td>
                            <td className="px-4 py-2 border border-gray-400">
                              {dd.status}
                            </td>
                            <td className="px-4 py-2 border border-l-0 border-gray-400">
                              {dd.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
