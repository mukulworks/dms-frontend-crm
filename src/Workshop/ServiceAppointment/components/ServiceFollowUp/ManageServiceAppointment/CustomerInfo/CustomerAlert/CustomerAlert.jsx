import React from "react";
import CarImage from "../../../../../../../images/cars.jpg";
import ImageRenderer, {
  ImageRendererBrand,
} from "../../../../../../../CRM/component/common/ImageRenderer/ImageRenderer";

const CustomerAlert = ({ customerVehicleInfo }) => {
  const model = customerVehicleInfo?.model?.model || "";

  const imgRenderArr = [model];
  return (
    <>
      {imgRenderArr.map((x) => {
        if (x) {
          return <ImageRenderer imageCode={x} />;
        }
      })}
      <ImageRendererBrand />
    </>
  );
};

export default CustomerAlert;
