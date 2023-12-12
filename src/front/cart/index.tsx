import React, { useState, useEffect } from "react";

import {
  ArrowUturnLeftIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Layout from "../layout";
import LoginSetup, { ProductGrid } from "../category/product";
import {
  applyCoupon,
  checkCoupon,
  deleteCartItem,
  getCartItem,
  removedCoupon,
  updateCartChecked,
  updateCartQuantity,
} from "../query/customer";
import {
  AlertUserNotification,
  Preloader,
  imageURL,
} from "@/src/admin/data/stuff";
import { cartItemComponentProps } from "../types/product";
import { useRouter } from "next/router";
import { toaster } from "@/src/admin/types/basic";

const CartView = () => {
  return (
    <>
      <div className="">
        <Layout>
          <Content />
        </Layout>
      </div>
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [cartitem, setcartitem] = useState<any>();
  const [stockitem, setstockitem] = useState<any>();
  const [totalamt, settotalamt] = useState<any>();
  const [totalmrp, settotalmrp] = useState<any>();
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [toasterdata, settoasterdata] = useState<any>({
    isShow: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    getCartItem()
      .then((res) => {
        console.log(res.data.data);
        setcartitem(res.data.data);
        setstockitem(res.data.stock);
        settotalamt(res.data.total);
        settotalmrp(res.data.mrp);
        setshowpreloader(false);
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  }, [router.isReady]);

  const getCartItems = () => {
    getCartItem()
      .then((res) => {
        console.log(res.data.data);
        setcartitem(res.data.data);
        setstockitem(res.data.stock);
        settotalamt(res.data.total);
        settotalmrp(res.data.mrp);
        setshowpreloader(false);
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };

  const updateQty = (dd: any) => {
    setshowpreloader(true);
    updateCartQuantity(dd)
      .then((res) => {
        getCartItems();
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };
  const deleteCart = (dd: any) => {
    setshowpreloader(true);
    deleteCartItem(dd)
      .then((res) => {
        getCartItems();
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };
  const appliedCoupon = (dd: any) => {
    setshowpreloader(true);
    const colte = {
      accessToken: localStorage.getItem("dkz_user_token"),
      coupon: dd,
    };
    applyCoupon(colte)
      .then((res) => {
        getCartItem()
          .then((res) => {
            console.log(res.data.data);
            setcartitem(res.data.data);
            setstockitem(res.data.stock);
            settotalamt(res.data.total);
            settotalmrp(res.data.mrp);
            setshowpreloader(false);
          })
          .catch(() => {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: "error",
              message: "Something went wrong",
            });
            setshowpreloader(false);
            setTimeout(() => {
              settoasterdata({ ...toasterdata, isShow: false });
            }, 3000);
          });
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };

  const removeCoupon = (dd: any) => {
    setshowpreloader(true);
    const colte = {
      accessToken: localStorage.getItem("dkz_user_token"),
    };
    removedCoupon(colte)
      .then((res) => {
        getCartItem()
          .then((res) => {
            console.log(res.data.data);
            setcartitem(res.data.data);
            setstockitem(res.data.stock);
            settotalamt(res.data.total);
            settotalmrp(res.data.mrp);
            setshowpreloader(false);
          })
          .catch(() => {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: "error",
              message: "Something went wrong",
            });
            setshowpreloader(false);
            setTimeout(() => {
              settoasterdata({ ...toasterdata, isShow: false });
            }, 3000);
          });
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };
  const changeChecked = (dd: any) => {
    setshowpreloader(true);
    const colte = {
      accessToken: localStorage.getItem("dkz_user_token"),
      _id: dd._id,
      checked: dd.checked,
    };
    updateCartChecked(colte)
      .then((res) => {
        getCartItem()
          .then((res) => {
            console.log(res.data.data);
            setcartitem(res.data.data);
            setstockitem(res.data.stock);
            settotalamt(res.data.total);
            settotalmrp(res.data.mrp);
            setshowpreloader(false);
          })
          .catch(() => {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: "error",
              message: "Something went wrong",
            });
            setshowpreloader(false);
            setTimeout(() => {
              settoasterdata({ ...toasterdata, isShow: false });
            }, 3000);
          });
      })
      .catch(() => {
        settoasterdata({
          ...toasterdata,
          isShow: true,
          type: "error",
          message: "Something went wrong",
        });
        setshowpreloader(false);
        setTimeout(() => {
          settoasterdata({ ...toasterdata, isShow: false });
        }, 3000);
      });
  };
  return (
    <>
      {toasterdata.isShow ? (
        <AlertUserNotification
          type={toasterdata.type}
          message={toasterdata.message}
        />
      ) : (
        ""
      )}
      <div className="bg-gray-200 py-10 p-standard">
        {showpreloader ? (
          <Preloader />
        ) : (
          <>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="col-span-9">
                <CartItem
                  data={cartitem}
                  stock={stockitem}
                  total={totalamt}
                  updateQty={updateQty}
                  deleteCart={deleteCart}
                  changeChecked={changeChecked}
                />
              </div>
              <div className="col-span-3">
                <PriceDetails
                  data={cartitem}
                  stock={stockitem}
                  total={totalamt}
                  mrp={totalmrp}
                  appliedCoupon={appliedCoupon}
                  removeCoupon={removeCoupon}
                />
              </div>
            </div>
          </>
        )}
        <div className="">{/* <CartSuggestProduct /> */}</div>
      </div>
    </>
  );
};

const CartItem = (props: cartItemComponentProps) => {
  const [cartitem, setcartitem] = useState<any>([]);
  const [stockitem, setstockitem] = useState<any>([]);
  const [subtotal, setsubtotal] = useState<number>(0);
  useEffect(() => {
    console.log(props.data);
    setcartitem(props.data);
    setstockitem(props.stock);
  }, []);

  const updateQty = (dd: any) => {
    if (props.updateQty !== undefined) {
      props.updateQty(dd);
    }
  };
  const deleteCart = (dd: any) => {
    if (props.deleteCart !== undefined) {
      props.deleteCart(dd);
    }
  };
  const changeChecked = (dd: any) => {
    if (props.changeChecked !== undefined) {
      props.changeChecked(dd);
    }
  };
  return (
    <>
      <div className="bg-white p-3 rounded-sm">
        <h2 className="text-2xl font-semibold border-b border-b-gray-300 pb-2">
          Shopping Cart
        </h2>
        <div className="">
          {cartitem?.length !== 0 ? (
            <>
              {cartitem?.map((item: any, ix: number) => (
                <ProductCartGrid
                  data={item}
                  stock={stockitem[ix]}
                  updateQty={updateQty}
                  deleteCart={deleteCart}
                  changeChecked={changeChecked}
                />
              ))}
            </>
          ) : (
            <div className="">
              <div className="text-2xl text-center py-3 font-semibold border-b border-b-gray-300 pb-2">
                Cart Empty
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex justify-end text-lg py-2">
            <span className="">Subtotal ({cartitem?.length} Item(s)): </span>
            <div className="font-bold">
              <small>₹</small> {props.total}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductCartGrid = (props: cartItemComponentProps) => {
  const [showmoreqty, setshowmoreqty] = useState<boolean>(false);
  const [qty, setqty] = useState<number>(0);
  const [cqty, setcqty] = useState<number>(0);
  useEffect(() => {
    setqty(props.data.quantity);
  }, []);
  const changeQty = (e: React.FormEvent<HTMLSelectElement>) => {
    const val: any = e.currentTarget.value;
    if (val === "10") {
      setshowmoreqty(true);
      return;
    }
    const pint = parseInt(val);
    setqty(pint);
    const updateQty = {
      cartId: props.data._id,
      accessToken: localStorage.getItem("dkz_user_token"),
      quantity: pint,
    };
    if (props.updateQty !== undefined) {
      props.updateQty(updateQty);
    }
  };
  const updateQty = () => {
    if (cqty < 10) {
      // setshowmoreqty(false);
    }
    setshowmoreqty(false);
    const pint = cqty;
    setqty(pint);
    const updateQty = {
      cartId: props.data._id,
      accessToken: localStorage.getItem("dkz_user_token"),
      quantity: pint,
    };
    if (props.updateQty !== undefined) {
      props.updateQty(updateQty);
    }
  };
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const pint = parseInt(val);
    setcqty(pint);
  };
  const deleteCart = () => {
    const updateQty = {
      cartId: props.data._id,
      accessToken: localStorage.getItem("dkz_user_token"),
    };
    if (props.deleteCart !== undefined) {
      props.deleteCart(updateQty);
    }
  };
  const changeChecked = (e: React.MouseEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    const colte = { _id: props.data._id, checked: evt.checked };
    if (props.changeChecked) {
      props.changeChecked(colte);
    }
  };
  const brk = props.data.variantName.split("-");
  return (
    <>
      <div className="py-3 border-b-2 border-gray-200">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-3">
            <div className="relative">
              <img src={imageURL + props.stock?.images[0]} className="" />
              <div className="absolute top-1 left-3">
                <input
                  type="checkbox"
                  name="product"
                  checked={props.data.isChecked}
                  // value={dd.name}
                  onClick={changeChecked}
                  className="accent-primary h-4 w-4 rounded-sm border-gray-400"
                />
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <h5 className="font-bold text-lg">
              {props.data.productId.productInformation?.brand.name}
            </h5>
            <h2 className="text-lg">
              {props.data.productId.productInformation?.name}
            </h2>
            <div className="text-primary font-semibold text-lg">
              ₹{props.stock?.sellingPrice}
            </div>
            <p className="text-sm">
              Sold by:{" "}
              {
                props.data.productId.productInformation?.seller
                  .personalInfomration.name
              }
            </p>
            <p className="hidden">
              <div className="flex items-center gap-x-2 py-2">
                <ArrowUturnLeftIcon className="w-6" /> <b>14 days</b> return
                policy
              </div>
            </p>
            <div className="text-sm">
              {props.data.productId.productVariation.attributes.map(
                (attr: any, i: number) => (
                  <div className="flex">
                    <b>{attr}:&nbsp; </b> {brk[i]}
                  </div>
                )
              )}
            </div>
            <div className="flex items-center gap-x-3 py-2">
              <div className="border-r border-gray-200 pr-3">
                <select
                  className={`bg-gray-200 appearance-none rounded-full w-auto px-2 py-1 ${
                    showmoreqty ? "hidden" : "block"
                  }`}
                  onChange={changeQty}
                  value={qty}
                >
                  <option value="1">Qty: {qty}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10+</option>
                </select>
                <div className={`${showmoreqty ? "block" : "hidden"}`}>
                  <div className="flex items-center gap-x-1">
                    <div className="">
                      <input
                        type="text"
                        onKeyUp={formChange}
                        defaultValue="1"
                        className="p-0.5 w-16 border"
                      />
                    </div>
                    <div className="">
                      <button
                        className="bg-primary text-xs text-white p-0.5 px-1 rounded-sm"
                        onClick={updateQty}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-r-2 border-gray-200 pr-3">
                <button
                  className="text-blue-500 font-medium text-sm"
                  onClick={deleteCart}
                >
                  Delete
                </button>
              </div>
              <div className="border-r-2 border-gray-200 pr-3">
                <button className="text-blue-500 font-medium text-sm">
                  Save for later
                </button>
              </div>
              <div className="hidden">
                <button className="text-blue-500 font-medium text-sm">
                  See more like this
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const PriceDetails = (props: cartItemComponentProps) => {
  const router = useRouter();
  const [showcoupon, setshowcoupon] = useState<boolean>(false);
  const [showlogin, setshowlogin] = useState<boolean>(false);
  const [cartitem, setcartitem] = useState<any>();
  const [discount, setdiscount] = useState<number>(0);
  const [coupondetails, setcoupondetails] = useState<any>();
  useEffect(() => {
    setcartitem(props.data);
    props.data.map((dd: any) => {
      if (dd.discount && dd.discount !== undefined) {
        setcoupondetails({
          discount: dd.discount.discount,
          code: dd.discount.code,
        });
        if (dd.discount.discountType === "percent" && props.total) {
          var totalValue: any =
            props.total - (props.total * dd.discount.discount) / 100;

          setdiscount(props.total - totalValue);
        } else if (dd.discount.discountType === "amount" && props.total) {
          setdiscount(dd.discount.discount);
        }
      }
    });
  }, []);
  const hideCoupon = () => {
    setshowcoupon(false);
  };
  const showCoupon = () => {
    setshowcoupon(true);
  };
  const hideLoginpopup = () => {
    setshowlogin(false);
  };
  const showLoginpopup = () => {
    setshowlogin(true);
  };
  const appliedCoupon = (dd: any) => {
    if (props.appliedCoupon) {
      props.appliedCoupon(dd);
    }
  };
  const removeCoupon = (dd: any) => {
    if (props.removeCoupon) {
      props.removeCoupon();
    }
  };
  const proceedCheckout = () => {
    router.push("/checkout");
  };
  return (
    <>
      {showcoupon ? (
        <CouponPopup hideCoupon={hideCoupon} appliedCoupon={appliedCoupon} />
      ) : (
        ""
      )}

      {showlogin ? <LoginSetup hidePopup={hideLoginpopup} /> : ""}
      <div className="">
        <div className="bg-white p-3 rounded-sm">
          <div className="border-b border-gray-300">
            <div className="font-bold text-lg py-2">Coupons</div>
            <div className="py-2">
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-1">
                  <TagIcon className="w-4" />
                </div>
                <div className="col-span-8">
                  <h2 className="font-bold text-sm">
                    {coupondetails !== undefined
                      ? coupondetails.code
                      : "Apply Coupons"}
                  </h2>
                </div>
                <div className="col-span-3">
                  {coupondetails !== undefined ? (
                    <button
                      className="bg-primary px-4 py-2 font-semibold rounded-md text-sm text-white"
                      onClick={removeCoupon}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-primary px-4 py-2 font-semibold rounded-md text-sm text-white"
                      onClick={showCoupon}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between text-sm py-2">
              <span className="">
                Price details ({cartitem?.length} items){" "}
              </span>
            </div>
            <div className="flex justify-between text-md py-2">
              <span className="">Total MRP </span>
              <div className="font-bold">
                <small>₹</small> {props.mrp}
              </div>
            </div>
            <div className="flex justify-between text-md py-2">
              <span className="">Discount on MRP </span>
              <div className="font-bold">
                <small>₹</small>{" "}
                {props.total && props.mrp
                  ? (props.total - props.mrp).toFixed(2)
                  : 0}
              </div>
            </div>
            {discount !== 0 ? (
              <div className="flex justify-between text-md py-2">
                <span className="">Coupon Discount </span>
                <div className="font-bold">
                  <small>₹</small> {discount.toFixed(2)}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-between text-md font-bold py-2">
              <span className="">Total Amount </span>
              <div className="font-bold">
                <small>₹</small>{" "}
                {props.total ? (props.total - discount).toFixed(2) : 0}
              </div>
            </div>
            <div className="py-2">
              <button
                className="w-full bg-primary text-white font-semibold text-center text-lg py-2 rounded-md"
                onClick={proceedCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type couponProps = {
  hideCoupon: Function;
  appliedCoupon: Function;
};
const CouponPopup = (props: couponProps) => {
  const [coupon, setcoupon] = useState<string>("");
  const [couponapplied, setcouponapplied] = useState<any>();
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcoupon(evt.value);
  };
  const checkCouponCode = () => {
    setshowtoaster(false);
    if (coupon === "") {
      setshowtoaster(true);
      settoasterdata({ type: "error", message: "Coupon required" });
      return;
    }
    const colte = {
      accessToken: localStorage.getItem("dkz_user_token"),
      code: coupon,
    };
    checkCoupon(colte)
      .then((res) => {
        setshowtoaster(true);
        settoasterdata({ type: res.data.type, message: res.data.message });
        if (res.data.type === "success") {
          setcouponapplied(res.data.data);
        }
      })
      .catch((err) => {
        setshowtoaster(true);
        settoasterdata({ type: "error", message: "Something went wrong!" });
      });
  };
  const appliedCouponCode = () => {
    if (couponapplied === undefined) {
      setshowtoaster(true);
      settoasterdata({ type: "error", message: "Coupon not valid!" });
      return;
    }
    props.appliedCoupon(couponapplied);
    props.hideCoupon();
  };
  const hideCoupon = () => {
    props.hideCoupon();
  };
  return (
    <>
      <div className="fixed bg-black/50 z-30 inset-0">
        <div className="bg-white max-w-xl mx-auto relative top-10">
          <div className="border-b border-gray-300">
            <div className="flex justify-between border-b border-gray-300 py-4 p-3">
              <div className="font-bold text-sm">Apply Coupon</div>
              <div className="">
                <XMarkIcon
                  className="w-6 hover:cursor-pointer"
                  onClick={hideCoupon}
                />
              </div>
            </div>
          </div>
          <div className="px-3 py-5">
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 rounded-md border border-gray-300 placeholder-gray-300"
                placeholder="Enter coupon code"
                autoFocus={true}
                onChange={changeForm}
              />
              {showtoaster ? (
                <div className="py-1">
                  <div
                    className={`${
                      toasterdata.type === "error" ||
                      toasterdata.type === "info"
                        ? "bg-red-500"
                        : "bg-green-500"
                    } px-3 py-2 text-white text-md rounded-md`}
                  >
                    {toasterdata.message}
                  </div>
                </div>
              ) : (
                ""
              )}
              <button
                className="uppercase font-bold absolute right-3 top-[12px] tracking-wider text-primary"
                onClick={checkCouponCode}
              >
                Check
              </button>
            </div>
          </div>
          <div className="px-3 border-t border-gray-300">
            <div className="grid grid-cols-12">
              <div className="col-start-7 col-span-6 py-3">
                <button
                  className="bg-primary w-full text-white py-2 rounded-md"
                  onClick={appliedCouponCode}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CartSuggestProduct = () => {
  return (
    <>
      <div className="bg-transparent p-3 rounded-sm my-5">
        <h2 className="text-2xl font-semibold border-b border-b-gray-300 pb-2 mb-5">
          You may also like
        </h2>
        <div className="grid grid-cols-6">{/* <ProductGrid /> */}</div>
      </div>
    </>
  );
};

export default CartView;
