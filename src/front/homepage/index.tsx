import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { getHomepage } from "../query/homepage";
import {
  contentProps,
  detailProps,
  rowGridProps,
} from "@/src/admin/types/grid";

const Homepage = () => {
  const [structureid, setstructureid] = useState<string>();
  const [structure, setstructure] = useState<any>();
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    getHomepage()
      .then((hm) => {
        setstructure(hm.data.data);
        setstructureid(hm.data.structureId);
        setloading(true);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Layout>
        {loading ? (
          <Content
            structureid={structureid}
            structure={structure}
            parent="main"
          />
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

const Content = (props: contentProps) => {
  const [loading, setloading] = useState<boolean>(true);
  const [collectdata, setcollectdata] = useState<any>([]);
  useEffect(() => {
    if (props.structure !== undefined && props.structure.length > 0) {
      const getFilter = props.structure.filter(
        (str: any) => str.parent === "main"
      );
      console.log(getFilter);
      setcollectdata([...collectdata, ...getFilter]);
    }
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
                colname=""
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

  useEffect(() => {
    setrow(props.editdata.rowData);
    setselectedelement(props.editdata.propertyData);
    setrowelement(props.editdata.rowStyle);
    setstructurename(props.editdata.structureName);
    setmstructureid(props.editdata.structureId);
  }, []);

  return (
    <>
      <div className="py-5 p-3">
        <div className="">
          {row.map((rw: rowGridProps, i: number) => (
            <>
              <div
                className={`grid grid-cols-12 ${
                  rw.rowStyle ? `gap-x-[${rw.rowStyle.gapX}]` : ""
                }`}
              >
                {rw.grid.map((rr: any, x: number) => (
                  <>
                    <div
                      className={`border-2 border-dashed col-span-${rr.col}`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-x-0 justify-end my-0">
                          <div>
                            <select
                              className="appearance-none p-0"
                              value={rr.col}
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

export default Homepage;
