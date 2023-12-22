import React from "react";
import { elementProps } from "../../types/homepage";
import Link from "next/link";

export const ImageElement = (props: elementProps) => {
  const alldata = props.data;
  return (
    <>
      <div className={`${alldata.className}`}>
        <Link href={alldata.link !== undefined ? alldata.link : ""}>
          <img
            src={alldata.imageWebUrl}
            className={`h-${alldata.height} w-${alldata.width} max-h-${alldata.maxHeight} max-w-${alldata.maxWidth} border-${alldata.border} rounded-${alldata.borderRadius} object-${alldata.objectFit} shadow-${alldata.boxShadow} opacity-${alldata.opacity} `}
          />
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
        className={`text-[${alldata.fontSize}] ${alldata.fontWeight} ${alldata.fontStyle} ${alldata.textAlign} ${alldata.textDecoration} ${alldata.lineHeight} ${alldata.letterSpacing} ${alldata.textTransform} ${alldata.className}`}
        style={{ color: alldata.color }}
      >
        {alldata.elementText}
      </alldata.elementContainer>
    </>
  );
};
