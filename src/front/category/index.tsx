import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { FaHome } from "react-icons/fa";
import { ProductGrid, ProductGridHM } from "./product";
import { useRouter } from "next/router";
import { filterCategory, loadCategory } from "../query/category";
import {
  arrCategoryProps,
  filterComponentProps,
  filterResourceProps,
  productListComponent,
} from "../types/category";
import { Preloader } from "@/src/admin/data/stuff";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Category = () => {
  return (
    <>
      <Layout>
        <div className="p-standard bg-gray-100">
          <Content />
        </div>
      </Layout>
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [shownorecods, setshownorecods] = useState<boolean>(false);
  const [showpreloader, setshowpreloader] = useState<boolean>(true);
  const [productlist, setproductlist] = useState(arrCategoryProps);
  const [resource, setresource] = useState<any>();
  const [filterdata, setfilterdata] = useState<any>({
    category: [],
    brand: [],
    price: [],
    color: [],
    attribute: [],
  });
  const [currentpage, setcurrentpage] = useState<number>(0);
  useEffect(() => {
    console.log(router.query);
    if (router.query.q !== "" && router.query.q !== undefined) {
      loadCategory({ category: router.query.category, q: router.query.q }).then(
        (category: any) => {
          if (category.type === "error") {
            setshownorecods(true);
            setshowpreloader(false);
          } else {
            console.log(category.data.resource);
            setproductlist(category.data.data);
            setresource(category.data.resource);
            setshownorecods(false);
            setshowpreloader(false);
          }
        }
      );
    } else if (
      router.query.category !== "" &&
      router.query.category !== undefined
    ) {
      loadCategory({ category: router.query.category, q: "" }).then(
        (category: any) => {
          if (category.type === "error") {
            setshownorecods(true);
            setshowpreloader(false);
          } else {
            console.log(category.data.resource);
            setproductlist(category.data.data);
            setresource(category.data.resource);
            setshownorecods(false);
            setshowpreloader(false);
          }
        }
      );
    } else {
      setshownorecods(true);
      setshowpreloader(false);
    }
  }, [router.isReady]);

  const filterReturn = (dd: any) => {
    setshowpreloader(true);
    filterCategory(dd, currentpage, router.query.category as string).then(
      (response) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setproductlist(response.data.data);
        setshowpreloader(false);
      }
    );
  };
  const changePage = (no: number) => {
    setshowpreloader(true);
    setcurrentpage(no);
    filterCategory(filterdata, no, router.query.category as string).then(
      (response) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setproductlist(response.data.data);
        setshowpreloader(false);
      }
    );
  };
  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      <div className="py-2 flex items-center">
        <FaHome className="text-md" />
        &nbsp;/&nbsp;
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        {!showpreloader && shownorecods ? (
          <div className="col-span-12">
            <NotFoundError />
          </div>
        ) : (
          <>
            <div className="col-span-3">
              <FilterView alldata={resource} returnData={filterReturn} />
            </div>
            <div className="col-span-9">
              <ProductListCategory alldata={productlist} resource={resource} />
            </div>
            <div className="col-span-12">
              <Pagination changePage={changePage} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const FilterView = (props: filterComponentProps) => {
  const [filterdata, setfilterdata] = useState<any>({
    category: [],
    brand: [],
    price: [
      [
        props.alldata?.filters.amountSlider.min,
        props.alldata?.filters.amountSlider.max,
      ],
    ],
    color: [],
    attribute: [],
  });
  const [values, setValues] = useState<number[]>([
    props.alldata?.filters.amountSlider.min,
    props.alldata?.filters.amountSlider.max,
  ]);
  useEffect(() => {
    console.log(props);
    filterdata;
    setValues([
      props.alldata?.filters.amountSlider.min,
      props.alldata?.filters.amountSlider.max,
    ]);
  }, []);
  function generateEqualDistanceBreakupNumbers(
    start: number,
    end: number,
    count: number
  ) {
    if (count <= 1) {
      console.error("Count should be greater than 1");
      return [];
    }

    const step = (end - start) / (count - 1);
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push((start + step * i).toFixed(0));
    }

    return result;
  }
  const randomBreakups: any = generateEqualDistanceBreakupNumbers(
    props.alldata?.filters.amountSlider.min,
    props.alldata?.filters.amountSlider.max,
    10
  ); // Initial values

  const handleOnChange = (newValues: number[]) => {
    setValues(newValues);
    setfilterdata({
      ...filterdata,
      price: [newValues],
    });
  };

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    const isCheck = e.currentTarget.checked;
    if (isCheck) {
      setfilterdata({
        ...filterdata,
        [evt.name]: [...filterdata[evt.name], evt.value],
      });
      props.returnData({
        ...filterdata,
        [evt.name]: [...filterdata[evt.name], evt.value],
      });
    } else {
      const check = filterdata[evt.name].filter(
        (item: any) => item !== evt.value
      );

      setfilterdata({ ...filterdata, [evt.name]: check });
      props.returnData({ ...filterdata, [evt.name]: check });
      // console.log(filterdata.filter((item: any) => item !== evt.value));
    }
    // console.log(filterdata);
  };

  const changeAttributeForm = (
    e: React.FormEvent<HTMLInputElement>,
    attr: string | number
  ) => {
    const evt = e.currentTarget;
    const isCheck = e.currentTarget.checked;
    if (isCheck) {
      const searchValue = filterdata.attribute.findIndex(
        (obj: any) => obj.name === attr
      );
      if (searchValue !== -1) {
        const temp = [...filterdata.attribute];
        temp[searchValue] = {
          name: attr,
          value: [...temp[searchValue].value, evt.value],
        };
        setfilterdata({ ...filterdata, attribute: temp });
        props.returnData({ ...filterdata, attribute: temp });
      } else {
        setfilterdata({
          ...filterdata,
          attribute: [
            ...filterdata.attribute,
            { name: attr, value: [evt.value] },
          ],
        });
        props.returnData({
          ...filterdata,
          attribute: [
            ...filterdata.attribute,
            { name: attr, value: [evt.value] },
          ],
        });
      }
    } else {
      const searchValue = filterdata.attribute.findIndex(
        (obj: any) => obj.name === attr
      );
      if (searchValue !== -1) {
        const filter = filterdata.attribute[searchValue].value.filter(
          (obj: any) => obj !== evt.value
        );
        const temp = [...filterdata.attribute];
        temp[searchValue] = {
          name: attr,
          value: filter,
        };
        setfilterdata({ ...filterdata, attribute: temp });
        props.returnData({ ...filterdata, attribute: temp });
      }
    }
  };

  const priceFilter = () => {
    props.returnData(filterdata);
  };

  return (
    <>
      <div className="">
        {/* categories */}
        <div className="bg-white rounded-lg px-3 py-4 mb-2">
          <h2 className="uppercase pb-3 text-md font-semibold">Categories</h2>
          <ul className="">
            {props.alldata !== undefined &&
              props.alldata.category.map((dd) => (
                <li>
                  <label>
                    <div className="flex items-center gap-x-3">
                      <div className="">
                        <input
                          type="checkbox"
                          name="category"
                          value={dd._id}
                          onClick={changeForm}
                          className="accent-primary h-4 w-4 rounded-sm border-gray-400"
                        />
                      </div>
                      <div className="">{dd.name}</div>
                    </div>
                  </label>
                </li>
              ))}
          </ul>
        </div>
        {/* brands */}
        <div className="bg-white rounded-lg px-3 py-4 my-2">
          <h2 className="uppercase pb-3 text-md font-semibold">brand</h2>
          <ul className="max-h-52 overflow-x-hidden overflow-y-auto">
            {props.alldata !== undefined &&
              props.alldata.brand.map((dd) => (
                <li>
                  <label>
                    <div className="flex items-center gap-x-3">
                      <div className="">
                        <input
                          type="checkbox"
                          name="brand"
                          value={dd._id}
                          onClick={changeForm}
                          className="accent-primary h-4 w-4 rounded-sm border-gray-400"
                        />
                      </div>
                      <div className="">{dd.name}</div>
                    </div>
                  </label>
                </li>
              ))}
          </ul>
        </div>
        {/* price */}
        <div className="bg-white rounded-lg px-3 py-4 my-2 hidden">
          <h2 className="uppercase pb-3 text-md font-semibold">price</h2>
          <div className="text-center my-6">
            <div className="w-full max-w-md mx-auto mt-8">
              {/* <Slider
                  range={true}
                  min={props.alldata?.filters.amountSlider.min}
                  max={props.alldata?.filters.amountSlider.max}
                  value={values}
                  onChange={handleOnChange}
                  allowCross={true}
                  marks={{ 0: values[0], 100: values[1] }}
                /> */}
              <div className="flex justify-between mt-4">
                <span>{values[0]}</span>
                <span>{values[1]}</span>
              </div>
              <button
                className="block w-full bg-primary p-2 font-bold text-white rounded-md"
                onClick={() => priceFilter()}
              >
                Filter
              </button>
            </div>
          </div>
          <ul className="hidden">
            {randomBreakups.map((dd: number, i: number) => (
              <>
                {randomBreakups.length - 1 !== i ? (
                  <li>
                    <div className="flex items-center gap-x-3">
                      <div className="">
                        <input
                          type="checkbox"
                          className="accent-primary h-4 w-4 rounded-sm border-gray-400"
                        />
                      </div>
                      <div className="">
                        Rs.&nbsp;{dd} - {parseInt(randomBreakups[i + 1]) - 1}
                      </div>
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </>
            ))}
          </ul>
        </div>
        {/* colors */}
        <div
          className={`bg-white rounded-lg px-3 py-4 my-2 ${
            props.alldata !== undefined && props.alldata.color.length > 0
              ? "block"
              : "hidden"
          }`}
        >
          <h2 className="uppercase pb-3 text-md font-semibold">color</h2>
          <ul className="max-h-52 overflow-x-hidden overflow-y-auto">
            {props.alldata !== undefined &&
              props.alldata.color.map((dd) => (
                <li>
                  <label>
                    <div className="flex items-center gap-x-3">
                      <div className="">
                        <input
                          type="checkbox"
                          name="color"
                          value={dd.name}
                          onClick={changeForm}
                          className="accent-primary h-4 w-4 rounded-sm border-gray-400"
                        />
                      </div>
                      <div className="flex gap-x-2 items-center">
                        <div
                          className={`h-4 w-4 rounded-full`}
                          style={{ backgroundColor: dd.code }}
                        ></div>
                        <div className="">{dd.name}</div>
                      </div>
                    </div>
                  </label>
                </li>
              ))}
          </ul>
        </div>
        {/* attributes */}
        {props.alldata?.filters.attribute.map((attr) => (
          <div className="bg-white rounded-lg px-3 py-4 my-2">
            <h2 className="uppercase pb-3 text-md font-semibold">
              {attr.name}
            </h2>
            <ul className="min-h-auto max-h-52 overflow-x-hidden overflow-y-auto">
              {attr.value.map((val) => (
                <li>
                  <label>
                    <div className="flex items-center gap-x-3">
                      <div className="">
                        <input
                          type="checkbox"
                          value={val}
                          onClick={(e) => changeAttributeForm(e, attr.name)}
                          className="accent-primary h-4 w-4 rounded-sm border-gray-400"
                        />
                      </div>
                      <div className="">{val}</div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

const ProductListCategory = (props: productListComponent) => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-12">
          <div className="col-span-9"></div>
          <div className="col-span-3">
            <select
              name="orderby"
              className="py-4 text-md px-5 rounded-md bg-white shadow-lg border-0 w-full focus:outline-none"
            >
              <option value="date">Sort by latest</option>
              <option value="price">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-3">
          {props.alldata !== undefined &&
            props.alldata.map((item, i) => (
              <div key={i}>
                <ProductGrid data={item} />
              </div>
            ))}
          {/* <ProductGridHM /> */}
        </div>
      </div>
    </>
  );
};

type paginationProps = {
  changePage: Function;
};
const Pagination = (props: paginationProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    totalProduct: 457,
    perPageProduct: 20,
    currentPage: 1,
  });

  const elements = [];
  const noOfPages: any = collectdata.totalProduct / collectdata.perPageProduct;
  const noOfPage: number = noOfPages.toFixed(0);
  // console.log(noOfPage);
  for (let i = 0; i < noOfPage; i++) {
    elements.push(
      <div
        className={`font-bold cursor-pointer border border-transparent hover:border-gray-300 ${
          collectdata.currentPage === i
            ? "bg-primary text-white px-3 py-2 rounded-sm"
            : "px-3 py-2"
        }`}
        onClick={() => changePaginationPage(i)}
      >
        {i + 1}
      </div>
    );
  }

  const changePaginationPage = (page: number) => {
    setcollectdata({ ...collectdata, currentPage: page });
    props.changePage(page);
    console.log(page);
  };

  const changePaginationPageNext = () => {
    if (collectdata.currentPage !== 0) {
      setcollectdata({
        ...collectdata,
        currentPage: collectdata.currentPage - 1,
      });
      props.changePage(collectdata.currentPage - 1);
    }
  };

  const changePaginationPagePrevious = () => {
    if (collectdata.currentPage < noOfPage - 1) {
      setcollectdata({
        ...collectdata,
        currentPage: collectdata.currentPage + 1,
      });
      props.changePage(collectdata.currentPage + 1);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center gap-x-16">
          <div className="">
            <button
              className="px-5 py-2 border-2 border-primary font-bold"
              onClick={changePaginationPageNext}
            >
              <div className="flex items-center gap-x-2">
                <div className="">
                  <ChevronLeftIcon className="w-4" />
                </div>
                <div className="">Previous</div>
              </div>
            </button>
          </div>
          <div className="">
            <div className="flex py-10">{elements}</div>
          </div>
          <div className="">
            <button
              className="px-5 py-2 border-2 border-primary font-bold"
              onClick={changePaginationPagePrevious}
            >
              <div className="flex items-center gap-x-2">
                <div className="">Next</div>
                <div className="">
                  <ChevronRightIcon className="w-4" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const NotFoundError = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">No Products Found</h2>
        <p className="text-gray-600">
          Sorry, we couldn't find any products matching your search.
        </p>
        <img
          src="https://www.dikazo.com/assets/images/products_not_found.png"
          alt="No Products Found"
          className="mt-8 w-64 h-64 mx-auto"
        />
      </div>
    </div>
  );
};

export default Category;
