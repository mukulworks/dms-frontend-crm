import React from "react";
import func from "../../../../../../utils/common.functions";

const CustomerInfo = ({ customer, dmsInfoId }) => {
  if (customer === null || customer === undefined) return null;

  return (
    <div className="col-4 font-12">
      {/* <div style={{"width": "200px"}}> */}
      <div className="row">
        <div className="col-2 text-center font-14">
          <i className="mdi mdi-account"></i>
        </div>
        <div className="col-10 pl-0">
          <strong>
            {customer?.custTitle || ""}{" "}
            {func.emptyStringFormatter(customer?.custName)}
          </strong>
          <p className="text-success mb-1">
            DMS CCID - {func.emptyStringFormatter(dmsInfoId)}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-2 text-center font-14">
          <i className="mdi mdi-home"></i>
        </div>
        <div className="col-10 pl-0">
          <address className="mb-0">
            {customer?.custAddress1}
            {", "}
            {customer?.custAddress2}
            <br />
            {customer?.custAddress3}
            <br />
            {customer?.custCity?.description}
            {", "}
            {customer?.custState?.description}
            {" - "}
            {customer?.custPincode}
          </address>
        </div>
      </div>
      <div className="row">
        <div className="col-2 text-center font-14">
          <i className="mdi mdi-cellphone-iphone"></i>
        </div>
        <div className="col-10 pl-0">
          <p className="mb-0">+91 {customer?.custMobile}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 text-center font-14">
          <i className="mdi mdi-email"></i>
        </div>
        <div className="col-10 pl-0">
          <p className="mb-0">{customer?.custEmail}</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CustomerInfo;
