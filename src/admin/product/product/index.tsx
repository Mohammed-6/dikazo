import React, { useState, useEffect } from "react";
import {
  arrProductProps,
  exportImportPorps,
  filterProps,
  loadResourceProps,
  productProps,
  productVariant,
} from "../../types/product/product";
import {
  listProduct,
  deleteProduct,
  updateProduct,
  filterProduct,
  exportProduct,
  importProduct,
  importKeywords,
} from "../../query/product/product";
import Layout from "../../layout/index";
import Link from "next/link";

import { deleteProps, toaster } from "../../types/basic";
import { AlertAction, Preloader, Toaster, serverURL } from "../../data/stuff";
import AddEdit from "./addEdit";
import { FaSearch } from "react-icons/fa";
import exportFromJSON from "export-from-json";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePapaParse } from "react-papaparse";

const Product = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [loadResource, setLoadResource] = useState<loadResourceProps>({
    attribute: [],
    color: [],
    brand: [],
    category: [],
    seller: [],
  });
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
  const [showexport, setshowexport] = useState<boolean>(false);
  const [showimport, setshowimport] = useState<boolean>(false);
  useEffect(() => {
    listProduct().then((product) => {
      setproductlist(product.data.data);
      setLoadResource(product.data.resource);
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

  const updateProductStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    pid: string
  ) => {
    const valv = e.currentTarget;
    if (valv.checked) {
      const editProduct = { _id: pid, [valv.name]: true };
      updateProduct(editProduct as any)
        .then((response: any) => {
          settoasterdata(response.data);
          setshowtoaster(true);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      const editProduct = { _id: pid, [valv.name]: false };
      updateProduct(editProduct as any)
        .then((response: any) => {
          settoasterdata(response.data);
          setshowtoaster(true);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const [showseller, setshowseller] = useState<boolean>(false);
  const showHideSeller = () => {
    setshowseller(!showseller);
  };
  const changeSeller = (e: string) => {
    setFilter({ ...filter, seller: e });
    filterProduct({ ...filter, seller: e }).then((product) => {
      setproductlist(product.data.data);
      setshowseller(false);
    });
  };
  const searchProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const valv = e.currentTarget;
    setFilter({ ...filter, search: valv.value });
    filterProduct({ ...filter, search: valv.value }).then((product) => {
      setproductlist(product.data.data);
    });
  };
  const searchCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valv = e.currentTarget;
    setFilter({ ...filter, category: valv.value });
    filterProduct({ ...filter, category: valv.value }).then((product) => {
      setproductlist(product.data.data);
    });
  };
  const searchBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valv = e.currentTarget;
    setFilter({ ...filter, brand: valv.value });
    filterProduct({ ...filter, brand: valv.value }).then((product) => {
      setproductlist(product.data.data);
    });
  };

  const toogleShowExport = () => {
    setshowexport(!showexport);
  };
  const toogleShowImport = () => {
    setshowimport(!showimport);
  };

  const importKeyword = () => {
    setshowpreloader(true);
    importKeywords()
      .then((keyword) => {
        console.log(keyword);
        setshowpreloader(false);
        settoasterdata({
          type: "success",
          message: "Keyword data fetch successfully",
        });
        setshowtoaster(true);
      })
      .catch((error) => {
        console.error(error);
        setshowpreloader(false);
        settoasterdata({
          type: "error",
          message: "Error occured while importing keyword",
        });
        setshowtoaster(true);
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

            <div className="flex items-center gap-x-2">
              <Link href="/admin/product/add">
                <button className="btn btn-primary">Add Product</button>
              </Link>
              <div className="">
                <button className="btn btn-danger" onClick={importKeyword}>
                  Import keyword
                </button>
              </div>
              <div className="">
                <button className="btn btn-danger" onClick={toogleShowExport}>
                  Export
                </button>
              </div>
              <div className="">
                <button className="btn btn-success" onClick={toogleShowImport}>
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
        {showexport ? (
          <ExportForm alldata={loadResource} returnData={toogleShowExport} />
        ) : (
          ""
        )}
        {showimport ? (
          <ImportForm alldata={loadResource} returnData={toogleShowImport} />
        ) : (
          ""
        )}
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
                      Select Seller
                    </div>
                    <div className="" onMouseLeave={showHideSeller}>
                      {showseller ? (
                        <div className="h-48 overflow-x-auto overflow-y-auto absolute z-20 top-12 rounded-md bg-white w-full border border-gray-200 text-gray-500">
                          <div
                            className="px-2 py-2 rounded-md border-b w-full"
                            onClick={() => changeSeller("")}
                          >
                            <div className="flex justify-between">
                              <div className="">Select</div>
                            </div>
                          </div>
                          {loadResource.seller.map((dd) => (
                            <>
                              <div
                                className="px-2 py-2 rounded-md border-b"
                                onClick={() => changeSeller(dd._id)}
                              >
                                <div className="flex justify-between">
                                  <div className="">
                                    {dd.personalInfomration.name}
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
                <div className="">
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Search..."
                    onKeyUp={(e) => searchProduct(e)}
                  />
                </div>
                <div className="">
                  <select className="w-full rounded-md">
                    <option value="">Sort</option>
                    <option value="">COD</option>
                    <option value="">Published</option>
                    <option value="">Featured</option>
                  </select>
                </div>
                <div className="">
                  <select
                    className="w-full rounded-md"
                    onChange={searchCategory}
                  >
                    <option value="">Categories</option>
                    {loadResource.category.map((category) => (
                      <>
                        <option value={category._id}>{category.name}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="">
                  <select className="w-full rounded-md" onChange={searchBrand}>
                    <option value="">Brand</option>
                    {loadResource.brand.map((brand) => (
                      <>
                        <option value={brand._id}>{brand.name}</option>
                      </>
                    ))}
                  </select>
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
                        #
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
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Added By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Info
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Total Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Published
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Approved
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Featured
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        COD
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
                    {productlist !== undefined &&
                      productlist.map((dd, k) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {k + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-break-spaces">
                            <div className="flex gap-x-2 items-center">
                              <div className="">
                                <img
                                  src={
                                    serverURL + "/" + dd.productImages.thumbnail
                                  }
                                  className="w-16 h-16"
                                />
                              </div>
                              <div className="">
                                {dd.productInformation.name}
                                <br />
                                {loadResource.brand.map((br) => {
                                  if (dd.productInformation.brand === br._id) {
                                    return (
                                      <>
                                        <div className="bg-primary px-2 rounded-md py-1 text-white font-bold">
                                          {br.name}
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.category.map((cat) => {
                              let category = "";
                              loadResource.category.map((cate) => {
                                if (cat === cate._id) {
                                  category = cate.name;
                                }
                              });
                              return (
                                <>
                                  {category}
                                  <br />
                                </>
                              );
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.addedBy}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            Price:&nbsp;₹
                            {dd.productStocks.unitPrice}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            Variations:&nbsp;
                            {1 + dd.productVariation.convertVarient.length}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <div className="">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value="0"
                                  name="publishedStatus"
                                  checked={dd.publishedStatus}
                                  onChange={(e) =>
                                    updateProductStatus(e, dd._id)
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <div className="">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value="0"
                                  checked={dd.approvedStatus}
                                  name="approvedStatus"
                                  onChange={(e) =>
                                    updateProductStatus(e, dd._id)
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <div className="">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value="0"
                                  checked={dd.featured}
                                  name="featured"
                                  onChange={(e) =>
                                    updateProductStatus(e, dd._id)
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <div className="">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value="0"
                                  checked={dd.cod}
                                  name="cod"
                                  onChange={(e) =>
                                    updateProductStatus(e, dd._id)
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <div className="flex gap-x-2 items-center">
                              <div className="">
                                <Link
                                  href={"/admin/product/edit/" + dd._id}
                                  className="btn btn-primary"
                                >
                                  Edit
                                </Link>
                              </div>
                              <div className="">
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setdeleteid(dd._id);
                                    setdeleteaction(true);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
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

const ExportForm = (props: exportImportPorps) => {
  const [filter, setFilter] = useState<filterProps>({
    seller: "",
    sort: "",
    search: "",
    category: "",
    brand: "",
  });

  function randomString(length: number) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  const changeSeller = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const evl = e.currentTarget;
    setFilter({ ...filter, seller: evl.value });
  };
  const searchProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const valv = e.currentTarget;
    setFilter({ ...filter, search: valv.value });
  };
  const searchCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valv = e.currentTarget;
    setFilter({ ...filter, category: valv.value });
  };
  const searchBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valv = e.currentTarget;
    setFilter({ ...filter, brand: valv.value });
  };
  const exportPorduct = () => {
    exportProduct(filter).then((product) => {
      // setproductlist(product.data.data);
      console.log(product.data.data);
      exportToExcel(product.data.data);
    });
  };

  const exportToExcel = (filterProduct: productProps[]) => {
    const data = filterProduct;
    data.map((dd: productProps, k: number) => {
      const attr_var = dd.productVariation?.variation.map((v: []) => {
        return v.toString();
      });
      const ndata = {
        seller_id: dd.productInformation?.seller,
        sku: dd.productStocks?.sku,
        name: dd.productInformation?.name,
        description: dd.productDescription,
        key_description: dd.keyDescription,
        vertical_id: "",
        brand_name: dd.productInformation?.brand,
        MRP: dd.productStocks?.unitPrice,
        TP: "",
        selling_price: dd.productStocks?.unitPrice,
        platform_fee: dd.feeAndCharges?.platFormFee,
        payment_gateway_fee: dd.feeAndCharges?.paymentGatewayFee,
        gst: dd.feeAndCharges?.gst,
        unit: dd.productInformation?.unit,
        pack_of: dd.productInformation?.packOf,
        slug: dd.seoMetaTags?.url,
        current_stock: dd.productStocks?.quantity,
        meta_title: dd.seoMetaTags?.title,
        meta_description: dd.seoMetaTags?.description,
        thumbnail_img: dd.productImages?.thumbnail,
        pdf: dd.pdfSpecification,
        image_links: dd.productImages?.images.toString(),
        video_provider: dd.productVideos?.videoProvider,
        video_link: dd.productVideos?.videoLink,
        hsn: dd.productStocks?.hsn,
        keyword: dd.productInformation?.tags.toString(),
        attribute: dd.productVariation?.attributes.toString(),
        attribute_variables: attr_var,
        color: dd.productVariation?.colorList.toString(),
        color_code: "",
        product_group: "",
        dikazo_product_id: dd._id,
        procurment_type: "",
        procurrnent_sla: "",
        verified_status: dd.approvedStatus,
        listing_status: dd.publishedStatus,
        reason_of_deactivation: "",
        dikazo_product_link: serverURL + "/" + dd.seoMetaTags?.url,
        featured: dd.featured,
        refundable: dd.productInformation?.refundable,
        item_breadth: dd.productInformation?.breadth,
        item_length: dd.productInformation?.length,
        item_height: dd.productInformation?.height,
        item_weight: dd.productInformation?.weight,
        is_cod_or_not: dd.cod,
        old_url: "",
        product_type: "product",
      };
      data[k] = ndata as any;
      dd.productVariation?.convertVarient.map(
        (ls: productVariant, l: number) => {
          const vdata = {
            seller_id: dd.productInformation?.seller,
            sku: dd.productStocks?.sku,
            name: dd.productInformation?.name,
            description: dd.productDescription,
            key_description: dd.keyDescription,
            vertical_id: "",
            brand_name: dd.productInformation?.brand,
            MRP: dd.productStocks?.unitPrice,
            TP: "",
            selling_price: ls.variantPrice,
            platform_fee: dd.feeAndCharges?.platFormFee,
            payment_gateway_fee: dd.feeAndCharges?.paymentGatewayFee,
            gst: dd.feeAndCharges?.gst,
            unit: dd.productInformation?.unit,
            pack_of: dd.productInformation?.packOf,
            slug: dd.seoMetaTags?.url,
            current_stock: ls.variantQuantity,
            meta_title: dd.seoMetaTags?.title,
            meta_description: dd.seoMetaTags?.description,
            thumbnail_img: dd.productImages?.thumbnail,
            pdf: dd.pdfSpecification,
            image_links: ls.variantImage.toString(),
            video_provider: dd.productVideos?.videoProvider,
            video_link: dd.productVideos?.videoLink,
            hsn: dd.productStocks?.hsn,
            keyword: dd.productInformation?.tags.toString(),
            attribute: dd.productVariation?.attributes.toString(),
            attribute_variables: ls.variantName,
            color: dd.productVariation?.colorList.toString(),
            color_code: "",
            product_group: "",
            dikazo_product_id: dd._id,
            procurment_type: "",
            procurrnent_sla: "",
            verified_status: dd.approvedStatus,
            listing_status: dd.publishedStatus,
            reason_of_deactivation: "",
            dikazo_product_link: serverURL + "/" + dd.seoMetaTags.url,
            featured: dd.featured,
            refundable: dd.productInformation?.refundable,
            item_breadth: dd.productInformation?.breadth,
            item_length: dd.productInformation?.length,
            item_height: dd.productInformation?.height,
            item_weight: dd.productInformation?.weight,
            is_cod_or_not: dd.cod,
            old_url: "",
            product_type: "variant",
          };
          data[l + 1] = vdata as any;
        }
      );
    });
    // console.log(mdata);
    const fileName = randomString(7);
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
    props.returnData();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-30">
        <div className="relative top-5 max-w-3xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="">Export</div>
                <div className="">
                  <XMarkIcon
                    className="w-6"
                    onClick={() => props.returnData()}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="py-2">
                <div className="grid grid-cols-4 gap-x-2 mx-auto items-center">
                  <div className="">
                    <select className="" onChange={changeSeller}>
                      <option value="">Select Seller</option>
                      {props.alldata.seller.map((seller) => (
                        <option value={seller._id}>
                          {seller.personalInfomration.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <select className="" onChange={searchBrand}>
                      <option value="">Select Brand</option>
                      {props.alldata.brand.map((brand) => (
                        <option value={brand._id}>{brand.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <select className="" onChange={searchCategory}>
                      <option value="">Select Category</option>
                      {props.alldata.category.map((cat) => (
                        <option value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <button className="btn btn-success" onClick={exportPorduct}>
                      Export
                    </button>
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

const ImportForm = (props: exportImportPorps) => {
  const { readString } = usePapaParse();
  const [file, setfile] = useState<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    if (evt.files !== undefined) {
      setfile(evt.files![0]);
    }
  };
  function isValidJSON(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  const changeImport = () => {
    readString(file, {
      worker: true,
      complete: (results) => {
        // console.log(results.data);
        const spl = results.data.splice(0, 0);
        const data = spl;
        let sdata: any = [];
        const collectVolume: any = [];
        const stockVolume: any = [];
        let prd_var: any = [];
        if (results.data.length > 1) {
          results.data.map((dd: any, i: number) => {
            // console.log(dd);
            if (dd[46] === "product" || dd[46] === "variant") {
              const img_link = dd[21].split(",");
              const keywords = dd[25].split(",");
              const attr = dd[26].split(",");
              const key_description = dd[4].split(";");
              let attr_var = dd[27];
              if (isValidJSON(dd[27])) {
                // attr_var = JSON.parse(dd[27]);
                const rollb: any = [];
                JSON.parse(dd[27]).map((value: any) => {
                  rollb.push(value.split(","));
                });
                // console.log(rollb);
                attr_var = rollb;
              }
              const color = dd[28].split(",");
              const loginUser = JSON.parse(
                localStorage.getItem("adminUserData") as any
              );

              if (dd[46] === "variant") {
                // product variant
                const vrdata = {
                  variantName: dd[27],
                  variantPrice: dd[9],
                  variantQuantity: dd[16],
                  variantImage: dd[21].split(","),
                };
                prd_var.push(vrdata);

                // variant push if there is no variant for the product
                const tt = results.data[i + 1] as any;
                if (tt[46] !== "variant") {
                  collectVolume.push(prd_var);
                  stockVolume.push(sdata);
                  sdata = [];
                  prd_var = [];
                }

                // stock
                const svdata = {
                  productId: dd[31],
                  variantName: dd[27],
                  sku: dd[1],
                  slug: "",
                  sellerPrice: Number.isNaN(dd[8]) ? parseInt(dd[8]) : 0,
                  sellingPrice: Number.isNaN(dd[9]) ? parseInt(dd[9]) : 0,
                  mrp: Number.isNaN(dd[7]) ? parseInt(dd[7]) : 0,
                  gst: dd[12],
                  platformFee: dd[10],
                  logisticFee: 0,
                  paymentGatewayFee: dd[11],
                  quantity: parseInt(dd[16]),
                  finalStock: dd[16],
                  images: dd[21].split(","),
                  discount: 0,
                  discountType: "",
                  discription: dd[3],
                  highlight: dd[4],
                  rating: 0,
                  visibility: dd[35].toLowerCase(),
                  height: dd[42],
                  width: dd[43],
                  length: dd[41],
                  breadth: dd[40],
                };
                sdata.push(svdata as any);
              }
              if (dd[46] === "product") {
                // product push
                const ndata = {
                  _id: dd[31],
                  productInformation: {
                    name: dd[2],
                    brand: dd[6],
                    seller: dd[0],
                    unit: dd[13],
                    packOf: dd[14],
                    tags: keywords,
                    refundable: dd[39].toLowerCase(),
                    height: dd[42],
                    widht: dd[43],
                    length: dd[41],
                    breadth: dd[40],
                  },
                  productImages: {
                    images: img_link,
                    thumbnail: dd[19],
                  },
                  productVideos: {
                    videoProvider: dd[22],
                    videoLink: dd[23],
                  },
                  productVariation: {
                    isColor: true,
                    colorList: color,
                    attributes: attr,
                    variation: attr_var,
                    convertVariant: [],
                  },
                  productStocks: {
                    sku: dd[1],
                    unitPrice: dd[7],
                    hsn: dd[24],
                    sellerPrice: dd[8],
                    sellingPrice: dd[9],
                  },
                  productDescription: dd[3],
                  keyDescription: key_description,
                  pdfSpecification: dd[20],
                  seoMetaTags: {
                    url: dd[15],
                    title: dd[17],
                    description: dd[18],
                    image: dd[19],
                  },
                  // category: [],
                  cod: dd[44].toLowerCase(),
                  featured: dd[38].toLowerCase(),
                  publishedStatus: dd[35].toLowerCase(),
                  approvedStatus: dd[34].toLowerCase(),
                  addedBy: loginUser?.id,
                };
                data.push(ndata as any);
                // variant push if there is no variant for the product
                const tt = results.data[i + 1] as any;
                if (tt[46] !== "variant") {
                  collectVolume.push(prd_var);
                  stockVolume.push(sdata);
                }
                // empty if new product started
                prd_var = [];
                sdata = [];

                // stock (empty variant name)
                const svdata = {
                  productId: dd[31],
                  variantName: "main",
                  sku: dd[1],
                  slug: "",
                  sellerPrice: Number.isNaN(dd[8]) ? parseInt(dd[8]) : 0,
                  sellingPrice: Number.isNaN(dd[9]) ? parseInt(dd[9]) : 0,
                  mrp: Number.isNaN(dd[7]) ? parseInt(dd[7]) : 0,
                  gst: dd[12],
                  platformFee: dd[10],
                  logisticFee: 0,
                  paymentGatewayFee: dd[11],
                  quantity: dd[16],
                  finalStock: dd[16],
                  images: dd[21].split(","),
                  discount: 0,
                  discountType: "",
                  discription: dd[3],
                  highlight: dd[4],
                  rating: 0,
                  visibility: dd[35].toLowerCase(),
                  height: dd[42],
                  width: dd[43],
                  length: dd[41],
                  breadth: dd[40],
                };
                sdata.push(svdata as any);
              }
              // variant push if last item
              if (results.data.length - 1 === i) {
                collectVolume.push(prd_var);
              }
            }
          });
          console.log({
            product: data,
            stock: stockVolume,
            variant: collectVolume,
          });
          // console.log(stockVolume);
          importProduct({
            product: data,
            stock: stockVolume,
            variant: collectVolume,
          }).then((product) => {
            console.log(product);
          });
        }
      },
    });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-30">
        <div className="relative top-5 max-w-3xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="">Import</div>
                <div className="">
                  <XMarkIcon
                    className="w-6"
                    onClick={() => props.returnData()}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="">Upload</div>
                  <div className="">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="border p-2"
                    />
                  </div>
                  <div className="">
                    <button className="btn btn-success" onClick={changeImport}>
                      Upload
                    </button>
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

export default Product;
