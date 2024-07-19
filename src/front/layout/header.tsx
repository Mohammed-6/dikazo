import React, { useContext, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import menuItems from "../data/menu.json";
import { headerProp, subHeaderProp } from "../types/layout";
import Link from "next/link";
import LoginSetup from "../category/product";
import Fuse from "fuse.js";
import { HeaderContext } from "./HeaderContext";

const Header = () => {
  return (
    <>
      <SubHeader />
      <SearchHeader />
      <MenuHeader />
    </>
  );
};

const SubHeader = () => {
  return (
    <>
      <div className="bg-gray-200 text-xs py-2 font-semibold text-gray-700">
        <div className="flex justify-between p-standard">
          <div className="">Download App</div>
          <div className="">
            <div className="flex justify-around gap-6">
              <div className="">Seller Login</div>
              <div className="">Become a Seller</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchHeader = () => {
  const { searchData } = useContext(HeaderContext);

  const [showlogin, setshowlogin] = useState<boolean>(false);
  const showLogin = () => {
    setshowlogin(!showlogin);
  };

  const initialData = searchData;

  const [searchResults, setSearchResults] = useState<any>(initialData);
  const [searchResult, setSearchResult] = useState<any>();

  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.3,
    keys: ["keyword"],
  };

  const fuse = new Fuse(initialData, options);

  const generateNGrams = (str: string) => {
    const tokens = str.split(" ").map((token) => token.toLowerCase());
    const ngrams = new Set();

    for (let i = 0; i < tokens.length; i++) {
      for (let j = i + 1; j <= tokens.length; j++) {
        ngrams.add(tokens.slice(i, j).join(" "));
      }
    }

    return Array.from(ngrams);
  };
  // console.log(generateNGrams("pc games"));
  const searchKeywords = (event: React.FormEvent<HTMLInputElement>) => {
    const evt = event.target as HTMLInputElement;
    const input = evt.value;
    const ngrams = generateNGrams(input);
    let results: any = [];

    ngrams.forEach((ngram) => {
      const matches = fuse.search(ngram);
      results = results.concat(matches);
    });

    // Remove duplicates and sort by score
    results = results
      .filter(
        (v, i, a) => a.findIndex((t) => t.item.keyword === v.item.keyword) === i
      )
      .sort((a, b) => a.score - b.score);
    const dd = results.map((result: any) => ({
      keyword: result.item.keyword,
      category: result.item.category,
    }));
    setSearchResult(dd);
    console.log(dd);
  };
  return (
    <>
      {showlogin ? <LoginSetup hidePopup={showLogin} /> : ""}
      <div className="">
        <div className="grid grid-cols-2 p-standard items-center">
          <div className="flex items-center gap-x-6">
            <div className="col-span-2">
              <img
                src="https://dikazo.com/assets/images/dikazo-logo-main.png"
                className="h-16 w-32"
              />
            </div>
            <div className="col-span-10 w-full relative">
              <input
                type="text"
                className="bg-gray-200 px-2 py-2 rounded-md w-full"
                placeholder="Search..."
                onChange={searchKeywords}
              />
              <div className="absolute top-2 right-3">
                <MagnifyingGlassIcon className="w-6 stroke-gray-300" />
              </div>
              <div className="fixed z-[1000] shadow-lg w-auto bg-white rounded-b-lg">
                <ul>
                  {searchResult !== undefined &&
                    searchResult.map((data: any, i: number) => (
                      <Link
                        href={
                          "/search?q=" +
                          data.keyword +
                          "&category=" +
                          data.category
                        }
                      >
                        <li
                          className={`${
                            i !== searchResult.length - 1
                              ? "border-b border-b-gray-200"
                              : ""
                          } py-2 px-3`}
                        >
                          {data.keyword}
                        </li>
                      </Link>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-3 font-semibold text-sm">
            <div className="pr-4">
              <Link href="/cart">
                <div className="flex items-center gap-x-1">
                  <div className="">
                    <ShoppingBagIcon className="w-5" />
                  </div>
                  <div className="">Cart</div>
                </div>
              </Link>
            </div>
            <div className="pr-4">
              <div className="flex items-center gap-x-1">
                <div className="">
                  <HeartIcon className="w-5" />
                </div>
                <div className="">Wishlist</div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-x-1">
                <div className="">
                  <UserIcon className="w-5" />
                </div>
                <div className="">Profile</div>
              </div>
              {/* <button
                onClick={showLogin}
                className="bg-primary text-white px-4 py-3 rounded-md"
              >
                Login / SignUp
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuHeader = () => {
  const { categories, searchData } = useContext(HeaderContext);
  console.log(categories);
  return (
    <>
      <div className="border-t border-t-gray-200 py-3">
        <ul className="flex p-standard">
          {categories.map((dd: any) => (
            <MenuSubHeader menudata={dd} category={categories} />
          ))}
        </ul>
      </div>
    </>
  );
};

type menuSubHeaderProps = {
  menudata: { _id: string; name: string; link: string; parent: "" };
  category: [{ _id: string; name: string; link: string; parent: "" }];
};
const MenuSubHeader = (props: menuSubHeaderProps) => {
  return (
    <>
      {props.menudata.parent === "" ? (
        <li className="group">
          <a
            className="font-semibold py-3 px-5 text-sm border-b-0 hover:border-b-[3px] delay-100 border-b-primary relative z-20"
            href=""
          >
            {props.menudata.name}
          </a>
          <div className="fixed top-[15%] pt-10 z-10 left-10 min-w-[900px] max-h-screen h-auto bg-white hidden group-hover:block rounded-md shadow-lg">
            <div
              className={`grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-2`}
            >
              {props.category.map((mn) => {
                return (
                  <>
                    {props.menudata._id === mn.parent ? (
                      <div className="p-2">
                        <Link
                          href={"/" + props.menudata.link}
                          className="font-semibold text-primary text-sm"
                        >
                          {mn.name}
                        </Link>
                        <div className="grid">
                          {props.category.map((mx) => {
                            return (
                              <>
                                {mn._id === mx.parent ? (
                                  <Link
                                    href={"/" + mx.link}
                                    className="font-semibold text-black py-1 text-sm"
                                  >
                                    {mx.name}
                                  </Link>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
              <div className=""></div>
            </div>
          </div>
        </li>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
