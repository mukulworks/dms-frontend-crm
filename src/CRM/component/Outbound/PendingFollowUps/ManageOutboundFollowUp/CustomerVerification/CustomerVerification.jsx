import React from "react";
import Row from "./Row/Row";

const CustomerVerification = ({ customerMultiVerificationParams, show }) => {
  return (
    <div className={`${show ? "col-8" : "d-none"}`}>
      <div className="card h-100">
        <div className="card-header">Customer Verification</div>
        <div className="card-body border h-100 bg-white p-2 customer-verification">
          {customerMultiVerificationParams &&
            customerMultiVerificationParams.map(
              (custMultiVerificationParam, key) => (
                <Row
                  key={key}
                  index={key}
                  label={custMultiVerificationParam.paramDesc}
                  originalValue={custMultiVerificationParam.originalValue}
                  actualValue={custMultiVerificationParam.actualValue}
                  value={custMultiVerificationParam.paramValue}
                  inputRule={custMultiVerificationParam.inputRule}
                  dropdownLists={custMultiVerificationParam.paramOptionList}
                  flagVerified={custMultiVerificationParam.flagVerified}
                  textResponse={custMultiVerificationParam.textResponse}
                  paramUniqueId={custMultiVerificationParam.paramUniqueId}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default CustomerVerification;
