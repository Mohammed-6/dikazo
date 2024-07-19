import React, { useEffect, useRef, useState } from "react";
import { elementProps } from "../../types/homepage";
import Link from "next/link";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { calculatePercentage, imageURL } from "@/src/admin/data/stuff";

export const ImageElement = (props: elementProps) => {
  const alldata = props.data;

  const styles = `h-[${alldata.height}] w-[${alldata.width}] max-h-[${alldata.maxHeight}] max-w-[${alldata.maxWidth}] border-[${alldata.border}] rounded-[${alldata.borderRadius}] object-[${alldata.objectFit}] shadow-${alldata.boxShadow} opacity-[${alldata.opacity}] `;
  return (
    <>
      <div className={`${alldata.className}`}>
        <Link href={alldata.link !== undefined ? alldata.link : ""}>
          <img src={alldata.imageWebUrl} className={styles} />
        </Link>
      </div>
    </>
  );
};

export const TextElement = (props: elementProps) => {
  const alldata = props.data;
  return (
    <>
      <alldata.elementContainer
        href={alldata.link !== undefined ? alldata.link : ""}
        className={`${alldata.fontWeight} ${alldata.fontStyle} ${alldata.textAlign} ${alldata.textDecoration} ${alldata.lineHeight} ${alldata.letterSpacing} ${alldata.textTransform} ${alldata.className}`}
        style={{ color: alldata.color, fontSize: alldata.fontSize }}
      >
        {alldata.elementText}
      </alldata.elementContainer>
    </>
  );
};

export const ButtonElement = (props: elementProps) => {
  useEffect(() => {}, []);
  return (
    <>
      <button
        onClick={props.data.link !== undefined ? props.data.link : ""}
        className={`${props.data.className}`}
        style={{
          color: props.data.color,
          background: props.data.bgColor,
          fontWeight: props.data.fontWeight,
          paddingTop: props.data.paddingTop,
          paddingBottom: props.data.paddingBottom,
          paddingLeft: props.data.paddingLeft,
          paddingRight: props.data.paddingRight,
          fontSize: props.data.fontSize,
        }}
      >
        {props.data.elementText}
      </button>
    </>
  );
};

export const SliderElement = (props: elementProps) => {
  const alldata = props.data;
  const images = alldata.elementValue.split(",");
  return (
    <>
      <div className="">
        <Carousel
          ariaLabel={alldata.ariaLabel}
          axis={alldata.axis}
          autoFocus={alldata.autoFocus}
          autoPlay={alldata.autoPlay}
          centerMode={alldata.centerMode}
          centerSlidePercentage={alldata.centerSlidePercentage}
          dynamicHeight={alldata.dynamicHeight}
          emulateTouch={alldata.emulateTouch}
          infiniteLoop={alldata.infiniteLoop}
          interval={alldata.interval}
          selectedItem={alldata.selectedItem}
          showArrows={alldata.showArrows}
          showStatus={alldata.showStatus}
          showIndicators={alldata.showIndicators}
          showThumbs={alldata.showThumbs}
          stopOnHover={alldata.stopOnHover}
          swipeable={alldata.swipeable}
          transitionTime={alldata.transitionTime}
          useKeyboardArrows={alldata.useKeyboardArrows}
          // borderSize={alldata.borderSize}
          width={alldata.width}
          renderArrowPrev={(clickHandler, hasPrev) => {
            return (
              <div
                className={`${
                  hasPrev ? "absolute" : "hidden"
                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
                <ChevronLeftIcon className="w-9 h-9 text-black" />
              </div>
            );
          }}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              <div
                className={`${
                  hasNext ? "absolute" : "hidden"
                } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
                <ChevronRightIcon className="w-9 h-9 text-black" />
              </div>
            );
          }}
        >
          {images !== undefined &&
            images?.map((image: string) => (
              <div>
                <img src={image} className="w-[500px] h-auto" />
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export const ProductGridElement = (props: elementProps) => {
  const alldata = props.data;

  return (
    <>
      <div className="group shadow-lg hover:shadow-xl hover:cursor-pointer duration-300 bg-white rounded-xl m-2">
        <div className="">
          <div className="relative z-0 group-hover:cursor-pointer">
            <a href={`/product/` + alldata.seoURL}>
              <img
                src={`${alldata.thumbnail}`}
                className="rounded-tl-lg rounded-tr-lg"
              />
            </a>
            <div className="absolute bg-red-500 top-3 left-3 text-xs px-2 py-1 text-white z-10 rounded-full font-semibold">
              {calculatePercentage(alldata?.sellingPrice, alldata?.mrp)}% OFF
            </div>
            <div className="absolute inset-0 bg-black/10 z-10 rounded-tl-lg rounded-tr-lg duration-100 opacity-0 group-hover:opacity-100"></div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 duration-300 z-20">
              <div className="flex items-center gap-x-2">
                <div className="">
                  <ShoppingBagIcon className="w-12 rounded-full bg-white p-3 pb-3" />
                </div>
                <div className="">
                  <HeartIcon className="w-12 rounded-full bg-white p-3 pb-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="text-xs">{alldata.brand}</div>
            <div className="textmd font-semibold">
              <a href={`/product/` + alldata.seoURL}>{alldata.title}</a>
            </div>
            <div className="flex items-center font-bold gap-x-2">
              <div className="text-md text-gray-300">
                <del>₹{alldata.mrp}</del>
              </div>
              <div className="text-primary text-md">
                ₹{alldata.sellingPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductSliderElement = (props: elementProps) => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 overflow-x-auto gap-2">
          {props.data.productdata.map((product: any, productIndex: number) => (
            <div className="">
              <ProductGridElement data={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const InfiniteProductSlider = ({ products, productsPerSlide }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="">
      <div className="flex gap-2 overflow-x-auto">
        {products.map((product: any, productIndex: number) => (
          <div key={productIndex} className="w-1/3 px-4">
            <div className="border shadow-lg p-4">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="mx-auto w-64 h-64 object-cover"
              />
              <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
