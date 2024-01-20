import React from "react";
import func from "../../../../../../../utils/common.functions";
const CustomerVehicleInfo = ({ customerVehicleInfo }) => {
  return (
    <div className="col-6 appointment-detail">
      <div className="row border-left border-right pt-0 pb-0">
        <div className="col-6 pr-0">
          <ul className="nav flex-column">
          <li className="nav-item text-left">
              <span>Variant</span>
              <strong>{customerVehicleInfo?.variant?.description}</strong>
            </li>
            <li className="nav-item text-left">
              <span>VIN</span>
              <strong>{customerVehicleInfo?.chassisNo}</strong>
            </li>
            <li className="nav-item text-left">
              <span>Fuel</span>
              <strong>{customerVehicleInfo?.fuel}</strong>
            </li>
            <li className="nav-item text-left">
              <span>Engine</span>
              <strong>{customerVehicleInfo?.engine}</strong>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul className="nav flex-column">
            <li className="nav-item text-left">
              <span>Exterior</span>
              <strong>{customerVehicleInfo?.exterior?.description}</strong>
            </li>
            <li className="nav-item text-left">
              <span>Regn</span>
              <strong>
                {customerVehicleInfo?.regn1 + "-" + customerVehicleInfo?.regn2}
              </strong>
            </li>
            <li className="nav-item text-left">
              <span>Delivery Date</span>
              <strong>
                {func.emptyStringFormatter(customerVehicleInfo?.sellingDate)}
              </strong>
            </li>
            <li className="nav-item text-left">
              <span>Selling Dealer</span>
              <strong>{customerVehicleInfo?.sellingDealer}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerVehicleInfo;
