import React from "react";
import CustomerContact from "./CustomerContact/CustomerContact";
import customerIcon from "../../../../../../../images/user-img.png";
const CustomerBasicInfo = ({ customerInfo, customerContacts }) => {
  const customerName =
    customerInfo?.custTitle +
    " " +
    customerInfo?.custFirstName +
    " " +
    customerInfo?.cuslLastName;

  return (
    <div className="col-4 pt-2">
      <div>
        <div className="user-profile">
          <img src={customerIcon} alt="" width="30" />
        </div>
        <div className="user-profile">
          <div className="text-uppercase">
            <strong>{customerName}</strong>{" "}
          </div>
          <div>
            <strong className="text-danger">
              CCID: {customerInfo?.custMasterSerial}
            </strong>
            <strong className="text-danger ml-2">
              Entity:{" "}
              {customerInfo?.custType === "I" ? "Individual" : "Business"}
            </strong>
          </div>
        </div>
      </div>
      {customerContacts && (
        <CustomerContact customerContacts={customerContacts} />
      )}
    </div>
  );
};

export default CustomerBasicInfo;
