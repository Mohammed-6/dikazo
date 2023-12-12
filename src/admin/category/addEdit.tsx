import React, { useEffect, useState } from "react";

import Layout from "../layout";
import { editProduct, listProductResource } from "../query/product/product";
import { componentProps } from "../types/category";
import { uploadMultipleFile, uploadSingleFile } from "../query/upload";
import { useRouter } from "next/router";
import { toaster } from "../types/basic";
import { MiniPreLoader, Preloader } from "../data/stuff";
import { categoryProps } from "../types/category";
import { loadResourceProps } from "../types/product/product";
import {
  createCategory,
  editPageCategory,
  updatePageCategory,
} from "../query/category";

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
  const [collectdata, setcollectdata] = useState<categoryProps>({
    _id: "",
    name: "",
    seoMetaTags: {
      url: "",
      title: "",
      description: "",
      image: "",
    },
    category: [],
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    const ud = JSON.parse(localStorage.getItem("adminUserData")!);
    // setcollectdata({ ...collectdata, addedBy: ud.id });
    setloading(false);
    listProductResource().then((product) => {
      setLoadResource(product.data);
    });
    if (router.query.editid !== "" && router.query.editid !== undefined) {
      editPageCategory(router.query.editid as string).then((resp) => {
        setcollectdata(resp.data.data);
        console.log(resp.data.data);
        setshowtoaster(false);
        setshowpreloader(false);
        setloading(true);
      });
    } else {
      setloading(true);
    }
    collectdata;
  }, [router.isReady]);
  const schema = {
    seoMetaTags: {
      title: "",
      description: "",
      image: "",
    },
    category: [],
  };
  const formReturnInfo = (e: any) => {
    setcollectdata({
      ...collectdata,
      name: e.val,
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

  const submitForm = () => {
    setshowpreloader(true);
    if (
      collectdata.name === "" ||
      collectdata.seoMetaTags.url === "" ||
      collectdata.seoMetaTags.title === "" ||
      collectdata.category.length === 0
    ) {
      settoasterdata({
        type: "error",
        message: "*Some fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    } else {
      if (router.query.editid !== "" && router.query.editid !== undefined) {
        updatePageCategory(collectdata).then((resp) => {
          settoasterdata(resp.data);
          setshowtoaster(true);
          setshowpreloader(false);
        });
      } else {
        createCategory(collectdata).then((resp) => {
          settoasterdata(resp.data);
          console.log(resp.data);
          setshowtoaster(true);
          setshowpreloader(false);
        });
      }
    }
  };
  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      <div className="p-standard">
        <h2 className="font-bold text-lg p-4">Add New Category</h2>
        <div className="grid grid-cols-12">
          {loading ? (
            <>
              <div className="col-span-8">
                <Information
                  resource={loadResource}
                  alldata={collectdata}
                  returnData={formReturnInfo}
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

const Information = (props: componentProps) => {
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  const changeFormKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    props.returnData({ name: evt.name, val: evt.value });
  };
  return (
    <div className="">
      <div className="card">
        <div className="card-header">Information</div>
        <div className="card-body">
          <div className="flex items-center py-2">
            <div className="w-1/5">
              <label className="">
                Category Name<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full rounded-md border p-2"
                placeholder=""
                name="url"
                defaultValue={props.alldata.name}
                onChange={changeForm}
                onKeyUp={changeFormKU}
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
              <label className="">
                Meta URL<span className="text-red-500">*</span>
              </label>
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
              <label className="">
                Meta Title<span className="text-red-500">*</span>
              </label>
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
          <div className="card-header">
            Product Category<span className="text-red-500">*</span>
          </div>
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

export default AddEdit;
