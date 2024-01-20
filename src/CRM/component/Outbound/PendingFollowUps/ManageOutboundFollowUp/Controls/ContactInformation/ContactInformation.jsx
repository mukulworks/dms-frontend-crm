import React, { useState } from "react";
import * as constants from "../../../../../../../utils/constant";
import "./ContactInformation.css";

import CustomerIdentification from "../../../../../common/CustomerIdentification/CustomerIdentification";
const ContactInformation = ({
  switchControl,
  contactInfo,
  dmsCustomerBasicInfo,
  customerIdentification,
}) => {
  const clickHandler = () => {
    switchControl(contactInfo ? "" : constants.CONTACTINFO);
  };
  return (
    <>
      <li
        className={`nav-item ContactInformation ${contactInfo ? "active" : ""}`}
      >
        <div className="sub-content-wrapper">
          <a className="nav-link" href="#" onClick={clickHandler}>
            <span className="mdi mdi-notebook"></span>
            <span className="text-title">DMS Contact Information</span>
          </a>

          <div
            className={`sub-content pt ${contactInfo ? "" : "d-none"}`}
            style={{ maxHeight: 380, overflow: "auto" }}
          >
            <div className="bg-light pt-3 px-3 process-flow h-100 overflow-auto">
              <div className="card">
                <div className="card-header">DMS Customer Information</div>
                <div className="card-body py-2 px-2">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5 text-muted">Entity</div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custType || "-"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">Customer Name</div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custFirstName}{" "}
                          {dmsCustomerBasicInfo?.custMiddleName}{" "}
                          {dmsCustomerBasicInfo?.custLastName}{" "}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">Primary Mobile</div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custPrimaryMobile || "-"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">
                          Alternate Mobile 1
                        </div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custMobileAddn1 || "-"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">
                          Alternate Mobile 2
                        </div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custMobileAddn2 || "-"}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5 text-muted">DMS CCID</div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custMasterSerial || "-"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">Primary Email</div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custPrimaryEmail || "-"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">
                          Alternate Email 1
                        </div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custEmailAddn1 || "-"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 text-muted">
                          Alternate Email 2
                        </div>
                        <div className="col-7 text-uppercase text-black">
                          {dmsCustomerBasicInfo?.custEmailAddn2 || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {dmsCustomerBasicInfo &&
                      dmsCustomerBasicInfo?.customerAddress?.map((address) => {
                        return (
                          <div className="col-4">
                            <div className="card">
                              <div className="card-header">
                                {address?.addressType &&
                                  address?.addressType.description}
                              </div>
                              <div className="card-body p-2">
                                <div className="row">
                                  <div className="col-5 text-muted">Mobile</div>
                                  <div className="col-7 text-uppercase text-black">
                                    {address?.mobile ? address?.mobile : "-"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5 text-muted">City</div>
                                  <div className="col-7 text-uppercase text-black">
                                    {address?.city
                                      ? address?.city?.description
                                      : "-"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5 text-muted">State</div>
                                  <div className="col-7 text-uppercase text-black">
                                    {address?.state
                                      ? address?.state?.description
                                      : "-"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5 text-muted">
                                    PinCode
                                  </div>
                                  <div className="col-7 text-uppercase text-black">
                                    {address?.pinCode ? address?.pinCode : "-"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5 text-muted">Phone</div>
                                  <div className="col-7 text-uppercase text-black">
                                    {address?.phones || address?.mobile || "-"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5 text-muted">Fax</div>
                                  <div className="col-7 text-uppercase text-black">
                                    {address?.fax ? address?.fax : "-"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5 text-muted">Email</div>
                                  <div className="col-7 text-black">
                                    {address?.email ? address?.email : "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <CustomerIdentification
              customerIdentification={customerIdentification?.contactInfo}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default ContactInformation;
