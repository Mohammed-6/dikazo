import React, { useState, useEffect } from "react";
import { addEditProps, colorProps } from "../../types/product/color";
import { createColor, updateColor } from "../../query/product/color";
import { toaster } from "../../types/basic";
import { Preloader, Toaster } from "../../data/stuff";
import router from "next/router";

const AddEdit = (props: addEditProps) => {
  const [collectdata, setcollectdata] = useState<colorProps>({
    _id: "",
    name: "",
    code: "",
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    setcollectdata(props.data);
    collectdata;
  }, []);

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    setshowpreloader(true);
    if (collectdata.name === "") {
      settoasterdata({
        type: "error",
        message: "*Some fields are required!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }
    // console.log(colte);
    if (collectdata._id !== "" && collectdata._id !== undefined) {
      updateColor(collectdata).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    } else {
      createColor(collectdata).then((resp) => {
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
            <div className="card-header">Add / Edit attribute</div>
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
                <label className="form-label mb-1">Code*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="code"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.code}
                    onKeyUp={changeForm}
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
