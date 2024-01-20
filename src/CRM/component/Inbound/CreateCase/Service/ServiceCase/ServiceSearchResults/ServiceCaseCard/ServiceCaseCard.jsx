import React, { useState } from "react";
import func from "../../../../../../../../utils/common.functions";

import ActiveStatus from "../../../../../../../../images/s-active.png";
import CancelStatus from "../../../../../../../../images/s-cancel.png";
import CloseStatus from "../../../../../../../../images/s-close.png";
const ServiceCaseCard = ({
  name,
  id,
  listData,
  isActive,
  isCaseDataSheetActive,
  setIsCaseDataSheetActive,
  setCaseDataSheetApiReqData,
}) => {
  const handleDotClick = (caseUniqueId) => {
    setIsCaseDataSheetActive(!isCaseDataSheetActive);
    setCaseDataSheetApiReqData(caseUniqueId);
  };

  const [isCollapsed, setIsCollapsed] = useState();
  const expandCard = (key, custMastSerial) => {
    let payload = {
      searchType: id,
      custMasterSerial: custMastSerial,
    };
    // dispatch(fillCallerInformation(payload))
    setIsCollapsed(key);
  };

  return (
    <div
      className={"tab-pane fade " + (isActive ? "active show" : "")}
      id={id}
      role="tabpanel"
      aria-labelledby={id + "-tab"}
    >
      <div className="px-2">
        {listData && listData.length > 0
          ? listData.map((listD, key) => {
              return (
                <React.Fragment key={key}>
                  <div className="card shadow-sm mb-2">
                    <div className="card-header">
                      <div className="custom-radio-btn">
                        <div
                          className={
                            "custom-control custom-radio form-check-inline" +
                            (isCollapsed === key ? " collapsed" : "")
                          }
                          data-toggle="collapse"
                          data-target={"#collapse" + key}
                          aria-expanded={true}
                          aria-controls={"collapse" + key}
                          onClick={() => expandCard(key, listD.caseUniqueId)}
                        >
                          <input
                            type="radio"
                            className="custom-control-input"
                            id={id + "-" + key}
                            name="PID-1"
                          />
                          <label
                            className="custom-control-label text-primary"
                            htmlFor={id + "-" + key}
                          >
                            {name}
                            {" - "}
                            {listD.caseUniqueId}
                          </label>
                        </div>
                        <a
                          href=""
                          className="dots"
                          data-toggle="modal"
                          data-target="#caseDatasheetModal"
                          onClick={() => handleDotClick(listD.caseUniqueId)}
                        >
                          <span className="mdi mdi-dots-horizontal"></span>
                        </a>
                      </div>
                    </div>
                    <div className="card-body border result-list border-top-0 px-2 py-1">
                      <div className="row">
                        <div className="col-6">
                          <ul className="nav flex-column">
                            <li>
                              <span>Create DT</span>
                              <strong
                                title={func.dateFormatter(listD.openedOn)}
                              >
                                {func.dateMonthFormatter(listD.openedOn)}
                              </strong>
                            </li>
                            <li>
                              <span>Type</span>
                              <strong className="text-uppercase">
                                {func.emptyStringFormatter(
                                  listD.caseType?.description || ""
                                )}
                              </strong>
                            </li>
                            <li>
                              <span>Category</span>
                              <strong
                                title={listD.caseCategory.categoryDescription}
                              >
                                {func.emptyStringFormatter(
                                  listD.caseCategory
                                    ? listD.caseCategory.categoryDescription
                                    : "-"
                                )}
                              </strong>
                            </li>
                            <li>
                              <span>Sub Category</span>
                              <strong
                                className="text-uppercase"
                                title={listD.caseSubCategory.subCategoryDesc}
                              >
                                {func.emptyStringFormatter(
                                  listD.caseSubCategory
                                    ? listD.caseSubCategory.subCategoryDesc
                                    : "-"
                                )}
                              </strong>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <ul className="nav flex-column">
                            <li>
                              <span>Dealer</span>
                              <strong>
                                {func.emptyStringFormatter(
                                  listD.allotedDealer !== null
                                    ? listD.allotedDealer?.dealerShortName
                                    : "-"
                                )}
                              </strong>
                            </li>
                            <li>
                              <span>Outlet</span>
                              <strong>
                                {func.emptyStringFormatter(
                                  listD.allotedOutlet !== null
                                    ? listD.allotedOutlet.branchName
                                    : "-"
                                )}
                              </strong>
                            </li>
                            <li>
                              <span>KMS</span>
                              <strong>{func.numberFormatter(listD.kms)}</strong>
                            </li>
                            <li>
                              <span>Status</span>
                              <strong
                                title={func.statusDescriptionFormatter(
                                  listD.caseStatus
                                )}
                              >
                                {listD.caseStatus === "A" ||
                                listD.caseStatus === "S" ? (
                                  <img src={ActiveStatus} width={15} />
                                ) : listD.caseStatus == "C" ? (
                                  <img src={CloseStatus} width={15} />
                                ) : listD.caseStatus === "P" ? (
                                  <img src={CancelStatus} width={15} />
                                ) : (
                                  "-"
                                )}
                              </strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ServiceCaseCard;
