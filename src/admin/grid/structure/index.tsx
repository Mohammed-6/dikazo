import React, { useState, useEffect } from "react";
import Layout from "../../layout/index";
import {
  contentProps,
  detailProps,
  elementProps,
  rowGridProps,
} from "../../types/grid";
import { PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { searchProduct } from "../../query/structure";
import { imageURL } from "../../data/stuff";
import {
  createContent,
  createStructure,
  getStructure,
  getStructure_,
  updateStructure,
  updateStructure_,
} from "../../query/structure/structure";
import {
  ButtonElement,
  ImageElement,
  ProductElement,
  RowElement,
  SliderElement,
  TextElement,
} from "./element";
import { useRouter } from "next/router";
import Link from "next/link";

const generateRandomAlphanumeric = (length: number) => {
  const alphanumericChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    result += alphanumericChars.charAt(randomIndex);
  }

  return result;
};
const Structure = () => {
  const router = useRouter();
  const [structureid, setstructureid] = useState<string>();
  const [structurename, setstructurename] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    if (
      router.query.structureid !== "" &&
      router.query.structureid !== undefined
    ) {
      const structureId = router.query.structureid as string;
      setstructureid(structureId);
      const colte = {
        structureId: structureId,
      };
      createContent(colte).then((res: any) => {
        console.log(res.data);
        setloading(true);
      });
      getStructure_(colte).then((res: any) => {
        setstructurename(res.data.data.name);
      });
    }
    if (router.pathname === "/admin/grid/add") {
      const structureId = generateRandomAlphanumeric(7);
      setstructureid(structureId);
      const colte = {
        structureId: structureId,
      };
      createContent(colte).then((res: any) => {
        console.log(res.data);
        setloading(true);
      });
    }
    console.log(router.pathname);
  }, [router.isReady]);
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    setstructurename(evt.value);
    const colte = { structureId: structureid, name: evt.value };
    updateStructure_(colte)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <Layout>
        {loading ? (
          <>
            {" "}
            <Link
              href="/admin/grid"
              className="bg-primary text-white px-3 py-1 m-3 rounded-md"
            >
              Back
            </Link>
            <div className="p-3">
              <label className="font-bold">Structure Name</label>
              <br />
              <input
                type="text"
                onChange={changeForm}
                className="w-[50%]"
                value={structurename}
              />
            </div>
            <Content structureid={structureid} parent="main" />
          </>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

const Content = (props: contentProps) => {
  const [loading, setloading] = useState<boolean>(false);
  const [collectdata, setcollectdata] = useState<any>([]);
  useEffect(() => {
    const colte = {
      parent: props.parent,
      rowData: [],
      propertyData: [],
      structureName: props.structurename || generateRandomAlphanumeric(8),
      structureId: props.structureid,
      version: 0,
    };
    getStructure(colte).then((res) => {
      console.log([...collectdata, ...res.data.data]);
      setcollectdata([...collectdata, ...res.data.data]);
      setloading(true);
    });
  }, []);
  return (
    <>
      {loading ? (
        <>
          {collectdata.map((col: any) => {
            return (
              <Details
                parent={col.parent}
                edit={true}
                editdata={col}
                colname={generateRandomAlphanumeric(6)}
              />
            );
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Details = (props: detailProps) => {
  const [row, setrow] = useState<any>([]);
  const [selectedelement, setselectedelement] = useState<any>([]);
  const [rowelement, setrowelement] = useState<any>({});
  const [structurename, setstructurename] = useState<string>("");
  const [mstructureid, setmstructureid] = useState<string>("");
  const [showelement, setshowelement] = useState<any>({
    elementType: "image",
    isShow: false,
  });

  useEffect(() => {
    console.log(props.editdata);
    // if (props.edit) {
    // if (props.editdata.parent === props.parent) {
    setrow(props.editdata.rowData);
    setselectedelement(props.editdata.propertyData);
    setrowelement(props.editdata.rowStyle);
    setstructurename(props.editdata.structureName);
    setmstructureid(props.editdata.structureId);
    // }
    // }
  }, []);

  const addRow = () => {
    setrow([
      ...row,
      {
        name: generateRandomAlphanumeric(6),
        structureName: structurename,
        colid: props.colname,
        grid: [],
      },
    ]);
    const colte = {
      structureName: structurename,
      rowData: [
        ...row,
        {
          name: generateRandomAlphanumeric(6),
          structureName: structurename,
          colid: props.colname,
          grid: [],
        },
      ],
      structureId: mstructureid,
    };
    uptStructure(colte);
  };
  const uptStructure = (colte: any) => {
    updateStructure(colte)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const addRowCols = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLSelectElement>,
    i: number
  ) => {
    const evt = e.currentTarget;
    if (evt.value !== "") {
      const temp = [...row];
      const tt = {
        name: temp[i].name,
        grid: [
          ...temp[i].grid,
          {
            parent: temp[i].name,
            name: generateRandomAlphanumeric(6),
            col: evt.value,
            grid: [],
            cols: [],
          },
        ],
      };
      temp[i] = tt;
      setrow(temp);
      const colte = {
        structureName: structurename,
        rowData: temp,
        structureId: mstructureid,
      };
      uptStructure(colte);
    }
  };
  //
  const addRowColsRow = (i: number, x: number) => {
    const temp = [...row];
    const tt = [
      ...temp[i].grid[x].cols,
      { parent: temp[i].grid[x].name, name: generateRandomAlphanumeric(6) },
    ];
    temp[i].grid[x].cols = tt;
    setrow(temp);
    const colte = {
      structureName: structurename,
      rowData: temp,
      structureId: mstructureid,
    };
    uptStructure(colte);
    console.log(temp);
  };
  const editRowCols = (
    e: React.ChangeEvent<HTMLSelectElement>,
    x: number,
    i: number,
    name: string
  ) => {
    const evt = e.currentTarget;
    if (evt.value === "row") {
      const temp = [...row];
      temp[i].grid[x].grid = [
        ...temp[i].grid[x].grid,
        { parent: name, colid: generateRandomAlphanumeric(6) },
      ];
      setrow(temp);
      const colte = {
        structureName: structurename,
        rowData: temp,
        structureId: mstructureid,
      };
      uptStructure(colte);
      return;
    }
    const temp = [...row];
    temp[i].grid[x].col = evt.value;
    const colte = {
      structureName: structurename,
      rowData: temp,
      structureId: mstructureid,
    };
    uptStructure(colte);
    setrow(temp);
  };
  const delRowCols = (x: number, i: number) => {
    const temp = [...row];
    const dd = [...temp[i].grid];
    const filteredArray = dd.filter((item, p) => p !== x);
    temp[i].grid = filteredArray;
    setrow(temp);
    const colte = {
      structureName: structurename,
      rowData: temp,
      structureId: mstructureid,
    };
    uptStructure(colte);
  };
  const delRow = (i: number) => {
    const temp = [...row];
    const filteredArray = temp.filter((item, p) => p !== i);
    setrow(filteredArray);
    const colte = {
      structureName: structurename,
      rowData: filteredArray,
      structureId: mstructureid,
    };
    uptStructure(colte);
  };

  const selectElement = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLSelectElement>,
    i: string
  ) => {
    const evt = e.currentTarget;
    if (evt.value !== "") {
      const tempColId = i;
      const index = selectedelement.findIndex(
        (se: any) => se.colid === tempColId
      );
      if (index !== -1) {
        const temp = [...selectedelement];
        temp[index].elementType = evt.value;
        setselectedelement(temp);
        setshowelement({
          elementType: evt.value,
          colid: tempColId,
          isShow: true,
          properties: temp[index].properties,
        });
      } else {
        setselectedelement([
          ...selectedelement,
          { colid: tempColId, elementType: evt.value, properties: [] },
        ]);
        setshowelement({
          elementType: evt.value,
          colid: tempColId,
          isShow: true,
          properties: [],
        });
      }
    }
  };

  const returnData = (data: any) => {
    const temp = [...selectedelement];
    const index = selectedelement.findIndex(
      (se: any) => se.colid === data.colid
    );
    temp[index].properties = data.data;
    const colte = {
      structureName: structurename,
      propertyData: temp,
      structureId: mstructureid,
    };
    uptStructure(colte);
    setselectedelement(temp);
    setshowelement({
      elementType: "",
      colid: "",
      isShow: false,
      properties: [],
    });
  };

  const selectRwElement = () => {
    setshowelement({
      elementType: "row",
      isShow: true,
      properties: rowelement,
    });
  };

  const returnRowData = (data: any) => {
    const colte = {
      structureName: structurename,
      rowStyle: data,
      structureId: mstructureid,
    };
    uptStructure(colte);
    setrowelement(data);
    setshowelement({
      elementType: "",
      colid: "",
      isShow: false,
      properties: [],
    });
  };

  return (
    <>
      {showelement.elementType === "image" && showelement.isShow === true ? (
        <ImageElement
          returnData={returnData}
          colid={showelement.colid}
          properties={showelement.properties}
        />
      ) : showelement.elementType === "text" && showelement.isShow === true ? (
        <TextElement
          returnData={returnData}
          colid={showelement.colid}
          properties={showelement.properties}
        />
      ) : showelement.elementType === "button" &&
        showelement.isShow === true ? (
        <ButtonElement
          returnData={returnData}
          colid={showelement.colid}
          properties={showelement.properties}
        />
      ) : showelement.elementType === "slider" &&
        showelement.isShow === true ? (
        <SliderElement
          returnData={returnData}
          colid={showelement.colid}
          properties={showelement.properties}
        />
      ) : showelement.elementType === "product" &&
        showelement.isShow === true ? (
        <ProductElement
          returnData={returnData}
          colid={showelement.colid}
          properties={showelement.properties}
        />
      ) : showelement.elementType === "row" && showelement.isShow === true ? (
        <RowElement
          returnData={returnRowData}
          colid={""}
          properties={showelement.properties}
        />
      ) : (
        ""
      )}
      <div className="py-5 p-3">
        <div className="flex justify-end my-3">
          <button
            className="bg-primary px-5 py-1 text-white font-bold rounded-md"
            onClick={addRow}
          >
            Add Grid
          </button>
        </div>
        <div className="">
          {row.map((rw: rowGridProps, i: number) => (
            <>
              <div className="flex gap-x-1 items-center justify-end">
                <div>
                  <button
                    className="bg-orange-500 p-0.5 rounded-sm"
                    onClick={() => selectRwElement()}
                  >
                    <PencilIcon className="w-6 p-0.5 stroke-white" />
                  </button>
                </div>
                <div>
                  <button
                    className="bg-blue-500 p-0.5 rounded-sm"
                    onClick={() => delRow(i)}
                  >
                    <XMarkIcon className="w-6 stroke-white" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-4 border-dashed border-spacing-2 py-2">
                <div className="col-span-12 flex justify-end my-0">
                  <select
                    className=""
                    onChange={(e) => addRowCols(e, i)}
                    onDoubleClick={(e) => addRowCols(e, i)}
                  >
                    <option value="">Select cols</option>
                    <option value="1">col 1</option>
                    <option value="2">col 2</option>
                    <option value="3">col 3</option>
                    <option value="4">col 4</option>
                    <option value="5">col 5</option>
                    <option value="6">col 6</option>
                    <option value="7">col 7</option>
                    <option value="8">col 8</option>
                    <option value="9">col 9</option>
                    <option value="10">col 10</option>
                    <option value="11">col 11</option>
                    <option value="12">col 12</option>
                  </select>
                </div>
                {rw.grid.map((rr: any, x: number) => (
                  <>
                    <div
                      className={`border-2 border-dashed col-span-${rr.col}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <button
                            className="bg-green-500 p-0 rounded-sm"
                            onClick={() => addRowColsRow(i, x)}
                          >
                            <PlusIcon className="w-6 stroke-white" />
                          </button>
                        </div>
                        <div className="flex items-center gap-x-0 justify-end my-0">
                          <div>
                            <select
                              className="appearance-none p-0"
                              value={rr.col}
                              onChange={(e) => editRowCols(e, x, i, rr.name)}
                            >
                              <option value="">Select cols</option>
                              <option value="1">col 1</option>
                              <option value="2">col 2</option>
                              <option value="3">col 3</option>
                              <option value="4">col 4</option>
                              <option value="5">col 5</option>
                              <option value="6">col 6</option>
                              <option value="7">col 7</option>
                              <option value="8">col 8</option>
                              <option value="9">col 9</option>
                              <option value="10">col 10</option>
                              <option value="11">col 11</option>
                              <option value="12">col 12</option>
                              <option value="row">New Row</option>
                            </select>
                          </div>
                          <div>
                            <button
                              className="bg-red-500 p-0 rounded-sm"
                              onClick={() => delRowCols(x, i)}
                            >
                              <XMarkIcon className="w-6 stroke-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid">
                        {rr.cols !== undefined &&
                          rr.cols.map((gr: any, g: number) => {
                            let sel = "";
                            selectedelement.map((ex: any) => {
                              if (ex.colid === gr.name) {
                                sel = ex.elementType;
                              }
                            });
                            return (
                              <select
                                className="p-0 appearance-none"
                                value={sel}
                                onChange={(e) => selectElement(e, gr.name)}
                                onDoubleClick={(e) => selectElement(e, gr.name)}
                              >
                                <option value="">{gr.name}</option>
                                <option value="image">Image</option>
                                <option value="text">Text</option>
                                <option value="button">Button</option>
                                <option value="slider">Slider</option>
                                <option value="product">Product</option>
                              </select>
                            );
                          })}
                      </div>
                      {rr.grid !== undefined && rr.grid !== null
                        ? rr.grid.map((rg: any) => (
                            <>
                              <Content
                                parent={rg.colid}
                                structureid={mstructureid}
                                structurename={rg.parent}
                              />
                            </>
                          ))
                        : ""}
                    </div>
                  </>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Structure;
