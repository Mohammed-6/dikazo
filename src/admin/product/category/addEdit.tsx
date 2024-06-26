import React, { useState, useEffect } from "react";
import { addEditProps, categoryProps } from "../../types/product/category";
import { uploadSingleFile } from "../../query/upload";
import { createCategory, updateCategory } from "../../query/product/category";
import { toaster } from "../../types/basic";
import { Preloader, Toaster } from "../../data/stuff";
import router from "next/router";

const AddEdit = (props: addEditProps) => {
  const [collectdata, setcollectdata] = useState<categoryProps>({
    _id: "",
    name: "",
    banner: "",
    icon: "",
    metaTitle: "",
    metaDescription: "",
    status: true,
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    setcollectdata(props.data);
  }, []);

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeFormTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const event = e.target as HTMLTextAreaElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeFormTextarea1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const event = e.target as HTMLTextAreaElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const uploadBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadSingleFile(files as any).then((res) =>
        setcollectdata({ ...collectdata, banner: res.data.data })
      );
    }
  };

  const uploadIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const files = Array.from(file);
      uploadSingleFile(files as any).then((res) =>
        setcollectdata({ ...collectdata, icon: res.data.data })
      );
    }
  };

  const submitForm = () => {
    setshowpreloader(true);
    if (
      collectdata.name === "" ||
      collectdata.banner === "" ||
      collectdata.icon == ""
    ) {
      settoasterdata({
        type: "error",
        message: "*Some fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      console.log(collectdata);
      return;
    }
    if (collectdata._id !== "" && collectdata._id !== undefined) {
      updateCategory(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    } else {
      createCategory(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    }
  };

  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="max-w-2xl relative top-6 mx-auto">
          <div className="card">
            <div className="card-header">Add / Edit Category</div>
            <div className="card-body">
              <div className="form-item">
                <label className="form-label mb-1">Name*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.name}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Banner(200x200)*</label>
                <div className="">
                  <input
                    className="form-input"
                    onChange={uploadBanner}
                    type="file"
                    name="banner"
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Icon(30x30)*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="file"
                    name="icon"
                    onChange={uploadIcon}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Meta Title</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="metaTitle"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.metaTitle}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Meta Description</label>
                <div className="">
                  <textarea
                    className="w-full rounded-md"
                    name="metaDescription"
                    onKeyUp={changeFormTextarea}
                    onChange={changeFormTextarea1}
                    rows={5}
                    value={collectdata.metaDescription}
                  >
                    {collectdata.metaDescription}
                  </textarea>
                </div>
              </div>
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
              <div className="">
                <button
                  className="bg-primary text-sm text-white text-md font-bold px-6 py-2 rounded-md mr-3"
                  onClick={submitForm}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-sm text-white text-md font-bold px-6 py-2 rounded-md"
                  onClick={() => props.closePopUp()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
