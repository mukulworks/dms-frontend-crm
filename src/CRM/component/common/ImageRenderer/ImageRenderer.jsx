import React from "react";
import { CDN_BASE_URL } from "../../../../utils/constant";
const ImageRenderer = ({ imageCode }) => {
  return (
    <img
      src={`${CDN_BASE_URL}/PRODUCT_IMAGES/${
        window.brandCode
      }/${imageCode?.toUpperCase()}/Default.jpg`}
      width="90"
      alt={imageCode}
    />
  );
};

const ImageRendererBrand = () => {
  return (
    <img
      src={`${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/LOGO_HEADER.jpg`}
      height="40"
      alt={window.brandCode}
    />
  );
};
const ImageRendererDealership = () => {
  return (
    <img
      src={`${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/DEALERSHIP.jpg`}
      height="40"
      alt={window.brandCode}
    />
  );
};
export { ImageRendererBrand, ImageRendererDealership };
export default ImageRenderer;
