import React from "react";
import func from "../../../../utils/common.functions";

const CustomerIdentification = ({ customerIdentification }) => {
  return customerIdentification ? (
    <div className="bg-light pt-0 px-3 process-flow overflow-auto">
      <div className="card">
        <div className="card-header">DMS Contact Information</div>
        <div className="card-body px-0 py-0">
          <table className="table table-striped table-sm dms-info">
            <tr>
              <th>Sr.</th>
              <th>Contact Type</th>
              <th>Value</th>
              <th>Verified</th>
              <th>Verified By</th>
              <th>Verified Date</th>
            </tr>
            {customerIdentification?.map((customerIden, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {(customerIden?.addressType || "") +
                      "-" +
                      (customerIden?.contactType || "") +
                      "-" +
                      (customerIden?.type || "")}
                  </td>
                  <td>{customerIden?.value || "-"}</td>
                  <td>
                    {customerIden?.isVerified == "Y" ? (
                      <span className="verify-icon check-verify"></span>
                    ) : (
                      <span className="verify-icon check-verify-no"></span>
                    )}
                  </td>
                  <td>
                    {(customerIden?.verifyUserId || "") +
                      "" +
                      (customerIden?.verifyCompany || "")}
                  </td>
                  <td>
                    {func.dateTimeFormatter(customerIden?.verifyDateTime) ||
                      "-"}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CustomerIdentification;
