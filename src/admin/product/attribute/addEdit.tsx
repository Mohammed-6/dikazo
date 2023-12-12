import React, { useState, useEffect } from "react";
import { addEditProps, attributeProps } from "../../types/product/attribute";
import { uploadSingleFile } from "../../query/upload";
import {
  createAttribute,
  updateAttribute,
} from "../../query/product/attribute";
import { toaster } from "../../types/basic";
import { Preloader, Toaster } from "../../data/stuff";
import router from "next/router";

const AddEdit = (props: addEditProps) => {
  const [collectdata, setcollectdata] = useState<attributeProps>({
    _id: "",
    name: "",
    attributeValue: [],
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

    const newArray: any = [...collectdata.attributeValue];
    const updateArray = newArray.filter((value: unknown) => value !== "remove");
    const colte = {
      _id: collectdata._id,
      name: collectdata.name,
      attributeValue: updateArray,
    };
    // console.log(colte);
    if (collectdata._id !== "" && collectdata._id !== undefined) {
      updateAttribute(colte as attributeProps).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    } else {
      createAttribute(colte as attributeProps).then((resp) => {
        settoasterdata(resp.data);
        setshowtoaster(true);
        setshowpreloader(false);
        props.closePopUp();
      });
    }
  };

  const addMoreAttribute = () => {
    setcollectdata({
      ...collectdata,
      attributeValue: [...collectdata.attributeValue, "" as string],
    });
  };

  const changeAttributeValue = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.currentTarget.value;
    const newArray: any = [...collectdata.attributeValue];
    newArray[index] = val;
    setcollectdata({ ...collectdata, attributeValue: newArray });
  };

  const removeAttr = (index: number) => {
    setloading(false);
    const newArray: any = [...collectdata.attributeValue];
    newArray[index] = "remove";
    setcollectdata({ ...collectdata, attributeValue: newArray });
    setloading(true);
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
              <div className="flex items-center justify-between">
                <div className="">
                  <label className="form-label mb-1">Attribute Values</label>
                </div>
                <div className="">
                  <button className="" onClick={addMoreAttribute}>
                    Add More
                  </button>
                </div>
              </div>

              {loading &&
                collectdata.attributeValue !== undefined &&
                collectdata.attributeValue.map(
                  (
                    value: string | number | readonly string[] | undefined,
                    index: number
                  ) => (
                    <>
                      {value !== "remove" ? (
                        <div className="grid grid-cols-12 items-center gap-x-2">
                          <div className="col-span-10">
                            <div className="form-item">
                              <div className="">
                                <input
                                  className="form-input"
                                  type="text"
                                  name="metaTitle"
                                  autoComplete="off"
                                  placeholder=""
                                  defaultValue={value}
                                  onKeyUp={(e) =>
                                    changeAttributeValue(e, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <button
                              className="bg-red-500 text-white px-5 py-2 rounded-md"
                              onClick={() => removeAttr(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )
                )}

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
