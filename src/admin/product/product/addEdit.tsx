import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Layout from "../../layout";
import Link from "next/link";
import { WithContext as ReactTags } from "react-tag-input";
import {
  createProduct,
  editProduct,
  listProductResource,
  updateProduct,
  updateVariation,
} from "../../query/product/product";
import {
  componentProps,
  customTagsProps,
  individualVariantProps,
  loadResourceProps,
  multiVariantProps,
  productProps,
  productVariant,
  singleVariantProps,
  variantProps,
  variationRowProp,
} from "../../types/product/product";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { uploadMultipleFile, uploadSingleFile } from "../../query/upload";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { toaster } from "../../types/basic";
import { MiniPreLoader, Preloader } from "../../data/stuff";

const AddEdit = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const router = useRouter();
  const [loadResource, setLoadResource] = useState<loadResourceProps>({
    attribute: [],
    color: [],
    brand: [],
    category: [],
    seller: [],
  });
  const [collectdata, setcollectdata] = useState<productProps>({
    _id: "",
    productInformation: {
      name: "",
      brand: "",
      seller: "",
      unit: "",
      packOf: "",
      weight: "",
      minPurchaseQty: "",
      tags: [],
      barcode: "",
      refundable: false,
      height: 0,
      widht: 0,
      length: 0,
      breadth: 0,
    },
    productImages: {
      images: [],
      thumbnail: "",
    },
    productVideos: {
      videoProvider: "",
      videoLink: "",
    },
    productVariation: {
      isColor: true,
      colorList: [],
      attributes: [],
      variation: [],
      convertVarient: [],
    },
    productStocks: {
      unitPrice: 0,
      sellingPrice: 0,
      sellerPrice: 0,
      discountFrom: "",
      discountTo: "",
      discount: 0,
      sku: "",
      hsn: 0,
      quantity: 0,
      discountType: "",
      setPoint: 0,
      externalLink: "",
      externalLinkText: "",
    },
    productDescription: "",
    keyDescription: "",
    pdfSpecification: "",
    seoMetaTags: {
      url: "",
      title: "",
      description: "",
      image: "",
    },
    category: [],
    shippingConfig: {
      freeShipping: false,
      flatRate: false,
      shippingCost: 0,
      isProductQtyMultiple: false,
    },
    lowStockQuantityWarning: 1,
    stockVisibilityState: {
      showStockQuantity: false,
      showStockWithTextOnly: false,
      hideStock: false,
    },
    cod: true,
    featured: false,
    todaysDeal: false,
    publishedStatus: true,
    approvedStatus: true,
    addedBy: "",
    estimatedShippingTime: 2,
    feeAndCharges: {
      platFormFee: 0,
      paymentGatewayFee: 0,
      gst: 0,
    },
    productStock: [],
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [stockdata, setstockdata] = useState<any>();
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    const ud = JSON.parse(localStorage.getItem("adminUserData")!);
    setcollectdata({ ...collectdata, addedBy: ud.id });
    setloading(false);
    listProductResource().then((product) => {
      setLoadResource(product.data);
    });
    if (router.query.editid !== "" && router.query.editid !== undefined) {
      editProduct(router.query.editid as string).then((resp) => {
        setcollectdata(resp.data.data);
        // setcollectdata({
        //   ...collectdata,
        //   productStock: resp.data.stock,
        // });
        setstockdata(resp.data.stock);
        console.log(resp.data.data);
        setshowtoaster(false);
        setshowpreloader(false);
        // props.closePopUp();
        setloading(true);
      });
    } else {
      setloading(true);
    }
    collectdata;
  }, [router.isReady]);
  const schema = {
    productInformation: {
      name: "",
      brand: "",
      unit: "",
      weight: "",
      minPurchaseQty: "",
      tags: [],
      barcode: "",
      refundable: false,
    },
    productImages: {
      images: [],
      thumbnail: "",
    },
    productVideos: {
      videoProvider: "",
      videoLink: "",
    },
    productVariation: {},
    productStocks: {
      unitPrice: 0,
      discountFrom: "",
      discountTo: "",
      discount: 0,
      setPoint: 0,
      externalLink: "",
      externalLinkText: "",
      variationPricing: [
        {
          variant: "",
          price: 0,
          sku: "",
          quantity: 0,
          image: "",
        },
      ],
    },
    productDescription: "",
    pdfSpecification: "",
    seoMetaTags: {
      title: "",
      description: "",
      image: "",
    },
    category: [],
    ShippingConfig: {
      freeShipping: false,
      flatRate: false,
      shippingCose: 0,
      isProductQtyMultiple: false,
    },
    lowStockQuantityWarning: 1,
    stockVisibilityState: {
      showStockQuantity: false,
      showStockWithTextOnly: false,
      hideStock: false,
    },
    cod: true,
    featured: false,
    todaysDeal: false,
    estimatedShippingTime: 2,
    feeAndCharges: {
      platFormFee: 0,
      paymentGatewayFee: 0,
      gst: 0,
    },
    productStock: [],
  };
  const formReturnFAC = (e: any) => {
    setcollectdata({
      ...collectdata,
      feeAndCharges: { ...collectdata.feeAndCharges, [e.name]: e.val },
    });
  };
  const formReturnEST = (e: any) => {
    setcollectdata({
      ...collectdata,
      estimatedShippingTime: e.val,
    });
  };
  const formReturnTD = (e: any) => {
    setcollectdata({
      ...collectdata,
      todaysDeal: e.val,
    });
  };
  const formReturnFT = (e: any) => {
    setcollectdata({
      ...collectdata,
      featured: e.val,
    });
  };
  const formReturnCOD = (e: any) => {
    setcollectdata({
      ...collectdata,
      cod: e.val,
    });
  };
  const formReturnSVS = (e: any) => {
    setcollectdata({
      ...collectdata,
      stockVisibilityState: {
        ...collectdata.stockVisibilityState,
        [e.name]: e.val,
      },
    });
  };
  const formReturnLSQW = (e: any) => {
    setcollectdata({
      ...collectdata,
      lowStockQuantityWarning: e.val,
    });
  };
  const formReturnSU = (e: any) => {
    setcollectdata({
      ...collectdata,
      shippingConfig: { ...collectdata.shippingConfig, [e.name]: e.val },
    });
  };
  const formReturnCAT = (e: any) => {
    setcollectdata({
      ...collectdata,
      category: e.val,
    });
    console.log({
      ...collectdata,
      category: e.val,
    });
  };
  const formReturnSEO = (e: any) => {
    setcollectdata({
      ...collectdata,
      seoMetaTags: { ...collectdata.seoMetaTags, [e.name]: e.val },
    });
  };
  const formReturnPDF = (e: any) => {
    setcollectdata({
      ...collectdata,
      pdfSpecification: e,
    });
  };
  const formReturnDESC = (e: any) => {
    setcollectdata({
      ...collectdata,
      productDescription: e,
    });
  };
  const formReturnSTCK = (e: any) => {
    setcollectdata({
      ...collectdata,
      productStocks: { ...collectdata.productStocks, [e.name]: e.val },
    });
    console.log(collectdata);
  };
  const formReturnPVideo = (e: any) => {
    setcollectdata({
      ...collectdata,
      productVideos: { ...collectdata.productVideos, [e.name]: e.val },
    });
  };
  const formReturnPIMG = (e: any) => {
    if (e.name == "images") {
      const tmp: any = [...collectdata.productImages.images];
      tmp.push(e.val);
      // console.log(tmp);
      const tt = collectdata.productImages.images.concat(e.val);
      setcollectdata({
        ...collectdata,
        productImages: {
          ...collectdata.productImages,
          [e.name]: tt,
        },
      });
    } else {
      setcollectdata({
        ...collectdata,
        productImages: { ...collectdata.productImages, [e.name]: e.val },
      });
    }
  };
  const formReturnINFO = (e: any) => {
    if (e.name === "tags") {
      const updateArray = e.val.filter((value: unknown) => value !== "remove");
      console.log(updateArray);
      let temp = { ...collectdata.productInformation.tags };
      //   temp.push(e.val);
      setcollectdata({
        ...collectdata,
        productInformation: {
          ...collectdata.productInformation,
          tags: updateArray,
        },
      });
    } else {
      setcollectdata({
        ...collectdata,
        productInformation: {
          ...collectdata.productInformation,
          [e.name]: e.val,
        },
      });
    }
  };
  function findUniqueObjects(arr: any, property: string) {
    const uniqueObjects: any = [];
    const seenValues = new Set();

    arr.forEach((obj: any) => {
      const value = obj;

      if (!seenValues.has(value)) {
        seenValues.add(value);
        uniqueObjects.push(obj);
      }
    });

    return uniqueObjects;
  }
  const formReturnPV = (e: any) => {
    if (e.name === "productStock") {
      setcollectdata({
        ...collectdata,
        productStock: e.val,
      });
    } else {
      setcollectdata({
        ...collectdata,
        productVariation: {
          ...collectdata.productVariation,
          [e.name]: e.val,
        },
      });
    }

    console.log(e);
  };
  const formReturn = (e: any) => {
    console.log(e);
  };
  const variationReturn = (e: any) => {
    setcollectdata({
      ...collectdata,
      productVariation: {
        ...collectdata.productVariation,
        variation: e,
      },
    });
    console.log(e);
  };
  function createSlug(str: string) {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/gi, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim(); // Trim leading/trailing spaces
  }
  const submitForm = () => {
    // setshowpreloader(true);
    if (
      collectdata.productInformation.name === "" ||
      collectdata.productInformation.unit === "" ||
      collectdata.productInformation.tags.length === 0
    ) {
      settoasterdata({
        type: "error",
        message: "Product Information - *Some fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    } else if (
      collectdata.productImages.thumbnail === "" ||
      collectdata.productImages.images.length === 0
    ) {
      settoasterdata({
        type: "error",
        message: "Product Images - *Some fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    } else if (collectdata.category.length === 0) {
      settoasterdata({
        type: "error",
        message: "Product category - Select alleast one",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }
    const colte = collectdata;
    if (colte.seoMetaTags.url === undefined || colte.seoMetaTags.url === "") {
      colte.seoMetaTags.url = createSlug(colte.productInformation.name);
    }
    if (collectdata._id !== "" && collectdata._id !== undefined) {
      updateProduct(colte)
        .then((resp) => {
          settoasterdata(resp.data);
          console.log(resp.data);
          setshowtoaster(true);
          setshowpreloader(false);
          // props.closePopUp();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createProduct(colte)
        .then((resp) => {
          settoasterdata(resp.data);
          console.log(resp.data);
          setshowtoaster(true);
          setshowpreloader(false);
          // props.closePopUp();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      <div className="p-standard">
        <h2 className="font-bold text-lg p-4">Add New Product</h2>
        <div className="grid grid-cols-12">
          {loading ? (
            <>
              <div className="col-span-8">
                <ProductInformation
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnINFO}
                />
                <ProductImages
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnPIMG}
                />
                <ProductVideos
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnPVideo}
                />
                <ProductVariation
                  resource={loadResource}
                  alldata={collectdata}
                  stockData={stockdata}
                  returnData={formReturnPV}
                  variationReturn={variationReturn}
                />
                <ProductStocks
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnSTCK}
                />
                <ProductDescription
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnDESC}
                />
                <PDFSpecification
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnPDF}
                />
                <SEOMetaTags
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnSEO}
                />

                <div className="card">
                  <div className="card-body">
                    {showtoaster ? (
                      <div className="py-1 my-2">
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
                    <div className="">
                      <button
                        className="bg-primary text-sm text-white text-md font-bold px-6 py-2 rounded-md mr-3"
                        onClick={submitForm}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-sm text-white text-md font-bold px-6 py-2 rounded-md"
                        onClick={() => router.push("/admin/product")}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <Category
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnCAT}
                />
                <ShippingConfig
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnSU}
                />
                <LowStockQuantityWarning
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnLSQW}
                />
                <StockVisibilityState
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnSVS}
                />
                <COD
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnCOD}
                />
                <Featured
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnFT}
                />
                <TodaysDeal
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnTD}
                />
                <EstimatedShippingTime
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnEST}
                />
                <FeeAndCharges
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnFAC}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

