import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { getHomepage } from "../query/homepage";
import {
  contentProps,
  detailProps,
  rowGridProps,
} from "@/src/admin/types/grid";
import {
  ButtonElement,
  ImageElement,
  ProductGridElement,
  ProductSliderElement,
  SliderElement,
  TextElement,
} from "./elements/index";

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
          <PageContent
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

export const PageContent = (props: contentProps) => {
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
          {collectdata.map((rw: any) => {
            return (
              <>
                <div className={`${`grid-cols-12`}`}>
                  <Details
                    parent={rw.parent}
                    edit={true}
                    editdata={rw}
                    colname=""
                  />
                </div>
              </>
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
              <div className={`grid grid-cols-12 gap-x-3`}>
                {rw.grid.map((rr: any, x: number) => (
                  <>
                    <div className={`col-span-${rr.col}`}>
                      <div className="grid">
                        {rr.cols !== undefined &&
                          rr.cols.map((gr: any, g: number) => {
                            let sel = "";
                            let properties = {};
                            selectedelement.map((ex: any) => {
                              if (ex.colid === gr.name) {
                                sel = ex.elementType;
                                properties = ex.properties;
                              }
                            });
                            return (
                              <>
                                {/* <div className="text-red-500">{gr.name}</div> */}
                                {sel === "image" ? (
                                  <ImageElement data={properties} />
                                ) : sel === "text" ? (
                                  <TextElement data={properties} />
                                ) : sel === "button" ? (
                                  <ButtonElement data={properties} />
                                ) : sel === "slider" ? (
                                  <SliderElement data={properties} />
                                ) : sel === "product" ? (
                                  <ProductGridElement data={properties} />
                                ) : sel === "productSlider" ? (
                                  <ProductSliderElement data={properties} />
                                ) : (
                                  ""
                                )}
                              </>
                              // <select
                              //   className="p-0 appearance-none"
                              //   value={sel}
                              // >
                              //   <option value="">{gr.name}</option>
                              //   <option value="image">Image</option>
                              //   <option value="text">Text</option>
                              //   <option value="button">Button</option>
                              //   <option value="slider">Slider</option>
                              //   <option value="product">Product</option>
                              // </select>
                            );
                          })}
                      </div>
                      {rr.grid !== undefined && rr.grid !== null
                        ? rr.grid.map((rg: any) => (
                            <>
                              <PageContent
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
