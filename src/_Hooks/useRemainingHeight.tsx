import { useCallback, useEffect, useState } from "react";
import { ElementConfig, ElementPixelDetailsType } from "./_Types";

const getAllPixelDetails = (
  elementId: string,
): ElementPixelDetailsType | null => {
  const element = document.getElementById(elementId);
  if (!element) return null;
  const styles = window.getComputedStyle(element);

  const parseStyle = (prop: string) => parseFloat(styles[+prop]);

  const marginTop = parseStyle("marginTop");
  const marginRight = parseStyle("marginRight");
  const marginBottom = parseStyle("marginBottom");
  const marginLeft = parseStyle("marginLeft");

  const paddingTop = parseStyle("paddingTop");
  const paddingRight = parseStyle("paddingRight");
  const paddingBottom = parseStyle("paddingBottom");
  const paddingLeft = parseStyle("paddingLeft");

  return {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    marginTopAndBottom: marginTop + marginBottom,
    marginLeftAndRight: marginLeft + marginRight,
    paddingTopAndBottom: paddingTop + paddingBottom,
    paddingLeftAndRight: paddingLeft + paddingRight,
    marginTotal: marginTop + marginRight + marginBottom + marginLeft,
    paddingTotal: paddingTop + paddingRight + paddingBottom + paddingLeft,
    elementHeight: element.offsetHeight,
  };
};

export const useRemainingHeight = (elements: ElementConfig[]) => {
  const [remainingHeight, setRemainingHeight] = useState(window.innerHeight);

  const calculateHeight = useCallback(() => {
    let totalHeight = 0;

    elements.forEach(({ id, include = ["height", "margin", "padding"] }) => {
      const details = getAllPixelDetails(id);
      if (details) {
        if (include.includes("height")) totalHeight += details.elementHeight;
        if (include.includes("margin"))
          totalHeight += details.marginTopAndBottom;
        if (include.includes("padding"))
          totalHeight += details.paddingTopAndBottom;
      }
    });

    setRemainingHeight(window.innerHeight - totalHeight);
  }, [elements]);

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]);

  return remainingHeight;
};
