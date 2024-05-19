import React, { useState, useEffect, cloneElement } from "react";
import { toaster } from "../types/basic";
import { Preloader, Toaster } from "../data/stuff";
import router from "next/router";
import { addEditProps, arrmenuProps, menuProps } from "../types/menu";
import { createMenu, updateMenu } from "../query/menu";

const AddEdit = (props: addEditProps) => {
  const [collectdata, setcollectdata] = useState<menuProps>({
    _id: "",
    parent: "",
    name: "",
    link: "",
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [parentmenulist, setparentmenulist] = useState(arrmenuProps);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    console.log(props);
    if (props.data.data._id !== "") {
      setcollectdata(props.data.data);
      setparentmenulist(props.data.list);

      setcollectdata({
        ...collectdata,
        _id: props.data.data._id,
        parent: props.data.data.parent,
        name: props.data.data.name,
        link: props.data.data.link,
      });
    }
  }, []);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const formChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    setshowpreloader(false);
    if (collectdata.name === "" || collectdata.link === "") {
      settoasterdata({
        type: "error",
        message: "*All fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }
    if (collectdata._id !== "" && collectdata._id !== undefined) {
      updateMenu(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    } else {
      createMenu(collectdata).then((resp) => {
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
            <div className="card-header">Add / Edit menu</div>
            <div className="card-body">
              <div className="form-item">
                <label className="form-label mb-1">Parent*</label>
                <div className="">
                  <select
                    className="w-full"
                    name="parent"
                    onChange={formChange}
                    value={collectdata.parent}
                  >
                    <option value=""></option>
                    {props.data.list !== undefined &&
                      props.data.list.map((dd: any) => (
                        <option value={dd._id}>{dd.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Name*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.name}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Link</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="link"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.link}
                    onChange={changeForm}
                  />
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
