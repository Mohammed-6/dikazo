import React, { useState, useEffect } from "react";
import { detailProps, elementProps, rowGridProps } from "../../types/grid";
import { imageURL } from "../../data/stuff";
import { searchProduct } from "../../query/structure";

export const ImageElement = (props: elementProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    elementType: "image",
    imageWebUrl: "",
    imageMobileUrl: "",
    link: "",
    className: "",
    height: "auto",
    width: "auto",
    maxHeight: "auto",
    maxWidth: "auto",
    border: "0px",
    borderRadius: 0,
    objectFit: "contain",
    boxShadow: "none",
    opacity: 100,
  });

  useEffect(() => {
    if (
      props.properties !== undefined &&
      props.properties.elementType !== null &&
      props.properties.elementType === "image"
    ) {
      setcollectdata(props.properties);
    }
  }, []);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    props.returnData({ colid: props.colid, data: collectdata });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-4xl mx-auto relative top-3">
          <div className="card">
            <div className="card-header">Image Element</div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Image Web URL</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="imageWebUrl"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.imageWebUrl}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Image Mobile URL</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="imageMobileUrl"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.imageMobileUrl}
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
                  <div className="form-item">
                    <label className="form-label mb-1">className</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="className"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.className}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Height</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="height"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.height}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Width</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="width"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.width}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Max Width</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="maxWidth"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.maxWidth}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Max Height</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="maxHeight"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.maxHeight}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Border</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="border"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.border}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Border radius</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.borderRadius}
                        name="borderRadius"
                        className="w-full"
                      >
                        <option value="none">None</option>
                        <option value="xs">Xtra Small</option>
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="full">Full</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Object fit</label>
                    <select
                      onChange={changeForm}
                      value={collectdata.objectFit}
                      name="objectFit"
                      className="w-full"
                    >
                      <option value=""></option>
                      <option value="fill">Fill</option>
                      <option value="contain">Contain</option>
                      <option value="cover">Cover</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Box Shadow</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.boxShadow}
                        name="boxShadow"
                        className="w-full"
                      >
                        <option value="none">None</option>
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Opacity</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.opacity}
                        name="opacity"
                        className="w-full"
                      >
                        <option value=""></option>
                        <option value="10">0.1</option>
                        <option value="20">0.2</option>
                        <option value="30">0.3</option>
                        <option value="40">0.4</option>
                        <option value="50">0.5</option>
                        <option value="60">0.6</option>
                        <option value="70">0.7</option>
                        <option value="80">0.8</option>
                        <option value="90">0.9</option>
                        <option value="100">1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-white bg-primary px-4 py-1 rounded-md"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TextElement = (props: elementProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    elementType: "text",
    elementText: "",
    link: "",
    elementContainer: "div",
    color: "#000000",
    colorWeight: "900",
    fontSize: "16px",
    className: "",
    fontWeight: "font-normal",
    fontStyle: "not-italic",
    textAlign: "text-left",
    textDecoration: "no-underline",
    lineHeight: "leading-none",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
  });

  useEffect(() => {
    if (
      props.properties !== undefined &&
      props.properties.elementType !== null &&
      props.properties.elementType === "text"
    ) {
      setcollectdata(props.properties);
    }
  }, []);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    props.returnData({ colid: props.colid, data: collectdata });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-4xl mx-auto relative top-3">
          <div className="card">
            <div className="card-header">Text Element</div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-2">
                  <div className="form-item">
                    <label className="form-label mb-1">Element Text</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="elementText"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.elementText}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Color</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="color"
                        name="color"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.color}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">
                      Text Element Container
                    </label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.elementContainer}
                        name="elementContainer"
                        className="w-full"
                      >
                        <option value="div">div</option>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                        <option value="h4">h4</option>
                        <option value="h5">h5</option>
                        <option value="h6">h6</option>
                        <option value="p">p</option>
                        <option value="a">a</option>
                      </select>
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
                  <div className="form-item">
                    <label className="form-label mb-1">className</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="className"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.className}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">
                      Font size(px,rem,em)
                    </label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="fontSize"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.fontSize}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Font weight</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.fontWeight}
                        name="fontWeight"
                        className="w-full"
                      >
                        <option value="font-thin">font-thin</option>
                        <option value="font-extralight">font-extralight</option>
                        <option value="font-light">font-light</option>
                        <option value="font-normal">font-normal</option>
                        <option value="font-medium">font-medium</option>
                        <option value="font-semibold">font-semibold</option>
                        <option value="font-bold">font-bold</option>
                        <option value="font-extrabold">font-extrabold</option>
                        <option value="font-black">font-black</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Font style</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.fontStyle}
                        name="fontStyle"
                        className="w-full"
                      >
                        <option value="not-italic">not-italic</option>
                        <option value="italic">italic</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Text align</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.textAlign}
                        name="textAlign"
                        className="w-full"
                      >
                        <option value="text-left">text-left</option>
                        <option value="text-center">text-center</option>
                        <option value="text-right">text-right</option>
                        <option value="text-justify">text-justify</option>
                        <option value="text-start">text-start</option>
                        <option value="text-end">text-end</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Text Decoration</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.textDecoration}
                        name="textDecoration"
                        className="w-full"
                      >
                        <option value="no-underline">no-underline</option>
                        <option value="overline">overline</option>
                        <option value="line-through">line-through</option>
                        <option value="underline">underline</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Line Height</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.lineHeight}
                        name="lineHeight"
                        className="w-full"
                      >
                        <option value="leading-none">None</option>
                        <option value="leading-tight">tight</option>
                        <option value="leading-snug">snug</option>
                        <option value="leading-normal">normal</option>
                        <option value="leading-relaxed">relaxed</option>
                        <option value="leading-loose">loose</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Letter spacing</label>
                    <select
                      onChange={changeForm}
                      value={collectdata.letterSpacing}
                      name="letterSpacing"
                      className="w-full"
                    >
                      <option value="tracking-normal">normal</option>
                      <option value="tracking-tighter">tighter</option>
                      <option value="tracking-tight">tight</option>
                      <option value="tracking-wide">wide</option>
                      <option value="tracking-wider">wider</option>
                      <option value="tracking-widest">widest</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Text transform</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.textTransform}
                        name="textTransform"
                        className="w-full"
                      >
                        <option value="normal-case">normal</option>
                        <option value="capitalize">capitalize</option>
                        <option value="lowercase">lowercase</option>
                        <option value="uppercase">uppercase</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-white bg-primary px-4 py-1 rounded-md"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ButtonElement = (props: elementProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    elementType: "button",
    elementText: "",
    link: "",
    className: "",
    color: "#ffffff",
    colorWeight: "900",
    bgColor: "#000000",
    bgColorWeight: "900",
    roundedValue: "rounded-none",
    fontSize: "16px",
    fontWeight: "font-normal",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    height: "0px",
    width: "0px",
    textTypography: "text-md",
    borderSize: 0,
    shadow: "shadow-none",
  });

  useEffect(() => {
    if (
      props.properties !== undefined &&
      props.properties.elementType !== null &&
      props.properties.elementType === "button"
    ) {
      setcollectdata(props.properties);
    }
  }, []);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    props.returnData({ colid: props.colid, data: collectdata });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-4xl mx-auto relative top-3">
          <div className="card">
            <div className="card-header">Text Element</div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-x-4">
                <div className="form-item">
                  <label className="form-label mb-1">Element Text</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="elementText"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.elementText}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="form-item">
                      <label className="form-label mb-1">Color</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="color"
                          name="color"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.color}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="form-item">
                        <label className="form-label mb-1">
                          Background Color
                        </label>
                        <div className="">
                          <input
                            className="form-input"
                            type="color"
                            name="bgColor"
                            autoComplete="off"
                            placeholder=""
                            value={collectdata.bgColor}
                            onChange={changeForm}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-item">
                    <label className="form-label mb-1">Rounded value</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.roundedValue}
                        name="roundedValue"
                        className="w-full"
                      >
                        <option value="rounded-none">rounded-none</option>
                        <option value="rounded-sm">rounded-sm</option>
                        <option value="rounded-md">rounded-md</option>
                        <option value="rounded-lg">rounded-lg</option>
                        <option value="rounded-xl">rounded-xl</option>
                        <option value="rounded-2xl">rounded-2xl</option>
                        <option value="rounded-3xl">rounded-3xl</option>
                        <option value="rounded-full">rounded-full</option>
                      </select>
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
                  <div className="form-item">
                    <label className="form-label mb-1">className</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="className"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.className}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-x-3">
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Top</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingTop"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingTop}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Bottom</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingBottom"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingBottom}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Left</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingLeft"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingLeft}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Right</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingRight"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingRight}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-x-3">
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Top</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginTop"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginTop}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Bottom</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginBottom"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginBottom}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Left</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginLeft"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginLeft}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Right</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginRight"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginRight}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">
                      Font size(px,rem,em)
                    </label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="fontSize"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.fontSize}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Font weight</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.fontWeight}
                        name="fontWeight"
                        className="w-full"
                      >
                        <option value="font-thin">font-thin</option>
                        <option value="font-extralight">font-extralight</option>
                        <option value="font-light">font-light</option>
                        <option value="font-normal">font-normal</option>
                        <option value="font-medium">font-medium</option>
                        <option value="font-semibold">font-semibold</option>
                        <option value="font-bold">font-bold</option>
                        <option value="font-extrabold">font-extrabold</option>
                        <option value="font-black">font-black</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Height(px,rem,em)</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="height"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.height}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Width(px,rem,em)</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="width"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.width}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Text Typograpy</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.textTypography}
                        name="textTypography"
                        className="w-full"
                      >
                        <option value="text-xs">text-xs</option>
                        <option value="text-sm">text-sm</option>
                        <option value="text-md">text-md</option>
                        <option value="text-lg">text-lg</option>
                        <option value="text-xl">text-xl</option>
                        <option value="text-2xl">text-2xl</option>
                        <option value="text-3xl">text-3xl</option>
                        <option value="text-4xl">text-4xl</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label mb-1">Border size(px)</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="borderSize"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.borderSize}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Shadow</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.shadow}
                        name="shadow"
                        className="w-full"
                      >
                        <option value="shadow-sm">shadow-sm</option>
                        <option value="shadow-md">shadow-md</option>
                        <option value="shadow-lg">shadow-lg</option>
                        <option value="shadow-xl">shadow-xl</option>
                        <option value="shadow-2xl">shadow-2xl</option>
                        <option value="shadow-none">shadow-none</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-white bg-primary px-4 py-1 rounded-md"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SliderElement = (props: elementProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    elementType: "slider",
    elementValue: "",
    link: "",
    className: "",
    ariaLabel: "slider",
    axis: "horizontal",
    autoFocus: false,
    autoPlay: true,
    centerMode: false,
    centerSlidePercentage: 0,
    dynamicHeight: false,
    emulateTouch: false,
    infiniteLoop: true,
    interval: 3000,
    selectedItem: 0,
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    showThumbs: false,
    stopOnHover: true,
    swipeable: true,
    transitionTime: 300,
    useKeyboardArrows: false,
    borderSize: 0,
    width: "100%",
  });

  useEffect(() => {
    if (
      props.properties !== undefined &&
      props.properties.elementType !== null &&
      props.properties.elementType === "slider"
    ) {
      setcollectdata(props.properties);
    }
  }, []);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.checked });
  };

  const submitForm = () => {
    props.returnData({ colid: props.colid, data: collectdata });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-2xl mx-auto relative top-3">
          <div className="card">
            <div className="card-header">Slider Element</div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-x-4">
                <div className="form-item">
                  <label className="form-label mb-1">
                    Slider Images(comma seperated)
                  </label>
                  <div className="">
                    <textarea
                      rows={5}
                      className="rounded-lg w-full"
                      name="elementValue"
                      value={collectdata.elementValue}
                      onChange={changeForm}
                    >
                      {collectdata.elementValue}
                    </textarea>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label mb-1">Classname</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="className"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.className}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label>Auto Focus</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.autoFocus}
                        onChange={changeForm1}
                        name="autoFocus"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Auto Play</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.autoPlay}
                        onChange={changeForm1}
                        name="autoPlay"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Center Mode</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.centerMode}
                        onChange={changeForm1}
                        name="centerMode"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                {collectdata.centerMode ? (
                  <div className="form-item">
                    <label className="form-label mb-1">
                      Center Slide Percentage
                    </label>
                    <div className="">
                      <input
                        className="form-input"
                        type="number"
                        name="centerSlidePercentage"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.centerSlidePercentage}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-item">
                  <label>Dynamic Height</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.dynamicHeight}
                        onChange={changeForm1}
                        name="dynamicHeight"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Emulate Touch</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.emulateTouch}
                        onChange={changeForm1}
                        name="emulateTouch"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Infinite Loop</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.infiniteLoop}
                        onChange={changeForm1}
                        name="infiniteLoop"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label mb-1">Interval</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      name="interval"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.interval}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label mb-1">Selected Item</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      name="selectedItem"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.selectedItem}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label>Show Arrows</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.showArrows}
                        onChange={changeForm1}
                        name="showArrows"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Show Status</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.showStatus}
                        onChange={changeForm1}
                        name="showStatus"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Show Indicators</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.showIndicators}
                        onChange={changeForm1}
                        name="showIndicators"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Show Thumbs</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.showThumbs}
                        onChange={changeForm1}
                        name="showThumbs"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Stop On Hover</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.stopOnHover}
                        onChange={changeForm1}
                        name="stopOnHover"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label>Swipeable</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.swipeable}
                        onChange={changeForm1}
                        name="swipeable"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label mb-1">Transition Time</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      name="transitionTime"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.transitionTime}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label>Use Keyboard Arrows</label>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="0"
                        checked={collectdata.useKeyboardArrows}
                        onChange={changeForm1}
                        name="useKeyboardArrows"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="pb-3">
                  For more visit:&nbsp;
                  <a
                    href="https://www.npmjs.com/package/react-responsive-carousel"
                    target="_blank"
                  >
                    https://www.npmjs.com/package/react-responsive-carousel
                  </a>
                </div>
              </div>
              <button
                className="text-white bg-primary px-4 py-1 rounded-md"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductElement = (props: elementProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    elementType: "product",
    thumbnail: "",
    className: "bg-white p-0",
    title: "",
    seoURL: "",
    brand: "",
    seller: "",
    mrp: 0,
    sellingPrice: 0,
  });
  const [productlist, setproductlist] = useState<any>([]);
  const [stocklist, setstocklist] = useState<any>([]);

  useEffect(() => {
    if (
      props.properties !== undefined &&
      props.properties.elementType !== null &&
      props.properties.elementType === "product"
    ) {
      setcollectdata(props.properties);
    }
  }, []);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    props.returnData({ colid: props.colid, data: collectdata });
  };
  const searchKU = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const evt = e.currentTarget;
    searchProduct({ search: evt.value }).then((product) => {
      setproductlist(product.data.data);
      setstocklist(product.data.stock);
    });
  };
  const selectProduct = (dd: any, i: number) => {
    setcollectdata({
      ...collectdata,
      thumbnail: imageURL + dd.productImages.thumbnail,
      className: "bg-white p-0",
      title: dd.productInformation.name,
      seoURL: dd.seoMetaTags.url,
      brand: dd.productInformation.brand.name,
      seller: dd.productInformation.seller.personalInfomration.name,
      mrp: stocklist[i].mrp,
      sellingPrice: stocklist[i].sellingPrice,
    });
    setproductlist([]);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-4xl mx-auto relative top-3">
          <div className="card">
            <div className="card-header">Image Element</div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-2">
                  <div className="form-item relative">
                    <label className="form-label mb-1">Search Product</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        autoComplete="off"
                        placeholder="Search..."
                        onKeyUp={searchKU}
                      />
                    </div>
                    <div className="absolute z-50 shadow-lg rounded-lg top-16 bg-white w-full">
                      <ul>
                        {productlist.map((prd: any, i: number) => (
                          <li className="border-b border-gray-200 p-2">
                            <div className="flex gap-x-4">
                              <div>
                                <img
                                  src={imageURL + prd.productImages.thumbnail}
                                  className="w-6 h-6"
                                />
                              </div>
                              <div>
                                <a href={prd.seoMetaTags.url} target="_blank">
                                  {prd.productInformation.name}
                                </a>
                              </div>
                              <div className="">
                                <button
                                  className="text-blue-500 px-3"
                                  onClick={() => selectProduct(prd, i)}
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">className</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="className"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.className}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Thumbnail</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="thumbnail"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.thumbnail}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Title</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="title"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.title}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">SEO URL</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="seoURL"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.seoURL}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Brand</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="brand"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.brand}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Seller</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="seller"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.seller}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">MRP</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="mrp"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.mrp}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Price</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="sellingPrice"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.sellingPrice}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-white bg-primary px-4 py-1 rounded-md"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const RowElement = (props: elementProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    elementType: "row",
    gapX: "0px",
    gapY: "0px",
    tabletGrid: 3,
    mobileGrid: 1,
    className: "",
    color: "#000000",
    colorWeight: "900",
    bgColor: "#ffffff",
    bgColorWeight: "900",
    roundedValue: "rounded-none",
    fontSize: "16px",
    fontWeight: "font-normal",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    height: "0px",
    width: "0px",
    textTypography: "text-md",
    borderSize: 0,
    shadow: "shadow-none",
  });

  useEffect(() => {
    if (
      props.properties !== undefined &&
      props.properties.elementType !== null &&
      props.properties.elementType === "row"
    ) {
      setcollectdata(props.properties);
    }
  }, []);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const event = e.currentTarget;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const submitForm = () => {
    props.returnData(collectdata);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-4xl mx-auto relative top-3">
          <div className="card">
            <div className="card-header">Row Element</div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-x-4">
                <div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="form-item">
                      <label className="form-label mb-1">Mobile Grid</label>
                      <div className="">
                        <select
                          onChange={changeForm}
                          value={collectdata.mobileGrid}
                          name="mobileGrid"
                          className="w-full"
                        >
                          <option value="12">12</option>
                          <option value="11">11</option>
                          <option value="10">10</option>
                          <option value="9">9</option>
                          <option value="8">8</option>
                          <option value="7">7</option>
                          <option value="6">6</option>
                          <option value="5">5</option>
                          <option value="4">4</option>
                          <option value="3">3</option>
                          <option value="2">2</option>
                          <option value="1">1</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Tablet Grid</label>
                      <div className="">
                        <select
                          onChange={changeForm}
                          value={collectdata.tabletGrid}
                          name="tabletGrid"
                          className="w-full"
                        >
                          <option value="12">12</option>
                          <option value="11">11</option>
                          <option value="10">10</option>
                          <option value="9">9</option>
                          <option value="8">8</option>
                          <option value="7">7</option>
                          <option value="6">6</option>
                          <option value="5">5</option>
                          <option value="4">4</option>
                          <option value="3">3</option>
                          <option value="2">2</option>
                          <option value="1">1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="form-item">
                      <label className="form-label mb-1">Gap Y(px)</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="gapY"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.gapY}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Gap X(px)</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="gapX"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.gapX}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="form-item">
                      <label className="form-label mb-1">Color</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="color"
                          name="color"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.color}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">
                        Background Color
                      </label>
                      <div className="">
                        <input
                          className="form-input"
                          type="color"
                          name="bgColor"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.bgColor}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Rounded value</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.roundedValue}
                        name="roundedValue"
                        className="w-full"
                      >
                        <option value="rounded-none">rounded-none</option>
                        <option value="rounded-sm">rounded-sm</option>
                        <option value="rounded-md">rounded-md</option>
                        <option value="rounded-lg">rounded-lg</option>
                        <option value="rounded-xl">rounded-xl</option>
                        <option value="rounded-2xl">rounded-2xl</option>
                        <option value="rounded-3xl">rounded-3xl</option>
                        <option value="rounded-full">rounded-full</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">className</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="className"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.className}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-x-3">
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Top</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingTop"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingTop}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Bottom</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingBottom"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingBottom}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Left</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingLeft"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingLeft}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Padding Right</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paddingRight"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.paddingRight}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-x-3">
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Top</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginTop"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginTop}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Bottom</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginBottom"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginBottom}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Left</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginLeft"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginLeft}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label className="form-label mb-1">Margin Right</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="marginRight"
                          autoComplete="off"
                          placeholder=""
                          value={collectdata.marginRight}
                          onChange={changeForm}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">
                      Font size(px,rem,em)
                    </label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="fontSize"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.fontSize}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Font weight</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.fontWeight}
                        name="fontWeight"
                        className="w-full"
                      >
                        <option value="font-thin">font-thin</option>
                        <option value="font-extralight">font-extralight</option>
                        <option value="font-light">font-light</option>
                        <option value="font-normal">font-normal</option>
                        <option value="font-medium">font-medium</option>
                        <option value="font-semibold">font-semibold</option>
                        <option value="font-bold">font-bold</option>
                        <option value="font-extrabold">font-extrabold</option>
                        <option value="font-black">font-black</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Height(px,rem,em)</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="height"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.height}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Width(px,rem,em)</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="width"
                        autoComplete="off"
                        placeholder=""
                        value={collectdata.width}
                        onChange={changeForm}
                      />
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label mb-1">Text Typograpy</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.textTypography}
                        name="textTypography"
                        className="w-full"
                      >
                        <option value="text-xs">text-xs</option>
                        <option value="text-sm">text-sm</option>
                        <option value="text-md">text-md</option>
                        <option value="text-lg">text-lg</option>
                        <option value="text-xl">text-xl</option>
                        <option value="text-2xl">text-2xl</option>
                        <option value="text-3xl">text-3xl</option>
                        <option value="text-4xl">text-4xl</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label mb-1">Border size(px)</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="number"
                      name="borderSize"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.borderSize}
                      onChange={changeForm}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-item">
                    <label className="form-label mb-1">Shadow</label>
                    <div className="">
                      <select
                        onChange={changeForm}
                        value={collectdata.shadow}
                        name="shadow"
                        className="w-full"
                      >
                        <option value="shadow-sm">shadow-sm</option>
                        <option value="shadow-md">shadow-md</option>
                        <option value="shadow-lg">shadow-lg</option>
                        <option value="shadow-xl">shadow-xl</option>
                        <option value="shadow-2xl">shadow-2xl</option>
                        <option value="shadow-none">shadow-none</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-white bg-primary px-4 py-1 rounded-md"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
