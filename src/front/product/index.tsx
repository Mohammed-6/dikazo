import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { FaHome } from "react-icons/fa";
import { ProductGrid } from "../category/product";

import { useRouter } from "next/router";
import {
  AlertUserNotification,
  Preloader,
  calculatePercentage,
  imageURL,
} from "@/src/admin/data/stuff";
import { loadProductDetails } from "../query/product";
import {
  arrProductStockProps,
  productAlsoLikedComponentProps,
  productDetailsComponentProps,
  productImageComponentProps,
  productProps,
  productReviewComponentProps,
  productSimilarComponentProps,
} from "../types/product";

import LoginSetup from "../category/product";
import { buyNowProduct, wishlistProduct } from "../query/customer";
import { PageContent } from "../homepage";
import { getPageData } from "../query/homepage";
const Product = () => {
  return (
    <>
      <Layout>
        <div className="">
          <Content />
        </div>
      </Layout>
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [showpreloader1, setshowpreloader1] = useState<boolean>(false);
  const [productdata, setproductdata] = useState<productProps>();
  const [similardata, setsimilardata] = useState<productProps>();
  const [alsolikeddata, setalsolikeddata] = useState<productProps>();
  const [imagedata, setimagedata] = useState<any>();
  const [productstock, setproductstock] = useState(arrProductStockProps);
  const [colorlist, setcolorlist] = useState<any>();

  useEffect(() => {
    console.log(router.query);
    if (router.query.url !== "" && router.query.url !== undefined) {
      setshowpreloader(true);
      loadProductDetails(router.query.url as string)
        .then((product) => {
          setsimilardata(product.data.similar);
          setalsolikeddata(product.data.alsoliked);
          setproductdata(product.data.data);
          setimagedata(product.data.data.productImages.images);
          setproductstock(product.data.stock);
          setcolorlist(product.data.color);
          setshowpreloader(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router.isReady]);
  const changeVariant = (dd: any) => {
    // console.log(dd);
    setshowpreloader(true);
    setimagedata(dd);
    setshowpreloader(false);
  };
  const loadPreloader = (dd: boolean) => {
    setshowpreloader1(dd);
  };
  return (
    <>
      {showpreloader1 ? <Preloader /> : ""}
      <div className="p-standard px-10">
        {showpreloader ? (
          <Preloader />
        ) : (
          <>
            <div className="py-2 flex items-center">
              <FaHome className="text-md" />
              &nbsp;/&nbsp; Product &nbsp;/&nbsp;{" "}
              {productdata?.productInformation.name}
            </div>
            <div className="grid grid-cols-12 gap-x-16">
              <div className="col-span-5">
                <ImageMignifiers bundle={imagedata} />
              </div>
              <div className="col-span-7">
                <ProductDetails
                  bundle={productdata}
                  stock={productstock}
                  color={colorlist}
                  changeVariant={changeVariant}
                  loadPreloader={loadPreloader}
                />
              </div>
            </div>
            <DetailsReview bundle={productdata} />
            <SimilarProducts bundle={similardata} />
            <CustomerAlsoLiked bundle={alsolikeddata} />
          </>
        )}
      </div>
    </>
  );
};

const ImageMignifiers = (props: productImageComponentProps) => {
  return (
    <>
      <div className="">
        <Carousel
          showArrows={true}
          renderArrowPrev={(clickHandler, hasPrev) => {
            return (
              <div
                className={`${
                  hasPrev ? "absolute" : "hidden"
                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
                <ChevronLeftIcon className="w-9 h-9 text-black" />
              </div>
            );
          }}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              <div
                className={`${
                  hasNext ? "absolute" : "hidden"
                } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
                <ChevronRightIcon className="w-9 h-9 text-black" />
              </div>
            );
          }}
        >
          {props.bundle?.map((image: string) => (
            <div>
              <img src={imageURL + image} className="w-[500px] h-auto" />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

const ProductDetails = (props: productDetailsComponentProps) => {
  const [productdata, setproductdata] = useState<any>();
  const [productstock, setproductstock] = useState(arrProductStockProps);
  const [currentvariant, setcurrentvariant] = useState<number>(0);
  const [vcombo, setvcombo] = useState<any>([]);
  const [stockvariant, setstockvariant] = useState<any>([]);
  const [selectedvariant, setselectedvariant] = useState<string>("");
  const [toasterdata, settoasterdata] = useState<any>({
    isShow: false,
    type: "",
    message: "",
  });
  const [showlogin, setshowlogin] = useState<boolean>(false);
  const [qty, setqty] = useState(0);
  useEffect(() => {
    console.log(props);
    setproductdata(props.bundle);
    setproductstock(props.stock);
    productdata?.productVariation.attributes.map(() => {
      setvcombo([...vcombo, ""]);
    });
    const tempt: any = [];
    props.stock.map((stock: any) => {
      tempt.push(stock.variantName);
    });
    // console.log(tempt);
    setstockvariant([...stockvariant, tempt]);
  }, []);
  const showLogin = () => {
    setshowlogin(!showlogin);
  };

  const increaseQty = () => {
    setqty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty > 0) {
      setqty(qty - 1);
    }
  };

  // Function to check if the desired combination exists
  const checkVariationExists = (desiredVariation: any) => {
    const variantCombinations = stockvariant[0];
    const permutations = permute(desiredVariation);
    for (const permutation of permutations) {
      const combinationString = permutation.join("-");
      if (variantCombinations.includes(combinationString)) {
        return combinationString;
      }
    }
    return false;
  };

  // Function to generate permutations
  const permute = (array: any) => {
    const result: any = [];

    const permuteHelper = (arr: any, current = []) => {
      if (arr.length === 0) {
        result.push(current);
        return;
      }

      for (let i = 0; i < arr.length; i++) {
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        permuteHelper(remaining, current.concat(arr[i]));
      }
    };

    permuteHelper(array);
    return result;
  };
  const selectVariation = (variantid: string, i: number) => {
    const temp = [...vcombo];
    temp[i] = variantid;
    setvcombo(temp);
    // Example desired variation to check
    const desiredVariation = temp;

    const exists = checkVariationExists(desiredVariation);
    // console.log(temp, exists);
    if (exists !== false) {
      setselectedvariant(exists);
      productstock.map((stk, i) => {
        if (stk.variantName === exists) {
          if (stk.quantity > 0) {
            setcurrentvariant(i);
            props.changeVariant(stk.images);
          } else {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: "error",
              message: "Product stock unavailable.",
            });
          }
        }
      });
    }
  };

  const buyNow = () => {
    if (
      localStorage.getItem("dkz_user_token") !== undefined &&
      localStorage.getItem("dkz_user_token") !== null
    ) {
      if (productdata?.productVariation.attributes.length > 0) {
        if (selectedvariant === "") {
          settoasterdata({
            ...toasterdata,
            isShow: true,
            type: "error",
            message: "Please select a variant",
          });
          setTimeout(() => {
            settoasterdata({ ...toasterdata, isShow: false });
          }, 3000);
        } else {
          const colte = {
            productId: props.bundle._id,
            variantName: selectedvariant,
            accessToken: localStorage.getItem("dkz_user_token"),
            quantity: 1,
          };
          props.loadPreloader(true);
          buyNowProduct(colte)
            .then((res) => {
              console.log(res);
              if (res.data.loginError) {
                settoasterdata({
                  ...toasterdata,
                  isShow: true,
                  type: "error",
                  message: "Login invalid",
                });
                setTimeout(() => {
                  settoasterdata({ ...toasterdata, isShow: false });
                }, 3000);
                setshowlogin(true);
                props.loadPreloader(false);
              } else {
                settoasterdata({
                  ...toasterdata,
                  isShow: true,
                  type: res.data.type,
                  message: res.data.message,
                });
                setTimeout(() => {
                  settoasterdata({ ...toasterdata, isShow: false });
                }, 3000);
                props.loadPreloader(false);
              }
            })
            .catch(() => {
              settoasterdata({
                ...toasterdata,
                isShow: true,
                type: "error",
                message: "Something went wrong",
              });
              setTimeout(() => {
                settoasterdata({ ...toasterdata, isShow: false });
              }, 3000);
              props.loadPreloader(false);
            });
        }
      } else {
        const colte = {
          productId: props.bundle._id,
          variantName: props.stock[0].variantName,
          accessToken: localStorage.getItem("dkz_user_token"),
          quantity: 1,
        };
        props.loadPreloader(true);
        buyNowProduct(colte)
          .then((res) => {
            console.log(res);
            if (res.data.loginError) {
              settoasterdata({
                ...toasterdata,
                isShow: true,
                type: "error",
                message: "Login invalid",
              });
              setTimeout(() => {
                settoasterdata({ ...toasterdata, isShow: false });
              }, 3000);
              setshowlogin(true);
              props.loadPreloader(false);
            } else {
              settoasterdata({
                ...toasterdata,
                isShow: true,
                type: res.data.type,
                message: res.data.message,
              });
              setTimeout(() => {
                settoasterdata({ ...toasterdata, isShow: false });
              }, 3000);
              props.loadPreloader(false);
            }
          })
          .catch(() => {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: "error",
              message: "Something went wrong",
            });
            setTimeout(() => {
              settoasterdata({ ...toasterdata, isShow: false });
            }, 3000);
            props.loadPreloader(false);
          });
      }
    } else {
      settoasterdata({
        ...toasterdata,
        isShow: true,
        type: "error",
        message: "Please Login",
      });
      setTimeout(() => {
        settoasterdata({ ...toasterdata, isShow: false });
      }, 3000);
      setshowlogin(true);
    }
  };

  const wishlistNow = () => {
    if (
      localStorage.getItem("dkz_user_token") !== undefined &&
      localStorage.getItem("dkz_user_token") !== null
    ) {
      const colte = {
        productId: props.bundle._id,
        variant: selectedvariant,
        accessToken: localStorage.getItem("dkz_user_token"),
      };
      props.loadPreloader(true);
      wishlistProduct(colte)
        .then((res) => {
          console.log(res);
          if (res.data.loginError) {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: "error",
              message: "Login invalid",
            });
            setTimeout(() => {
              settoasterdata({ ...toasterdata, isShow: false });
            }, 3000);
            setshowlogin(true);
            props.loadPreloader(false);
          } else {
            settoasterdata({
              ...toasterdata,
              isShow: true,
              type: res.data.type,
              message: res.data.message,
            });
            setTimeout(() => {
              settoasterdata({ ...toasterdata, isShow: false });
            }, 3000);
            props.loadPreloader(false);
          }
        })
        .catch(() => {
          settoasterdata({
            ...toasterdata,
            isShow: true,
            type: "error",
            message: "Something went wrong",
          });
          setTimeout(() => {
            settoasterdata({ ...toasterdata, isShow: false });
          }, 3000);
          props.loadPreloader(false);
        });
    } else {
      settoasterdata({
        ...toasterdata,
        isShow: true,
        type: "error",
        message: "Please Login",
      });
      setTimeout(() => {
        settoasterdata({ ...toasterdata, isShow: false });
      }, 3000);
      props.loadPreloader(false);
      setshowlogin(true);
    }
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
      {showlogin ? <LoginSetup hidePopup={showLogin} /> : ""}
      <div className="grid grid-cols-2">
        <div className="">
          <div className="">
            {/* Brand: <b>{productdata.brd[0].name}</b> */}
          </div>
          <div className="font-semibold text-2xl leading-relaxed">
            {productdata?.productInformation.name}
          </div>
          <div className="flex gap-x-0 items-center">
            <div className="text-xl font-semibold">5.0&nbsp;</div>
            <StarIcon className="w-6 fill-yellow-500 stroke-yellow-500" />
            <StarIcon className="w-6 fill-yellow-500 stroke-yellow-500" />
            <StarIcon className="w-6 fill-yellow-500 stroke-yellow-500" />
            <StarIcon className="w-6 fill-yellow-500 stroke-yellow-500" />
            <StarIcon className="w-6 fill-yellow-500 stroke-yellow-500" />
          </div>
          <hr className="border border-gray-300 m-2" />
          {productstock.map((stk, i) => (
            <>
              {i === currentvariant ? (
                <div className="">
                  <div className="flex items-center font-bold gap-x-5 py-3">
                    {calculatePercentage(stk.sellingPrice, stk.mrp) > 0 ? (
                      <>
                        <div className="text-red-500 text-2xl px-2 py-1">
                          -{calculatePercentage(stk.sellingPrice, stk.mrp)}%
                        </div>

                        <div className="text-primary text-3xl font-bold relative">
                          <div className="absolute text-sm -left-2 -top-0">
                            ₹
                          </div>
                          {stk.sellingPrice}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-md text-gray-500">
                    <del>M.R.P:&nbsp;₹{stk.mrp}</del>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
          <div className="hidden">
            <div className="flex items-center gap-x-3 my-4 custom-number-input h-10 w-32">
              <label
                htmlFor="custom-input-number"
                className="w-full text-gray-700 text-sm font-semibold"
              >
                Quantity
              </label>
              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                  onClick={decreaseQty}
                  data-action="decrement"
                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                  name="custom-input-number"
                  value={qty}
                ></input>
                <button
                  onClick={increaseQty}
                  data-action="increment"
                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
          </div>
          {productdata?.productVariation.attributes.map(
            (attr: any, i: number) => (
              <div className="pt-4">
                <div className="font-semibold text-lg">Select {attr}</div>
                <div className="flex overflow-auto gap-x-2 pb-5">
                  {productdata.productVariation.variation[i] !== undefined &&
                    productdata.productVariation.variation[i].map(
                      (v: any, x: number) => (
                        <div
                          className={`border-2 border-gray-200 h-auto w-auto py-2 px-4 text-md bg-white text-center font-semibold whitespace-nowrap hover:cursor-pointer ${
                            vcombo[i] === v ? "border-2 border-primary" : ""
                          }`}
                          onClick={() => selectVariation(v, i)}
                        >
                          <div className="flex items-center gap-x-2">
                            {attr.toLowerCase() === "color"
                              ? props.color.map((c: any) => (
                                  <>
                                    {v === c.name ? (
                                      <div
                                        className={`h-4 w-4 rounded-full`}
                                        style={{ background: c.code }}
                                      ></div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ))
                              : ""}
                            <div className="">{v}</div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            )
          )}
          {productdata?.addtionalIformation.map((addinfo: any, k: number) => (
            <>
              {addinfo.information.map((info: any, i: number) => (
                <>
                  <div className="grid grid-cols-12 text-[18px] items-start gap-x-6 py-0.5">
                    <div className="text-bold col-span-3">{info.name}</div>
                    <div className="col-span-9">{info.description}</div>
                  </div>
                </>
              ))}
            </>
          ))}
          <hr className="border border-gray-300 mr-2" />
          <div className="pt-3 pb-0 text-bold text-xl">About this item</div>
          <ul className="list-disc p-2">
            {productdata?.aboutItem.map((info: any, i: number) => (
              <>
                <li className="py-0.5 whitespace-pre-line">{info}</li>
              </>
            ))}
          </ul>
        </div>
        <div className="border border-gray-500 rounded-md p-6 mx-2 h-fit">
          <div className="">
            <div className="">
              <button
                className="uppercase w-full items-center bg-primary text-white px-4 py-3 rounded-full font-semibold text-md"
                onClick={buyNow}
              >
                <div className="flex items-center justify-center gap-x-2">
                  <ShoppingBagIcon className="w-8 stroke-white" /> Add to cart
                </div>
              </button>
            </div>
            <div className="py-3">
              <button
                className="uppercase w-full items-center bg-white border border-gray-300 text-black px-4 py-3 rounded-full font-semibold text-md"
                onClick={wishlistNow}
              >
                <div className="flex items-center justify-center gap-x-2">
                  <HeartIcon className="w-8 stroke-black" /> Wishlist
                </div>
              </button>
            </div>
          </div>
          <div className="">
            <div className="flex gap-x-2 items-center py-5">
              <div className="font-semibold">Delivery:</div>
              <div className="">
                <input
                  type="text"
                  className="bg-gray-200 text-gray-700 rounded-md px-2 py-3"
                  placeholder="Enter your pincode"
                />
              </div>
              <div className="">
                <button className="bg-primary font-semibold text-white px-4 py-3 rounded-md">
                  Check
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <ul>
              {productdata?.cod ? (
                <li>
                  <div className="flex gap-x-2">
                    <div>
                      <CheckIcon className="w-6  stroke-gray-700" />
                    </div>
                    <div className="text-sm">
                      <b>COD</b> Available
                    </div>
                  </div>
                </li>
              ) : (
                ""
              )}
              <li>
                <div className="flex gap-x-2">
                  <div>
                    <CheckIcon className="w-6  stroke-gray-700" />
                  </div>
                  <div className="text-sm">
                    Shipping all over <b>India</b>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-x-2">
                  <div>
                    <CheckIcon className="w-6  stroke-gray-700" />
                  </div>
                  <div className="text-sm">
                    Delivered in 3-6 <b>Working Days</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailsReview = (props: productReviewComponentProps) => {
  const [active, setactive] = useState(true);
  const [active1, setactive1] = useState(false);

  const changeActive = () => {
    setactive(true);
    setactive1(false);
  };
  const changeActive1 = () => {
    setactive(false);
    setactive1(true);
  };
  return (
    <>
      <div className="">
        <h2 className="text-bold text-xl py-3">Product Description</h2>
        <DetailsSection bundle={props.bundle} />
      </div>
    </>
  );
};

const DetailsSection = (props: productReviewComponentProps) => {
  const [structureid, setstructureid] = useState<string>();
  const [structure, setstructure] = useState<any>();
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    getPageData(props.bundle?.productDescription)
      .then((hm) => {
        setstructure(hm.data.data);
        setstructureid(hm.data.structureId);
        setloading(true);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      {loading ? (
        <>
          <PageContent
            structureid={structureid}
            structure={structure}
            parent="main"
          />

          <ReviewSection />
        </>
      ) : (
        ""
      )}
    </>
  );
};

const ReviewSection = () => {
  return (
    <>
      <div className="py-10">
        <div className="w-1/2">
          <div className="grid grid-cols-12 bg-gray-200 rounded-xl p-5">
            <div className="col-span-6">
              <h5 className="font-bold">
                <span>0.0</span>/5
              </h5>
              <h4 className="font-semibold">Based on 0 Reviews</h4>
              <div className="ratings-container ">
                <div className="product-ratings">
                  <span
                    className="ratings"
                    style={{ width: "calc(0.0 * 20%)" }}
                  ></span>

                  <span className="tooltiptext tooltip-top">
                    <div className="flex items-center gap-x-1">
                      <StarIcon className="w-5 fill-gray-500 stroke-gray-500" />
                      <StarIcon className="w-5 fill-gray-500 stroke-gray-500" />
                      <StarIcon className="w-5 fill-gray-500 stroke-gray-500" />
                      <StarIcon className="w-5 fill-gray-500 stroke-gray-500" />
                      <StarIcon className="w-5 fill-gray-500 stroke-gray-500" />
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="">
                <div className="flex gap-x-4 items-center">
                  <div>5&nbsp;Star</div>
                  <div className="bg-gray-300 rounded-full h-3 w-full"></div>
                </div>
                <div className="flex gap-x-4 items-center">
                  <div>4&nbsp;Star</div>
                  <div className="bg-gray-300 rounded-full h-3 w-full"></div>
                </div>
                <div className="flex gap-x-4 items-center">
                  <div>3&nbsp;Star</div>
                  <div className="bg-gray-300 rounded-full h-3 w-full"></div>
                </div>
                <div className="flex gap-x-4 items-center">
                  <div>2&nbsp;Star</div>
                  <div className="bg-gray-300 rounded-full h-3 w-full"></div>
                </div>
                <div className="flex gap-x-4 items-center">
                  <div>1&nbsp;Star</div>
                  <div className="bg-gray-300 rounded-full h-3 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h6 className="font-semibold py-3">
          Real Image and video from Customers
        </h6>
        <span className="">No Reviews Found</span>
      </div>
    </>
  );
};

const SimilarProducts = (props: productSimilarComponentProps) => {
  return (
    <>
      <div className="">
        <h2 className="uppercase font-semibold text-lg pt-10">
          Similar products
        </h2>
        <div className="grid grid-cols-6 py-10">
          {props.bundle.map((item: any, i: number) => (
            <div key={i}>
              <ProductGrid data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const CustomerAlsoLiked = (props: productAlsoLikedComponentProps) => {
  return (
    <>
      {props.bundle?.length > 0 ? (
        <div className="">
          <h2 className="uppercase font-semibold text-lg pt-10">
            Customer also liked
          </h2>
          <div className="grid grid-cols-6 py-10">
            <div className="">
              {props.bundle.map((item: any, i: number) => (
                <div key={i}>
                  <ProductGrid data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Product;