const ProductInformation = (props: componentProps) => {
  const [tags, settags] = useState<any>(props.alldata.productInformation.tags);
  const [taginput, settaginput] = useState<string>("");

  useEffect(() => {
    // if (props.alldata.productInformation.tags.length !== 0) {
    //   props.alldata.productInformation.tags.map((tag) => {
    //     settags([...tags, tag]);
    //   });
    // }
  }, []);

  const changeTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const valv = e.currentTarget;
    settaginput(valv.value);
    // console.log(e.key);
    if (e.key == "Enter") {
      settags([...tags, taginput]);
      settaginput("");
      const newArray: any = [...tags];
      const updateArray = newArray.filter(
        (value: string) => value !== "remove"
      );
      //   const updateArray1 = updateArray.filter((value: unknown) => value !== "");
      //   props.returnData(tags);
      const tmp = [...tags, valv.value];
      props.returnData({ name: "tags", val: tmp });
    }
  };
  const changeTag1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valv = e.currentTarget;
    settaginput(valv.value);
  };
  const removeTag = (key: number) => {
    const newArray: any = [...tags];
    newArray[key] = "remove";
    settags(newArray);
    // console.log(newArray);
  };
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormSEL = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const updateTags = (e: any) => {
    props.returnData({ name: "tags", val: e });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product Information</div>
          <div className="card-body">
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Product Name<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder=""
                  name="name"
                  defaultValue={props.alldata.productInformation.name}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Brand</label>
              </div>
              <div className="w-3/5">
                <select
                  className="w-full rounded-md"
                  name="brand"
                  onChange={changeFormSEL}
                  value={props.alldata.productInformation.brand}
                >
                  <option value="">Select Brand</option>
                  {props.resource.brand.map((dd) => (
                    <option value={dd._id}>{dd.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Seller</label>
              </div>
              <div className="w-3/5">
                <select
                  className="w-full rounded-md"
                  name="seller"
                  onChange={changeFormSEL}
                  value={props.alldata.productInformation.seller}
                >
                  <option value="">Select Seller</option>
                  {props.resource.seller.map((dd) => (
                    <option value={dd._id}>
                      {dd.shopInformation.shopName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Unit<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder="Unit (e.g. KG, Pc etc)"
                  name="unit"
                  defaultValue={props.alldata.productInformation.unit}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  PackOf<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder="Unit (e.g. KG, Pc etc)"
                  name="packOf"
                  defaultValue={props.alldata.productInformation.packOf}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Weight (In Kg)</label>
              </div>
              <div className="w-3/5">
                <input
                  type="number"
                  className="w-full rounded-md"
                  placeholder="0.00"
                  name="weight"
                  defaultValue={props.alldata.productInformation.weight}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Minimum Purchase Qty<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="number"
                  className="w-full rounded-md"
                  placeholder=""
                  name="minPurchaseQty"
                  defaultValue={props.alldata.productInformation.minPurchaseQty}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Tags<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <div className="">
                  <ul className="flex list-none w-full overflow-x-auto overflow-y-auto">
                    {tags.map((dd: any, i: any) => (
                      <>
                        {dd !== "" && dd !== "remove" ? (
                          <li
                            key={i}
                            className="px-3 py-1 bg-primary m-1 rounded-md text-white"
                          >
                            <div className="flex items-center">
                              <div className="whitespace-nowrap">{dd}</div>
                              <div className="">
                                <XMarkIcon
                                  className="w-5"
                                  onClick={() => removeTag(i)}
                                />
                              </div>
                            </div>
                          </li>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </ul>
                  <div className="">
                    <input
                      type="text"
                      className="w-full"
                      onKeyDown={changeTag}
                      onChange={changeTag1}
                      value={taginput}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Barcode<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="number"
                  className="w-full rounded-md"
                  placeholder=""
                  name="barcode"
                  defaultValue={props.alldata.productInformation.barcode}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Refundable</label>
              </div>
              <div className="w-3/5">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="refundable"
                    checked={props.alldata.productInformation.refundable}
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductImages = (props: componentProps) => {
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    const file = e.target.files;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadSingleFile(files as any).then((res) =>
        props.returnData({ name: evt.name, val: res.data.data })
      );
    }
  };
  const uploadMImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const evt = e.currentTarget;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadMultipleFile(files as any).then((res) =>
        props.returnData({ name: evt.name, val: res.data.data })
      );
    }
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product Images</div>
          <div className="card-body">
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Gallery Images (600x600)
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="file"
                  className="w-full rounded-md border p-2"
                  placeholder=""
                  multiple
                  name="images"
                  onChange={uploadMImage}
                />
                <small>
                  These images are visibility in product details page gallery.
                  Use 600x600 sizes images.
                </small>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Thumbnail Image (300x300)
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="file"
                  className="w-full rounded-md border p-2"
                  placeholder=""
                  name="thumbnail"
                  onChange={uploadImage}
                />
                <small>
                  This image is visibility in all product box. Use 300x300 sizes
                  image. Keep some blank space around main object of your image
                  as we had to crop some edge in different devices to make it
                  responsive.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductVideos = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormSL = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product Videos</div>
          <div className="card-body">
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Video Provider</label>
              </div>
              <div className="w-3/5">
                <select
                  className="w-full rounded-md"
                  name="videoProvider"
                  value={props.alldata.productVideos.videoProvider}
                  onChange={changeFormSL}
                >
                  <option value=""></option>
                  <option value="youtube">Youtube</option>
                  <option value="dailymotion">Dailymotion</option>
                  <option value="vimeo">Vimoe</option>
                </select>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Video Link</label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  onChange={changeForm}
                  name="videoLink"
                  defaultValue={props.alldata.productVideos.videoLink}
                  onKeyUp={changeFormKU}
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductVariation = (props: componentProps) => {
  const [showattr, setshowattr] = useState<boolean>(false);
  const [showcolor, setshowcolor] = useState<boolean>(false);
  const [collectdata, setcollectdata] = useState<any>([]);
  const [collectcolordata, setcollectcolordata] = useState<any>([]);
  const [variantselect, setvariantselect] = useState<any>([]);
  const [convertvarient, setconvertvarient] = useState<any>([]);
  const [tconvertvarient, settconvertvarient] = useState<any>([]);
  const [productvariant, setproductvariant] = useState<any>([]);

  useEffect(() => {
    if (props.alldata.productVariation.colorList.length !== 0) {
      setcollectcolordata([
        ...collectcolordata,
        ...props.alldata.productVariation.colorList,
      ]);
    }
    if (props.alldata.productVariation.attributes.length !== 0) {
      setcollectdata([
        ...collectdata,
        ...props.alldata.productVariation.attributes,
      ]);
      const select: any = [];
      props.alldata.productVariation.attributes.forEach((v, i) => {
        const valv = props.alldata.productVariation.variation[i];
        select.push({ [v]: [...valv] });
        const objectData = select.reduce((acc: any, obj: any) => {
          return { ...acc, ...obj };
        }, {});
        setvariantselect(objectData);
        renderAttr(objectData);
      });
    }
    console.log(props.stockData);
    if (props.stockData) {
      setconvertvarient(props.stockData);
      props.returnData({ name: "productStock", val: props.stockData });
    }
    if (props.stockData === undefined || props.stockData.length === 0) {
      const dd = [
        {
          variantName: "main",
          productId: "",
          discount: 0,
          gst: 0,
          images: [],
          logisticFee: 0,
          mrp: 0,
          paymentGatewayFee: 0,
          platformFee: 0,
          quantity: 0,
          sellerPrice: 0,
          sellingPrice: 0,
          dicount: 0,
        },
      ];
      setconvertvarient([...convertvarient, ...dd]);
    }
    collectcolordata;
  }, []);
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };

  const showHideAttr = () => {
    setshowattr(!showattr);
  };
  const toogleAttr = (id: string) => {
    setcollectdata([...collectdata, id]);
    // console.log(collectdata);
    // props.returnData([...collectdata, id]);
    props.returnData({ name: "attributes", val: [...collectdata, id] });
  };

  const removeAttr = (id: string) => {
    const items = collectdata;
    const updatedItems = items.filter((item: string) => item !== id);
    setcollectdata(updatedItems);
    // props.returnData(updatedItems);
    props.returnData({ name: "attributes", val: updatedItems });
  };

  const checkExists = (data: string) => {
    const myArray = collectdata;
    const searchString = data;

    let exists = false;

    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] === searchString) {
        exists = true;
        break;
      }
    }

    return exists;
  };

  const showHideColor = () => {
    setshowcolor(!showcolor);
  };
  const toogleColor = (id: string) => {
    setcollectcolordata([...collectcolordata, id]);
    renderAttr(variantselect);
    // console.log(collectdata);
    props.returnData({ name: "colorList", val: [...collectcolordata, id] });
  };

  const removeColor = (id: string) => {
    const items = collectcolordata;
    const updatedItems = items.filter((item: string) => item !== id);
    setcollectcolordata(updatedItems);
    renderAttr(variantselect);
    props.returnData({ name: "colorList", val: updatedItems });
  };

  const checkColorExists = (data: string) => {
    const myArray = collectcolordata;
    const searchString = data;

    let exists = false;

    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] === searchString) {
        exists = true;
        break;
      }
    }
    return exists;
  };

  const manageVariantSelection = (
    data: singleVariantProps,
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    const isCheck = e.currentTarget.checked;
    const name: any = data.variant;
    if (isCheck) {
      if (!variantselect[name]) {
        setvariantselect({
          ...variantselect,
          [name]: [data.variantValues],
        });
        renderAttr({
          ...variantselect,
          [name]: [data.variantValues],
        });
        // }
      } else {
        setvariantselect({
          ...variantselect,
          [name]: [...variantselect[name], data.variantValues],
        });
        renderAttr({
          ...variantselect,
          [name]: [...variantselect[name], data.variantValues],
        });
        // console.log({
        //   ...variantselect,
        //   [name]: [...variantselect[name], data.variantValues],
        // });
      }
    } else {
      const myArray = { ...variantselect[name] };
      for (const i in myArray) {
        if (myArray[i] === data.variantValues) {
          variantselect[name].splice(i, 1);
          setvariantselect({
            ...variantselect,
            [name]: variantselect[name],
          });
          renderAttr({
            ...variantselect,
            [name]: variantselect[name],
          });
          break;
        }
      }
    }
  };

  const checkVariationExists = (data: string, option: any) => {
    const myArray = { ...variantselect[data] };

    let exists = false;

    for (const i in myArray) {
      if (myArray[i] === option) {
        exists = true;
        break;
      }
    }

    return exists;
  };
  function removeEmptyArrays(arrayOfArrays: any) {
    return arrayOfArrays.filter((subArray: any) => subArray.length > 0);
  }
  const renderAttr = (init: any) => {
    let myObjectsToArray: any = Object.values(init);
    if (props.alldata.productVariation.isColor) {
      myObjectsToArray.push(collectcolordata);
    }
    if (
      collectcolordata.length === 0 &&
      props.alldata.productVariation.colorList.length !== 0
    ) {
      myObjectsToArray.push(props.alldata.productVariation.colorList);
    }
    myObjectsToArray = removeEmptyArrays(myObjectsToArray);
    // console.log(collectcolordata);
    // setconvertvarient(myObjectsToArray);
    if (props.variationReturn) {
      // props.variationReturn(myObjectsToArray);
    }
    function cartesianProduct(arr: []) {
      return arr.reduce(
        function (a, b: any) {
          return a
            .map(function (x) {
              return b.map(function (y: any) {
                return x.concat(y);
              });
            })
            .reduce(function (a, b) {
              return a.concat(b);
            }, []);
        },
        [[]]
      );
    }

    var a = cartesianProduct(myObjectsToArray);
    // console.log(a);
    // setconvertvarient(a);
    props.returnData({
      name: "convertVarient",
      val: a,
    });
    const tempvar: any = [];
    a.map((v: any) => {
      const filter = tconvertvarient.findIndex(
        (vx: any, x: number) => vx.variantName === v.join("-")
      );
      // console.log(filter);
      if (filter !== -1) {
        // console.log(tconvertvarient[filter])
        const dd = {
          variantName: v.join("-"),
          productId: props.alldata._id,
          quantity: tconvertvarient[filter].quantity,
          images: [],
          variantPrice: tconvertvarient[filter].variantPrice,
          gst: tconvertvarient[filter].gst,
          logisticFee: tconvertvarient[filter].logisticFee,
          mrp: tconvertvarient[filter].mrp,
          paymentGatewayFee: tconvertvarient[filter].paymentGatewayFee,
          platformFee: tconvertvarient[filter].platformFee,
          sellerPrice: tconvertvarient[filter].sellerPrice,
          sellingPrice: tconvertvarient[filter].sellingPrice,
          dicount: tconvertvarient[filter].dicount,
        };
        tempvar.push(dd);
      } else {
        const dd = {
          variantName: v.join("-"),
          productId: props.alldata._id,
          discount: 0,
          gst: 0,
          images: [],
          logisticFee: 0,
          mrp: 0,
          paymentGatewayFee: 0,
          platformFee: 0,
          quantity: 0,
          sellerPrice: 0,
          sellingPrice: 0,
          dicount: 0,
        };
        tempvar.push(dd);
      }
    });
    setconvertvarient(tempvar);
    props.returnData({ name: "productStock", val: tempvar });
    // settconvertvarient(tempvar);
    props.returnData({ name: "variation", val: myObjectsToArray });
  };
  const updateVariant = (
    dd: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const evt = dd.currentTarget;
    const temp = [...convertvarient];
    temp[i][evt.name] = parseInt(evt.value);
    setconvertvarient(temp);
    console.log(temp);
    settconvertvarient(temp);
    props.returnData({ name: "productStock", val: temp });
  };

  const uploadMImage = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const file = e.target.files;
    // const evt = e.currentTarget;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadMultipleFile(files as any).then((res) => {
        // props.returnData({ name: evt.name, val: res.data.data })
        const temp = [...convertvarient];
        temp[i]["images"] = temp[i]["images"].concat(res.data.data);
        setconvertvarient(temp);
        console.log(temp);
        settconvertvarient(temp);
        props.returnData({ name: "productStock", val: temp });
      });
    }
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product Variation</div>
          <div className="card-body">
            <div className="flex items-center gap-x-0 py-2">
              <div className="w-1/5">
                <label className="">Colors</label>
              </div>
              <div className="w-3/5">
                <div className="flex items-center">
                  <div className="relative w-full">
                    <div
                      className="px-2 py-2 rounded-md border border-gray-200 w-full text-gray-500"
                      onClick={showHideColor}
                    >
                      Select Color
                    </div>
                    <div className="" onMouseLeave={showHideColor}>
                      <div
                        className={`absolute top-12 h-56 overflow-x-auto overflow-y-auto rounded-md bg-white w-full border border-gray-200 z-10 text-gray-500 ${
                          showcolor ? "block" : "hidden"
                        }`}
                      >
                        {props.alldata.productVariation.isColor &&
                          showcolor &&
                          props.resource.color.map((dd) => (
                            <>
                              <div
                                className="px-2 py-2 rounded-md border-b"
                                onClick={() => {
                                  checkColorExists(dd.name)
                                    ? removeColor(dd.name)
                                    : toogleColor(dd.name);
                                }}
                              >
                                <div className="flex justify-between">
                                  <div className="">{dd.name}</div>
                                  <div className="">
                                    {checkColorExists(dd.name) ? (
                                      <CheckIcon className="w-6" />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="pl-2 w-1/6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={props.alldata.productVariation.isColor}
                        onChange={changeForm}
                        name="isColor"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-0 py-2">
              <div className="w-1/5">
                <label className="">Attributes</label>
              </div>
              <div className="w-3/5">
                <div className="relative">
                  <div
                    className="px-2 py-2 rounded-md border border-gray-200 w-full text-gray-500"
                    onClick={showHideAttr}
                  >
                    Select Attribute
                  </div>
                  <div className="" onMouseLeave={showHideAttr}>
                    {showattr ? (
                      <div className="absolute z-10 top-12 rounded-md bg-white w-full border border-gray-200 text-gray-500">
                        {props.resource.attribute.map((dd) => (
                          <>
                            <div
                              className="px-2 py-2 rounded-md border-b"
                              onClick={() => {
                                checkExists(dd.name)
                                  ? removeAttr(dd.name)
                                  : toogleAttr(dd.name);
                              }}
                            >
                              <div className="flex justify-between">
                                <div className="">{dd.name}</div>
                                <div className="">
                                  {checkExists(dd.name) ? (
                                    <CheckIcon className="w-6" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <small className="py-2 font-bold">
              Choose the attributes of this product and then input values of
              each attribute
            </small>
            <div className="">
              {props.resource.attribute.map((dd) => {
                return (
                  <>
                    {checkExists(dd.name) ? (
                      <div className="flex gap-x-3 my-3">
                        <div className="w-1/5">
                          <div className="w-full rounded-md border-gray-500 bg-gray-200 px-4 text-gray-500 py-2">
                            {dd.name}
                          </div>
                        </div>
                        <div className="w-3/5">
                          <div className="space-y-2">
                            {dd.attributeValue.map((option: any) => (
                              <label
                                key={option}
                                className="inline-flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  value={option}
                                  checked={checkVariationExists(
                                    dd.name,
                                    option
                                  )}
                                  onClick={(e) =>
                                    manageVariantSelection(
                                      {
                                        variant: dd.name,
                                        variantValues: option,
                                      } as any,
                                      e
                                    )
                                  }
                                  className="form-checkbox h-4 w-4 text-indigo-600"
                                />
                                <span className="mr-3 ml-1">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>

            <div className="py-4 overflow-x-auto overflow-y-auto">
              {convertvarient.map((cv: any, i: number) => (
                <>
                  <div className="grid grid-cols-4 gap-x-4">
                    <div className="">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Variant Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="border-gray-500 w-full rounded-md"
                          name="variantName"
                          value={cv.variantName}
                          disabled
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          MRP<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="mrp"
                          value={cv.mrp}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Transform Price (TP){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="sellerPrice"
                          value={cv.sellerPrice}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Selling Price (SP){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="sellingPrice"
                          value={cv.sellingPrice}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          GST (In %)<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="gst"
                          value={cv.gst}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Payment Gateway Fee (in %){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="paymentGatewayFee"
                          value={cv.paymentGatewayFee}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Platform Fee (In Rupees) *{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="platformFee"
                          value={cv.platformFee}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Logistic Fee (In Rupees)
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="logisticFee"
                          value={cv.logisticFee}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Variant Product Qty.{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="quantity"
                          value={cv.quantity}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Discount (in Amount)
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="border-gray-500 w-full rounded-md"
                          name="discount"
                          value={cv.discount}
                          onChange={(e) => updateVariant(e, i)}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 pt-2">
                          Images
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          multiple
                          className="border-gray-500 w-full rounded-md"
                          name="images"
                          onChange={(e) => uploadMImage(e, i)}
                          accept="png,jpg,jpeg,gif,webp"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductStocks = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormSEL = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product price + stock</div>
          <div className="card-body">
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Unit price<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="number"
                  className="w-full rounded-md"
                  placeholder=""
                  name="unitPrice"
                  value={props.alldata.productStocks.unitPrice}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Discount Date Range</label>
              </div>
              <div className="w-3/5">
                <div date-rangepicker className="flex items-center">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="w-5 fill-gray-500" />
                    </div>
                    <input
                      name="discountFrom"
                      onChange={changeForm1}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date start"
                    />
                  </div>
                  <span className="mx-4 text-gray-500">to</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="w-5 fill-gray-500" />
                    </div>
                    <input
                      name="discoundTo"
                      onChange={changeForm1}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date end"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Discount<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <input
                      type="number"
                      className="w-full rounded-md"
                      placeholder=""
                      name="discount"
                      defaultValue={props.alldata.productStocks.discount}
                      onKeyUp={changeFormKU}
                      onChange={changeForm}
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      className="w-full rounded-md"
                      name="discountType"
                      value={props.alldata.productStocks.discountType}
                      onChange={changeFormSEL}
                    >
                      <option value="flat">Flat</option>
                      <option value="percent">Percent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  SKU<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder=""
                  name="sku"
                  defaultValue={props.alldata.productStocks.sku}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">HSN</label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder=""
                  name="hsn"
                  defaultValue={props.alldata.productStocks.hsn}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>

            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">
                  Quantity<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder=""
                  name="quantity"
                  defaultValue={props.alldata.productStocks.quantity}
                  onChange={changeForm1}
                  onKeyUp={changeFormKU}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">Set Point</label>
              </div>
              <div className="w-3/5">
                <input
                  type="number"
                  className="w-full rounded-md"
                  placeholder=""
                  name="setPoint"
                  defaultValue={props.alldata.productStocks.setPoint}
                  onKeyUp={changeFormKU}
                  onChange={changeForm}
                />
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">External Link</label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder=""
                  name="externalLink"
                  defaultValue={props.alldata.productStocks.externalLink}
                  onKeyUp={changeFormKU}
                  onChange={changeForm}
                />
                <small>
                  Leave it blank if you do not use external site link
                </small>
              </div>
            </div>
            <div className="flex items-center py-2">
              <div className="w-1/5">
                <label className="">External Link button text</label>
              </div>
              <div className="w-3/5">
                <input
                  type="text"
                  className="w-full rounded-md"
                  placeholder=""
                  name="externalLinkText"
                  defaultValue={props.alldata.productStocks.externalLinkText}
                  onKeyUp={changeFormKU}
                  onChange={changeForm}
                />
                <small>
                  Leave it blank if you do not use external site link
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductDescription = (props: componentProps) => {
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product Description</div>
          <div className="card-body">
            <div className="flex">
              <div className="w-1/5">Description</div>
              <div className="w-4/5">
                <Editor
                  //   onInit={(evt, editor) => (editorRef.current = editor)}
                  value={props.alldata.productDescription}
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style: "body {font-size:14px }",
                  }}
                  onEditorChange={(e) => props.returnData(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PDFSpecification = (props: componentProps) => {
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadSingleFile(files as any).then((res) => props.returnData(res.data));
    }
  };
  return (
    <div className="">
      <div className="card">
        <div className="card-header">PDF Specification</div>
        <div className="card-body">
          <div className="flex items-center py-2">
            <div className="w-1/5">
              <label className="">PDF Specification</label>
            </div>
            <div className="w-3/5">
              <input
                type="file"
                className="w-full rounded-md border p-2"
                placeholder=""
                onChange={uploadImage}
                accept=".pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SEOMetaTags = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeForm1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeForm1KU = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadSingleFile(files as any).then((res) =>
        props.returnData({ name: "image", val: res.data })
      );
    }
  };
  return (
    <div className="">
      <div className="card">
        <div className="card-header">SEO Meta tags</div>
        <div className="card-body">
          <div className="flex items-center py-2">
            <div className="w-1/5">
              <label className="">Meta URL</label>
            </div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full rounded-md border p-2"
                placeholder=""
                name="url"
                defaultValue={props.alldata.seoMetaTags.url}
                onChange={changeForm}
                onKeyUp={changeFormKU}
              />
            </div>
          </div>
          <div className="flex items-center py-2">
            <div className="w-1/5">
              <label className="">Meta Title</label>
            </div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full rounded-md border p-2"
                placeholder=""
                name="title"
                defaultValue={props.alldata.seoMetaTags.title}
                onChange={changeForm}
                onKeyUp={changeFormKU}
              />
            </div>
          </div>
          <div className="flex items-center py-2">
            <div className="w-1/5">
              <label className="">Description</label>
            </div>
            <div className="w-3/5">
              <textarea
                className="w-full rounded-md border p-2"
                placeholder=""
                rows={10}
                name="description"
                defaultValue={props.alldata.seoMetaTags.description}
                onChange={changeForm1}
                onKeyUp={changeForm1KU}
              ></textarea>
            </div>
          </div>
          <div className="flex items-center py-2">
            <div className="w-1/5">
              <label className="">Meta Image</label>
            </div>
            <div className="w-3/5">
              <input
                type="file"
                className="w-full rounded-md border p-2"
                placeholder=""
                onChange={uploadImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = (props: componentProps) => {
  const [collectdata, setcollectdata] = useState<any>([]);

  useEffect(() => {
    if (props.alldata.category.length > 0) {
      setcollectdata([...collectdata, ...props.alldata.category]);
    }
  }, []);
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;

    const isCheck = e.currentTarget.checked;
    if (isCheck) {
      setcollectdata([...collectdata, evt.value]);
      props.returnData({
        name: "category",
        val: [...collectdata, evt.value],
      });
    } else {
      setcollectdata(collectdata.filter((item: any) => item !== evt.value));
      props.returnData({
        name: "category",
        val: collectdata.filter((item: any) => item !== evt.value),
      });
      console.log(collectdata.filter((item: any) => item !== evt.value));
    }
  };
  const checkExists = (value: string) => {
    return collectdata.some((item: any) => item === value);
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Product Category</div>
          <div className="card-body">
            <ul className="max-h-80 overflow-scroll overflow-x-hidden pr-3">
              {props.resource.category.map((dd) => {
                return (
                  <li>
                    <div className="flex items-center justify-between gap-x-3">
                      <div className="">{dd.name}</div>
                      <div className="">
                        <input
                          type="checkbox"
                          value={dd._id}
                          checked={checkExists(dd._id)}
                          onChange={changeForm}
                          className="accent-primary h-4 w-4"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const ShippingConfig = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormCK = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Shipping Configuration</div>
          <div className="card-body">
            <div className="grid grid-cols-2 py-2">
              <div className="">Free Shipping</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="freeShipping"
                    checked={props.alldata.shippingConfig.freeShipping}
                    onChange={changeFormCK}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 py-2">
              <div className="">Flat Rate</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="flatRate"
                    checked={props.alldata.shippingConfig.flatRate}
                    onChange={changeFormCK}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            {props.alldata.shippingConfig.flatRate ? (
              <div className="grid grid-cols-2 items-center py-2">
                <div className="">Shipping Cost</div>
                <div className="">
                  <input
                    type="number"
                    defaultValue={props.alldata.shippingConfig.shippingCost}
                    name="shippingCost"
                    onChange={changeForm}
                    onKeyUp={changeFormKU}
                    className="form-input"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-2 py-2">
              <div className="">Is Product Quantity Mulitiply</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="isProductQtyMultiple"
                    checked={props.alldata.shippingConfig.isProductQtyMultiple}
                    onChange={changeFormCK}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LowStockQuantityWarning = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Low Cost Quantity Warning</div>
          <div className="card-body">
            <div className="py-0">
              <div className="form-item">
                <label className="form-label mb-1">Quantity</label>
                <div className="">
                  <input
                    className="form-input"
                    type="number"
                    name="banner"
                    defaultValue={props.alldata.lowStockQuantityWarning}
                    onChange={changeForm}
                    onKeyUp={changeFormKU}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StockVisibilityState = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Stock Visibility State</div>
          <div className="card-body">
            <div className="grid grid-cols-2 py-2">
              <div className="">Show Stock Quantity</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="showStockQuantity"
                    checked={
                      props.alldata.stockVisibilityState.showStockQuantity
                    }
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 py-2">
              <div className="">Show Stock With Text Only</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="showStockWithTextOnly"
                    checked={
                      props.alldata.stockVisibilityState.showStockWithTextOnly
                    }
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 py-2">
              <div className="">Hide Stock</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    name="hideStock"
                    checked={props.alldata.stockVisibilityState.hideStock}
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const COD = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Cash on Delivery</div>
          <div className="card-body">
            <div className="grid grid-cols-2 py-2">
              <div className="">Status</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    checked={props.alldata.cod}
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Featured = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Featured</div>
          <div className="card-body">
            <div className="grid grid-cols-2 py-2">
              <div className="">Status</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    checked={props.alldata.featured}
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TodaysDeal = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.checked });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Todays Deal</div>
          <div className="card-body">
            <div className="grid grid-cols-2 py-2">
              <div className="">Status</div>
              <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="0"
                    checked={props.alldata.todaysDeal}
                    onChange={changeForm}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EstimatedShippingTime = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Estimated Shipping Time</div>
          <div className="card-body">
            <div className="form-item">
              <label className="form-label mb-1">Shipping Days</label>
              <div className="flex items-center">
                <div className="">
                  <input
                    className="form-input"
                    type="number"
                    name="banner"
                    defaultValue={props.alldata.estimatedShippingTime}
                    onChange={changeForm}
                    onKeyUp={changeFormKU}
                  />
                </div>
                <div className="border border-gray-500 px-4 py-2">Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FeeAndCharges = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Fees and Charges</div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-x-3">
              <div className="">
                <div className="form-item">
                  <label className="form-label mb-1">Platform Fee</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      name="platFormFee"
                      placeholder="0.00"
                      defaultValue={props.alldata.feeAndCharges?.platFormFee}
                      onChange={changeForm}
                      onKeyUp={changeFormKU}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label mb-1">Payment Gateway Fee</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      placeholder="0.00"
                      name="paymentGatewayFee"
                      defaultValue={
                        props.alldata.feeAndCharges?.paymentGatewayFee
                      }
                      onChange={changeForm}
                      onKeyUp={changeFormKU}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label mb-1">GST</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      placeholder="0.00"
                      name="gst"
                      defaultValue={props.alldata.feeAndCharges?.gst}
                      onChange={changeForm}
                      onKeyUp={changeFormKU}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddEdit;
