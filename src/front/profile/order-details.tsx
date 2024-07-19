import React, { useEffect, useState } from "react";
import Layout from "../layout";
import ProfileLayout from "./layout";
import { toaster } from "@/src/admin/types/basic";
import { getProfileOrder } from "../query/profile";
import {
  Preloader,
  Toaster,
  imageURL,
  serverHeader,
  serverURL,
} from "@/src/admin/data/stuff";
import { SingleOrder, formatDate } from "./orders";
import { useRouter } from "next/router";
import Link from "next/link";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { productFeedbackProps, sellerFeedbackProps } from "../types/customer";
import {
  downloadOrderInvoice,
  submitDeliveryFeedback,
  submitProductFeedback,
  submitSellerFeedback,
} from "../query/customer";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
const OrderDetails = () => {
  return (
    <>
      <Layout>
        <ProfileLayout>
          <Content />
        </ProfileLayout>
      </Layout>
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [showsellerfeedback, setsellerfeedback] = useState<boolean>(false);
  const [showdeliveryfeedback, setdeliveryfeedback] = useState<boolean>(false);
  const [showproductfeedback, setproductfeedback] = useState<boolean>(false);
  const [shopid, setshopid] = useState<any>();

  const [collectdata, setcollectdata] = useState<any>([]);
  const [discount, setdiscount] = useState<number>(0);
  const [subtotal, setsubtotal] = useState<number>(0);
  const [coupondetails, setcoupondetails] = useState<any>();
  useEffect(() => {
    if (router.query.order_id !== undefined) {
      getProfileOrder(router.query.order_id as string)
        .then((ord) => {
          setcollectdata(ord.data.data);
          setshowpreloader(false);
          ord.data.data.productDetail.map((prd: any) => {
            const price = prd.productDetail.price;
            setsubtotal(subtotal + price);
          });
          if (
            ord.data.data.promotionDetail.discount &&
            ord.data.data.promotionDetail.discount !== undefined
          ) {
            setcoupondetails({
              discount: ord.data.data.promotionDetail.discount,
              code: ord.data.data.promotionDetail.code,
            });
            if (
              ord.data.data.promotionDetail.discountType === "percent" &&
              ord.data.data.amountTotal
            ) {
              var totalValue: any =
                ord.data.data.amountTotal -
                (ord.data.data.amountTotal *
                  ord.data.data.promotionDetail.discount) /
                  100;

              setdiscount(ord.data.data.amountTotal - totalValue);
            } else if (
              ord.data.data.promotionDetail.discountType === "amount" &&
              ord.data.data.amountTotal
            ) {
              setdiscount(ord.data.data.promotionDetail.discount);
            }
          }
        })
        .catch((err) => {
          setshowtoaster(true);
          setshowpreloader(false);
          settoasterdata({ type: "error", message: "Something went wrong" });
          setTimeout(() => {
            setshowtoaster(false);
          }, 3000);
        });
    }
  }, [router.isReady]);
  const closeSellerFeedback = () => {
    setsellerfeedback(false);
    setdeliveryfeedback(false);
    setproductfeedback(false);
  };
  const leaveSellerFeedback = (val: string) => {
    setsellerfeedback(true);
    setshopid(val);
  };
  const leaveDeliveryFeedback = (val: string) => {
    setdeliveryfeedback(true);
    setshopid(val);
  };
  const leaveProductFeedback = (val: number) => {
    setproductfeedback(true);
    setshopid(val);
  };
  function downloadInvoice(id: string) {
    setshowpreloader(true);
    downloadOrderInvoice(id).then((response) => {
      downloadPDF(
        serverURL + "/public/invoice/invoice_" + collectdata.orderCode + ".pdf",
        "invoice_" + collectdata.orderCode + ".pdf"
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
  return (
    <>
      <>
        {showtoaster ? (
          <Toaster type={toasterdata.type} message={toasterdata.message} />
        ) : (
          ""
        )}
        {showpreloader ? (
          <Preloader />
        ) : (
          <div className="p-3">
            <h2 className="text-2xl font-bold py-2">Order Details</h2>
            <div className="flex justify-between">
              <div className="text-sm flex items-center">
                <div className="border-r pr-3">
                  Ordered on {formatDate(new Date(collectdata.created_at))}
                </div>
                <div className="pl-3">Order# {collectdata.orderCode}</div>
              </div>
              <div
                className="flex items-center gap-x-2"
                title="Download invoice"
              >
                <div>
                  <button
                    className="text-xl text-blue-500"
                    onClick={() => downloadInvoice(collectdata._id)}
                  >
                    Invoice
                  </button>
                </div>
                <div>
                  <ArrowDownTrayIcon className="w-5 stroke-blue-500 font-bold" />
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md p-3 my-3">
              <div className="grid grid-cols-3 text-sm gap-x-5">
                <div className="">
                  <div className="font-bold">Shipping Address</div>
                  <div className="">{collectdata.addressDetail.name}</div>
                  <div className="">
                    {collectdata.addressDetail?.address},
                    {collectdata.addressDetail?.locality},
                    {collectdata.addressDetail?.city},
                    {collectdata.addressDetail?.state},{" "}
                    {collectdata.addressDetail?.pincode}
                  </div>
                </div>
                <div className="">
                  <div className="font-bold">Payment Method</div>
                  <div className="">{collectdata.paymentMethod}</div>
                </div>
                <div className="">
                  <div className="font-bold">Order Summary</div>
                  <div className="flex justify-between">
                    <div>Item(s) Subtotal:</div>
                    <div>₹{subtotal}</div>
                  </div>
                  <div className="flex justify-between">
                    <div> Promotion:</div>
                    <div>-₹{discount.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div> Shipping:</div>
                    <div>₹0</div>
                  </div>
                  <div className="flex justify-between">
                    <div> Total:</div>
                    <div>₹{collectdata.amountTotal}</div>
                  </div>
                  <div className="flex justify-between font-bold">
                    <div>Grand Total:</div>
                    <div>₹{collectdata.amountTotal}</div>
                  </div>
                </div>
              </div>
            </div>
            {collectdata.productDetail.map((ord: any, i: number) => (
              <>
                <div className="border border-gray-300 rounded-lg my-4">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="grid grid-cols-12">
                      <div className="col-span-9">
                        <div className="pb-3">
                          <h2 className="font-bold text-xl">Processing</h2>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2">
                          <div className="col-span-3">
                            <img
                              src={imageURL + ord.productDetail.images[0]}
                              className="w-[200px]object-contain"
                            />
                          </div>
                          <div className="text-sm col-span-9">
                            <h5 className="font-bold text-lg">
                              {ord.productDetail?.brand}
                            </h5>
                            <Link
                              href={"/product/" + ord.productDetail?.seoTitle}
                              className="hover:underline text-blue-500 hover:text-primary"
                            >
                              {ord.productDetail.name}
                            </Link>
                            <div className="">
                              Sold by: {ord.shopInformation?.shopName}
                            </div>
                            <div className="">
                              Variant: {ord.productDetail?.variantName}
                            </div>
                            <div className="text-blue-500">
                              Per Price: ₹{ord.productDetail.price}
                            </div>
                            <div className="text-blue-500">
                              Quantity: {ord.productDetail.quantity}
                            </div>
                            <div className="text-red-500">
                              Total: ₹
                              {ord.productDetail.quantity *
                                ord.productDetail.price}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="">
                          <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-3">
                            Track package
                          </button>
                          <button className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1">
                            Return items
                          </button>
                          <button
                            className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1"
                            onClick={() =>
                              leaveSellerFeedback(ord.shopInformation._id)
                            }
                          >
                            Leave seller feedback
                          </button>
                          <button
                            className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1"
                            onClick={() => leaveDeliveryFeedback(ord._id)}
                          >
                            Leave delivery feedback
                          </button>
                          <button
                            className="border rounded-md block py-1 text-sm w-full shadow-none hover:bg-gray-100 text-center mb-1"
                            onClick={() => leaveProductFeedback(i)}
                          >
                            Write a product review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
        {/* <Invoice
          closeWindow={closeSellerFeedback}
          shopId={shopid}
          order={collectdata}
        /> */}
        {showsellerfeedback ? (
          <SellerFeedback
            closeWindow={closeSellerFeedback}
            shopId={shopid}
            order={collectdata}
          />
        ) : showdeliveryfeedback ? (
          <DeliveryFeedback
            closeWindow={closeSellerFeedback}
            shopId={shopid}
            order={collectdata}
          />
        ) : showproductfeedback ? (
          <ProductFeedback
            closeWindow={closeSellerFeedback}
            shopId={shopid}
            order={collectdata}
          />
        ) : (
          ""
        )}
      </>
    </>
  );
};

type invoiceProps = {
  closeWindow: Function;
  shopId: string;
  order: any;
};
const Invoice = (props: invoiceProps) => {
  function formatDateToDDMMYYYY(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  let productdata: any = [];
  let sellerData: any = {};
  let taxAmt = 0;
  props.order.productDetail !== undefined &&
    props.order.productDetail.map((prod: any) => {
      let tax =
        (prod.productDetail.price *
          prod.productDetail.quantity *
          prod.productDetail.gst) /
        100;
      taxAmt += tax;
      const bb = {
        description: prod.productDetail.name,
        unitPrice: prod.productDetail.price,
        quantity: prod.productDetail.quantity,
        netAmount: prod.productDetail.price,
        taxRate: prod.productDetail.gst + "%",
        taxType:
          props.order.addressDetail?.stateCode ===
          prod.shopInformation.stateCode
            ? "SGST"
            : "IGST",
        taxAmount: tax,
        totalAmount: prod.productDetail.price * prod.productDetail.quantity,
      };
      sellerData = {
        name: prod.shopInformation.shopName,
        address: prod.shopInformation.shopAddress,
        panNo: prod.shopInformation.panNo,
        gstNo: prod.shopInformation.gst,
      };
      productdata.push(bb);
    });

  const invoiceData = {
    orderNumber: props.order.orderCode,
    invoiceNumber: "IN-2834",
    orderDate: formatDateToDDMMYYYY(new Date(props.order.created_at)),
    invoiceDate: formatDateToDDMMYYYY(new Date()),
    items: productdata,
    totalTaxAmount: taxAmt,
    totalAmount: props.order.amountTotal,
    amountInWords: "Five Hundred Ninety-four only",
    reverseCharge: "No",
    paymentDetails: [props.order.paymentInformation],
    sellerDetails: sellerData,
    billingAddress: {
      name: props.order.addressDetail?.name,
      address:
        props.order.addressDetail?.address +
        ", " +
        props.order.addressDetail?.locality +
        ", " +
        props.order.addressDetail?.city +
        ", " +
        props.order.addressDetail?.state +
        ", " +
        props.order.addressDetail?.pincode,
      stateCode: props.order.addressDetail?.stateCode,
    },
    shippingAddress: {
      name: props.order.addressDetail?.name,
      address:
        props.order.addressDetail?.address +
        ", " +
        props.order.addressDetail?.locality +
        ", " +
        props.order.addressDetail?.city +
        ", " +
        props.order.addressDetail?.state +
        ", " +
        props.order.addressDetail?.pincode,
      stateCode: props.order.addressDetail?.stateCode,
    },
    placeOfSupply: props.order.addressDetail?.state,
    placeOfDelivery: props.order.addressDetail?.state,
    paymentMethod: props.order.paymentMethod,
    orderId: props.order.orderDetail?.id,
  };

  return (
    <>
      <div className="">
        <div style={{ padding: "0 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img
                src="https://biyaan.in/assets/images/logo.png"
                style={{ height: "80px", width: "auto" }}
              />
            </div>
            <div style={{ fontWeight: "600" }}>
              <h1>Tax Invoice/Bill of Supply/Cash Memo</h1>
              <p>(Original for Recipient)</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <div>
              <h2>Seller Details:</h2>
              <p>Sold By: {invoiceData.sellerDetails.name}</p>
              <p>Address: {invoiceData.sellerDetails.address}</p>
            </div>
            <div>
              <h2>Billing Address:</h2>
              <p>Name: {invoiceData.billingAddress.name}</p>
              <p>Address: {invoiceData.billingAddress.address}</p>
              <p>State/UT Code: {invoiceData.billingAddress.stateCode}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <div>
              <p>PAN No: {invoiceData.sellerDetails.panNo}</p>
              <p>GST Registration No: {invoiceData.sellerDetails.gstNo}</p>
            </div>
            <div style={{ whiteSpace: "pre-line" }}>
              <h2>Shipping Address</h2>
              <p>Name: {invoiceData.shippingAddress.name}</p>
              <p>Address: {invoiceData.shippingAddress.address}</p>
              <p>State/UT Code: {invoiceData.shippingAddress.stateCode}</p>
              <div>
                <p>Place of Supply: {invoiceData.placeOfSupply}</p>
                <p>Place of Delivery: {invoiceData.placeOfDelivery}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <div>
              <h2>Order Details</h2>
              <p>Order Number: {invoiceData.orderNumber}</p>
              <p>Order Date: {invoiceData.orderDate}</p>
            </div>
            <div>
              <p>Invoice Number: {invoiceData.invoiceNumber}</p>
              <p>Invoice Date: {invoiceData.invoiceDate}</p>
            </div>
          </div>
          <div>
            <table
              border={1}
              cellPadding="10"
              style={{ border: "1px solid #e2e2e2" }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #e2e2e2" }}>Description</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Unit Price</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Quantity</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Net Amount</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Tax Rate</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Tax Type</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Tax Amount</th>
                  <th style={{ border: "1px solid #e2e2e2" }}>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      {item.description}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      ₹{item.unitPrice.toFixed(2)}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      {item.quantity}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      ₹{item.netAmount.toFixed(2)}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      {item.taxRate}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      {item.taxType}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      ₹{item.taxAmount.toFixed(2)}
                    </td>
                    <td style={{ border: "1px solid #e2e2e2" }}>
                      ₹{item.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6}>TOTAL</td>
                  <td
                    style={{
                      border: "1px solid #e2e2e2",
                      backgroundColor: "#e2e2e2",
                    }}
                  >
                    ₹{taxAmt}
                  </td>
                  <td
                    style={{
                      border: "1px solid #e2e2e2",
                      backgroundColor: "#e2e2e2",
                    }}
                  >
                    ₹{invoiceData?.totalAmount}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      border: "1px solid #e2e2e2",
                    }}
                  >
                    Amount in Words: <br />
                    {invoiceData.amountInWords}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p>
              Whether tax is payable under reverse charge:{" "}
              {invoiceData.reverseCharge}
            </p>
          </div>
          <div>
            <h2>Payment Details</h2>
            <table>
              <tr>
                <td
                  style={{
                    border: "1px solid #e2e2e2",
                    padding: "10px",
                  }}
                >
                  Transaction ID: {invoiceData?.orderId}
                </td>
                <td
                  style={{
                    border: "1px solid #e2e2e2",
                    padding: "10px",
                  }}
                >
                  Date & Time: {invoiceData.orderDate}
                </td>
                <td
                  style={{
                    border: "1px solid #e2e2e2",
                    padding: "10px",
                  }}
                >
                  Mode of Payment: {invoiceData.paymentMethod}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

type feedbackProps = {
  closeWindow: Function;
  shopId: string;
  order: any;
};

const SellerFeedback = (props: feedbackProps) => {
  const [rating, setrating] = useState<number>(0);
  const [starrating, setstarrating] = useState<number>(0);
  const [startext, setstartext] = useState<string>("");

  const [text, setText] = useState("");
  const [collectdata, setcollectdata] = useState<sellerFeedbackProps>({
    sellerId: "",
    orderId: "",
    customerId: "",
    rating: 0,
    isItemArrrived: true,
    itemDesctibed: true,
    sellerPromptService: "",
    comment: "",
  });
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const maxLength = 400;

  // Function to handle text change in textarea
  const handleTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const e = event.target as HTMLTextAreaElement;
    setText(e.value);
    setcollectdata({ ...collectdata, comment: e.value });
  };

  // Calculate remaining characters
  const remainingChars = maxLength - text.length;

  const changeText = (val: number) => {
    if (val === 1) {
      setstartext("Awful");
      setrating(1);
    } else if (val === 2) {
      setstartext("Poor");
      setrating(2);
    } else if (val === 3) {
      setstartext("Fair");
      setrating(3);
    } else if (val === 4) {
      setstartext("Good");
      setrating(4);
    } else if (val === 5) {
      setstartext("Excellent");
      setrating(5);
    } else {
      setstartext("");
      setrating(0);
    }
  };
  const closeWindow = () => {
    props.closeWindow();
  };
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    const isThat = evt.value === "true" ? true : false;
    setcollectdata({ ...collectdata, [evt.name]: isThat });
  };
  const formSubmit = () => {
    const colte = collectdata;
    colte.rating = starrating;
    colte.orderId = props.order._id;
    colte.sellerId = props.shopId;
    colte.customerId = localStorage.getItem("dkz_user_token")!;
    if (colte.rating === 0) {
      setalert({
        alert: true,
        type: "error",
        message: "Star rating must required",
      });
      return;
    } else if (colte.comment === "") {
      setalert({
        alert: true,
        type: "error",
        message: "Comment cannot be empty",
      });
      return;
    }
    submitSellerFeedback(colte)
      .then((feedback: any) => {
        if (feedback?.type === "error") {
          setalert({
            alert: true,
            type: "error",
            message: "Something went wrong",
          });
        } else {
          setalert({
            alert: true,
            type: "success",
            message: "Thank you for your feedback",
          });
        }

        setTimeout(() => {
          props.closeWindow();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const date = new Date(props.order.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDay() + 1;
  const year = date.getFullYear();
  return (
    <>
      <div className="fixed inset-0 bg-black/50">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="">Seller feedback</div>
                <div className="">
                  <XMarkIcon
                    className="h-8 w-8 stroke-gray-400 fill-gray-400 rounded-md bg-white shadow-lg p-2 hover:cursor-pointer"
                    onClick={closeWindow}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <h2 className="px-4">Rate Seller</h2>
              <div className="px-3">
                <div
                  className="flex items-center"
                  onMouseLeave={() => {
                    starrating === 0 ? setstartext("") : "";
                    setrating(0);
                  }}
                >
                  <StarIcon
                    className={`w-10 ${
                      rating >= 1 || starrating >= 1
                        ? "stroke-yellow-100 fill-yellow-400"
                        : "stroke-gray-400 fill-gray-100"
                    }`}
                    onMouseEnter={() => changeText(1)}
                    onClick={() => {
                      setstarrating(1);
                    }}
                  />
                  <StarIcon
                    className={`w-10 ${
                      rating >= 2 || starrating >= 2
                        ? "stroke-yellow-100 fill-yellow-400"
                        : "stroke-gray-400 fill-gray-100"
                    }`}
                    onMouseEnter={() => changeText(2)}
                    onClick={() => {
                      setstarrating(2);
                    }}
                  />
                  <StarIcon
                    className={`w-10 ${
                      rating >= 3 || starrating >= 3
                        ? "stroke-yellow-100 fill-yellow-400"
                        : "stroke-gray-400 fill-gray-100"
                    }`}
                    onMouseEnter={() => changeText(3)}
                    onClick={() => {
                      setstarrating(3);
                    }}
                  />
                  <StarIcon
                    className={`w-10 ${
                      rating >= 4 || starrating >= 4
                        ? "stroke-yellow-100 fill-yellow-400"
                        : "stroke-gray-400 fill-gray-100"
                    }`}
                    onMouseEnter={() => changeText(4)}
                    onClick={() => {
                      setstarrating(4);
                    }}
                  />
                  <StarIcon
                    className={`w-10 ${
                      rating >= 5 || starrating >= 5
                        ? "stroke-yellow-100 fill-yellow-400"
                        : "stroke-gray-400 fill-gray-100"
                    }`}
                    onMouseEnter={() => changeText(5)}
                    onClick={() => {
                      setstarrating(5);
                    }}
                  />
                  <div className="font-bold text-xl ml-4">{startext}</div>
                </div>
              </div>
              <div className="border border-gray-100 rounded-md p-4">
                <div className="grid grid-cols-2 items-center py-1">
                  <div className="font-bold">
                    Item arrived by {day} {month}, {year}?
                  </div>
                  <div className="flex justify-between items-center gap-x-3">
                    <div className="flex gap-x-4 items-center">
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="isItemArrrived"
                          value="true"
                          onChange={formChange}
                        />{" "}
                        Yes
                      </label>
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="isItemArrrived"
                          value="false"
                          onChange={formChange}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="italic text-gray-600 py-1">
                  Estimated delivery date: 13 March, 2024 - 13 March, 2024
                </div>
                <div className="grid grid-cols-2 items-center py-1">
                  <div className="font-bold">
                    Item as described by the seller?
                  </div>
                  <div className="flex justify-between items-center gap-x-3">
                    <div className="flex gap-x-4 items-center">
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="itemDesctibed"
                          value="true"
                          onChange={formChange}
                        />{" "}
                        Yes
                      </label>
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="itemDesctibed"
                          value="false"
                          onChange={formChange}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center py-1">
                  <div className="font-bold">
                    Prompt and courteous service? ( If you contacted the seller
                    )
                  </div>
                  <div className="flex justify-between items-center gap-x-3">
                    <div className="flex gap-x-4 items-center">
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="sellerPromptService"
                          value="true"
                          onChange={formChange}
                        />{" "}
                        Yes
                      </label>
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="sellerPromptService"
                          value="false"
                          onChange={formChange}
                        />{" "}
                        No
                      </label>
                      <label className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          name="sellerPromptService"
                          value="false"
                          onChange={formChange}
                        />{" "}
                        Did not contact
                      </label>
                    </div>
                  </div>
                </div>
                <div className="">
                  <label className="font-bold">Comment: </label>
                  <textarea
                    className="rounded-md w-full"
                    value={text}
                    onChange={handleTextChange}
                    maxLength={maxLength}
                  ></textarea>
                  <div className="flex items-center justify-between text-sm">
                    <div className="">No HTML</div>
                    <div className="">
                      Characters remaining:{" "}
                      <span className="text-red-400">{remainingChars}</span>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  The name show as per profile will be displayed with your
                  feedback.
                </div>
                <button className="btn btn-primary my-2" onClick={formSubmit}>
                  Submit Feedback
                </button>
                {alert.alert ? (
                  <div
                    className={`${
                      alert.type === "success" ? "bg-green-500" : "bg-red-500"
                    } text-white px-2 py-3 rounded-md w-auto`}
                  >
                    {alert.message}
                  </div>
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

const DeliveryFeedback = (props: feedbackProps) => {
  const [rating, setrating] = useState<number>(0);
  const [starrating, setstarrating] = useState<number>(0);
  const [startext, setstartext] = useState<string>("");

  const [collectdata, setcollectdata] = useState<sellerFeedbackProps>({
    sellerId: "",
    orderId: "",
    customerId: "",
    rating: 0,
    isItemArrrived: true,
    itemDesctibed: true,
    sellerPromptService: "",
    comment: "",
  });
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });

  const changeText = (val: number) => {
    if (val === 1) {
      setstartext("Awful");
      setrating(1);
    } else if (val === 2) {
      setstartext("Poor");
      setrating(2);
    } else if (val === 3) {
      setstartext("Fair");
      setrating(3);
    } else if (val === 4) {
      setstartext("Good");
      setrating(4);
    } else if (val === 5) {
      setstartext("Excellent");
      setrating(5);
    } else {
      setstartext("");
      setrating(0);
    }
  };
  const closeWindow = () => {
    props.closeWindow();
  };
  const formSubmit = (rating: number) => {
    const colte = collectdata;
    colte.rating = rating;
    colte.orderId = props.order._id;
    colte.sellerId = props.shopId;
    colte.customerId = localStorage.getItem("dkz_user_token")!;

    submitDeliveryFeedback(colte)
      .then((feedback: any) => {
        if (feedback?.type === "error") {
          setalert({
            alert: true,
            type: "error",
            message: "Something went wrong",
          });
        } else {
          setalert({
            alert: true,
            type: "success",
            message: "Thank you for your feedback",
          });
          setTimeout(() => {
            props.closeWindow();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const date = new Date(props.order.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDay() + 1;
  const year = date.getFullYear();
  return (
    <>
      <div className="fixed inset-0 bg-black/50">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="">Delivery feedback</div>
                <div className="">
                  <XMarkIcon
                    className="h-8 w-8 stroke-gray-400 fill-gray-400 rounded-md bg-white shadow-lg p-2 hover:cursor-pointer"
                    onClick={closeWindow}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="border border-gray-100 rounded-md p-4">
                <h2 className="px-4 text-xl">Rate your delivery experience</h2>
                <div className="px-3">
                  <div
                    className="flex items-center"
                    onMouseLeave={() => {
                      starrating === 0 ? setstartext("") : "";
                      setrating(0);
                    }}
                  >
                    <StarIcon
                      className={`w-10 ${
                        rating >= 1 || starrating >= 1
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(1)}
                      onClick={() => {
                        setstarrating(1);
                        formSubmit(1);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 2 || starrating >= 2
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(2)}
                      onClick={() => {
                        setstarrating(2);
                        formSubmit(2);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 3 || starrating >= 3
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(3)}
                      onClick={() => {
                        setstarrating(3);
                        formSubmit(3);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 4 || starrating >= 4
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(4)}
                      onClick={() => {
                        setstarrating(4);
                        formSubmit(4);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 5 || starrating >= 5
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(5)}
                      onClick={() => {
                        setstarrating(5);
                        formSubmit(5);
                      }}
                    />
                    {/* <div className="font-bold text-xl ml-4">{startext}</div> */}
                  </div>
                </div>
                {alert.alert ? (
                  <div
                    className={`${
                      alert.type === "success" ? "bg-green-500" : "bg-red-500"
                    } text-white px-2 py-3 rounded-md w-auto`}
                  >
                    {alert.message}
                  </div>
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

const ProductFeedback = (props: feedbackProps) => {
  const [rating, setrating] = useState<number>(0);
  const [starrating, setstarrating] = useState<number>(0);
  const [startext, setstartext] = useState<string>("");

  const [text, setText] = useState("");
  const [collectdata, setcollectdata] = useState<productFeedbackProps>({
    productId: "",
    productStockId: "",
    orderId: "",
    customerId: "",
    rating: 0,
    headline: "",
    attachment: [],
    review: "",
  });
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const maxLength = 400;

  // Function to handle text change in textarea
  const handleTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const e = event.target as HTMLTextAreaElement;
    setText(e.value);
    setcollectdata({ ...collectdata, review: e.value });
  };

  // Calculate remaining characters
  const remainingChars = maxLength - text.length;

  const changeText = (val: number) => {
    if (val === 1) {
      setstartext("Awful");
      setrating(1);
    } else if (val === 2) {
      setstartext("Poor");
      setrating(2);
    } else if (val === 3) {
      setstartext("Fair");
      setrating(3);
    } else if (val === 4) {
      setstartext("Good");
      setrating(4);
    } else if (val === 5) {
      setstartext("Excellent");
      setrating(5);
    } else {
      setstartext("");
      setrating(0);
    }
  };
  const closeWindow = () => {
    props.closeWindow();
  };
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };
  const formSubmit = () => {
    const colte = collectdata;
    colte.rating = starrating;
    colte.orderId = props.order._id;
    colte.customerId = localStorage.getItem("dkz_user_token")!;
    colte.productId =
      props.order.productDetail[props.shopId].productDetail.productId;
    colte.productStockId =
      props.order.productDetail[props.shopId].productDetail.stockId;
    if (colte.rating === 0) {
      setalert({
        alert: true,
        type: "error",
        message: "Star rating must required",
      });
      return;
    } else if (colte.review === "") {
      setalert({
        alert: true,
        type: "error",
        message: "Review cannot be empty",
      });
      return;
    }
    submitProductFeedback(colte)
      .then((feedback: any) => {
        if (feedback.type === "error") {
          setalert({
            alert: true,
            type: "error",
            message: "Something went wrong",
          });
        } else {
          setalert({
            alert: true,
            type: "success",
            message: "Thank you for your feedback",
          });
        }

        setTimeout(() => {
          props.closeWindow();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const date = new Date(props.order.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDay() + 1;
  const year = date.getFullYear();
  return (
    <>
      <div className="fixed inset-0 bg-black/50">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="">Create Review</div>
                <div className="">
                  <XMarkIcon
                    className="h-8 w-8 stroke-gray-400 fill-gray-400 rounded-md bg-white shadow-lg p-2 hover:cursor-pointer"
                    onClick={closeWindow}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="border border-t-black/50 border-b-black/50 border-r-transparent border-l-transparent py-4">
                <h2 className="">Overall rating</h2>
                <div className="">
                  <div
                    className="flex items-center"
                    onMouseLeave={() => {
                      starrating === 0 ? setstartext("") : "";
                      setrating(0);
                    }}
                  >
                    <StarIcon
                      className={`w-10 ${
                        rating >= 1 || starrating >= 1
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(1)}
                      onClick={() => {
                        setstarrating(1);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 2 || starrating >= 2
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(2)}
                      onClick={() => {
                        setstarrating(2);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 3 || starrating >= 3
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(3)}
                      onClick={() => {
                        setstarrating(3);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 4 || starrating >= 4
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(4)}
                      onClick={() => {
                        setstarrating(4);
                      }}
                    />
                    <StarIcon
                      className={`w-10 ${
                        rating >= 5 || starrating >= 5
                          ? "stroke-yellow-100 fill-yellow-400"
                          : "stroke-gray-400 fill-gray-100"
                      }`}
                      onMouseEnter={() => changeText(5)}
                      onClick={() => {
                        setstarrating(5);
                      }}
                    />
                    {/* <div className="font-bold text-xl ml-4">{startext}</div> */}
                  </div>
                </div>
              </div>
              <div className="border border-b-black/50 border-r-transparent border-l-transparent py-4">
                <h2 className="">Add a headline</h2>
                <div className="">
                  <input
                    className="rounded-md w-full p-2"
                    placeholder="What's most important to know?"
                    name="headline"
                    type="text"
                    onChange={formChange}
                  />
                </div>
              </div>
              <div className="border border-b-black/50 border-r-transparent border-l-transparent py-4">
                <h2 className="">Add a photo or video</h2>
                <small>
                  Shoppers find images and videos more helpful than text alone.
                </small>
                <div className="">
                  <input
                    className="rounded-md w-full p-1"
                    placeholder="What's most important to know?"
                    type="file"
                  />
                </div>
              </div>
              <div className="border border-b-black/50 border-r-transparent border-l-transparent py-4">
                <h2>Add a written review</h2>
                <div className="">
                  <textarea
                    className="w-full rounded-md"
                    rows={4}
                    onChange={handleTextChange}
                    placeholder="What did you like or disalike? What did you use this product for?"
                  ></textarea>
                </div>
              </div>
              <div className="py-3 flex justify-end">
                <button className="btn btn-primary" onClick={formSubmit}>
                  Submit
                </button>
              </div>
              {alert.alert ? (
                <div
                  className={`${
                    alert.type === "success" ? "bg-green-500" : "bg-red-500"
                  } text-white px-2 py-3 rounded-md w-auto`}
                >
                  {alert.message}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
