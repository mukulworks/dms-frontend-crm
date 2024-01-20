import React from "react";
import func from "../../../../../../utils/common.functions";
import * as constants from "../../../../../../utils/constant";
import ImageRenderer, {
  ImageRendererBrand,
} from "../../../../common/ImageRenderer/ImageRenderer";
import Phone from "../../../../../../images/Group 3013.png";
import CustomerIdentification from "../../../../common/CustomerIdentification/CustomerIdentification";

const VehicleInformation = ({
  vehicle,
  switchControl,
  vehicleInfo,
  primaryContact,
}) => {
  const clickHandler = () => {
    switchControl(vehicle ? "" : constants.VEHICLE_INFORMATION);
  };
  return (
    <>
      <li
        className={"nav-item Vehicle-Information" + (vehicle ? " active" : "")}
      >
        <div className="sub-content-wrapper">
          <a className="nav-link" href="#" onClick={clickHandler}>
            <span className="mdi mdi-map-marker-radius"></span>{" "}
            <span className="text-title">Vehicle Information</span>
          </a>
          <div className={"sub-content pr-4" + (vehicle ? " " : " d-none")}>
            <div className="row bg-light pt-2 px-2 m-0">
              <div className="col-5 pr-0">
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">VIN</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>{vehicleInfo?.vin}</strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">Regn. No.</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>
                        {vehicleInfo?.regnNo1}-{vehicleInfo?.regnNo2}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4 pr-0">
                    <span className="text-muted">Engine No.</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>{vehicleInfo?.engineNo}</strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">Model/Variant</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>
                        {vehicleInfo?.model}/{vehicleInfo?.variantDesc}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">
                      MY/VY <div className="d-none">(eg: 2019/2020)</div>
                    </span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>
                        {vehicleInfo?.modelyear}/{vehicleInfo?.vinYear}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">Exterior</span>
                  </div>
                  <div className="col-8">
                    <span className="">
                      <strong>{vehicleInfo?.exteriorColor}</strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">Fuel</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>{vehicleInfo?.fuel}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="row justify-content-space-between align-items-center">
                  <div className="col-auto">
                    <div className="border p-2 rounded">
                      <ImageRenderer
                        imageCode={vehicleInfo?.model}
                      ></ImageRenderer>
                    </div>
                  </div>
                  <div className="col-auto">
                    <ImageRendererBrand />
                  </div>
                  <div className="col-auto">
                    <img src={Phone} alt="phone" height="40" />
                  </div>
                  <div className="col-12">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <span className="text-muted">Selling Dealer</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>{vehicleInfo?.sellDealerCompany}</strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2 mt-2">
                  <div className="col-4">
                    <span className="text-muted">Selling Outlet</span>
                  </div>
                  <div className="col-8">
                    <span className="text-uppercase">
                      <strong>{vehicleInfo?.sellingBranchName}</strong>
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <span className="text-muted">Sale Date</span>
                  </div>
                  <div className="col-8">
                    <span className="">
                      <strong>
                        {func.dateFormatter(vehicleInfo?.sellingDate)}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <span className="text-muted">Delivery Date</span>
                  </div>
                  <div className="col-8">
                    <span>
                      <strong>
                        {func.dateFormatter(vehicleInfo?.deliveryDate)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <CustomerIdentification customerIdentification={primaryContact} />
          </div>
        </div>
      </li>
    </>
  );
};
export default VehicleInformation;
