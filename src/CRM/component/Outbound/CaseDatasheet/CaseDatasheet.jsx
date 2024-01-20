import React, { useEffect, useState } from "react";
import { fetchOutboundCaseDataSheetService } from "../../../store/services/outboundServices/outboundServices";
import * as constants from "../../../../utils/constant";
import mobileImage from "../../../../images/Group 3013.png";
import func from "../../../../utils/common.functions";
import CustomerFeedback from "./CustomerFeedback";
import NoData from "../../../../images/no-data.jpg";
import ImageRenderer, {
  ImageRendererBrand,
  ImageRendererDealership,
} from "../../common/ImageRenderer/ImageRenderer";
// import SkodaDealerShowroom from "../../../../images/SkodaDealerShowroom.png";

const CaseDatasheet = ({
  isCaseDataSheetActive,
  setIsCaseDataSheetActive,
  caseDataSheetApiReqData,
}) => {
  const [caseDataSheetData, setCaseDataSheetData] = useState(null);
  const [collapseAll, setCollapseAll] = useState(false);
  const [openSection, setOpenSection] = useState(constants.ALL);
  useEffect(() => {
    if (caseDataSheetApiReqData && caseDataSheetApiReqData !== undefined) {
      const apiData = fetchOutboundCaseDataSheetService(
        caseDataSheetApiReqData
      );
      Promise.resolve(apiData).then((res) => {
        setCaseDataSheetData(res);
      });
    }
  }, [caseDataSheetApiReqData]);

  const handleCollapseAll = () => {
    setOpenSection(constants.ALL);
    setCollapseAll(!collapseAll);
  };

  const customStyle = {
    show: {
      display: "block",
    },
    hide: {
      display: "none",
    },
  };

  if (caseDataSheetData == null) return null;
  return (
    <div
      className="caseDataSheetPopup"
      style={isCaseDataSheetActive ? customStyle.show : customStyle.hide}
    >
      <div className="modal-content border-0 h-100">
        <div className="modal-header card-header font-14 font-weight-600">
          Case Datasheet
          <div className="float-right">
            <button
              type="button"
              name=""
              id="collapseallpop"
              className="btn curser-pointer p-0 mr-3"
              onClick={handleCollapseAll}
            >
              <span
                className={
                  "mdi mdi-chevron-double-" + (collapseAll ? "up" : "down")
                }
              ></span>{" "}
              {collapseAll ? constants.Expand_All : constants.Collapse_All}
            </button>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsCaseDataSheetActive(!isCaseDataSheetActive)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        {caseDataSheetData?.outboundCase.caseUniqueId ===
        caseDataSheetApiReqData ? (
          <div
            className="modal-body p-0"
            style={{ overflow: "auto", height: 650 }}
          >
            <div className="card border-0">
              <div
                className="card-body accordion px-0"
                id="caseDatasheetPopupAccordion"
              >
                <div className="card mb-3 border-0 rounded-0">
                  <div className="card-header font-15 text-uppercase listing-header">
                    Case Id - {caseDataSheetData?.outboundCase.caseUniqueId}
                    <a
                      href=""
                      className="text-body float-right font-16 listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion1"
                      aria-expanded={collapseAll}
                      aria-controls="caseDatasheetPopupAccordion1"
                    >
                      <span className="mdi mdi-menu-down"></span>
                    </a>
                  </div>
                  <div
                    className={
                      "card-body collapse " +
                      (openSection === constants.ALL
                        ? collapseAll
                          ? ""
                          : "show"
                        : openSection === constants.CASE_DETAILS
                        ? "show"
                        : "")
                    }
                    id="caseDatasheetPopupAccordion1"
                    data-parent="#caseDatasheetPopupAccordion"
                  >
                    <div className="row manage-case">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-3">
                            <span>Case ID</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {caseDataSheetData?.outboundCase.caseUniqueId}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Opened On</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {func.dateFormatter(
                                caseDataSheetData?.outboundCase?.openedOn
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Call from</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {func.emptyStringFormatter(
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custMobile
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Source</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>CRM</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Department</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {
                                caseDataSheetData?.outboundCase?.caseCategory
                                  ?.classifictaionGroup
                              }
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Category</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong
                              title={
                                caseDataSheetData?.outboundCase?.caseCategory
                                  ?.categoryDescription
                              }
                            >
                              {
                                caseDataSheetData?.outboundCase?.caseCategory
                                  ?.categoryDescription
                              }
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Sub-Category</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong
                              title={
                                caseDataSheetData?.outboundCase?.caseSubCategory
                                  ?.subCategoryDesc
                              }
                            >
                              {
                                caseDataSheetData?.outboundCase?.caseSubCategory
                                  ?.subCategoryDesc
                              }
                            </strong>
                          </div>
                        </div>

                        <div className="pos-top-right">
                          <div className="caseData-Status">
                            <p>
                              <span className="mdi mdi-folder"></span>
                            </p>
                            <p className="text-uppercase font-14">
                              <strong>
                                {func.statusDescriptionFormatter(
                                  caseDataSheetData?.outboundCase?.caseStatus
                                )}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <hr className="my-2" />
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-1 text-center font-14">
                            <i className="mdi mdi-account"></i>
                          </div>
                          <div className="col-11 pl-0">
                            <strong className="text-uppercase">
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custTitle
                              }{" "}
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custName
                              }
                            </strong>
                            <p className="text-success mb-1">
                              CCMS-ID/PID -{" "}
                              {caseDataSheetData?.outboundCase?.dmsKeyValue}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-1 text-center font-14">
                            <i className="mdi mdi-home"></i>
                          </div>
                          <div className="col-11 pl-0">
                            <address className="mb-1">
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custAddress1
                              }
                              {", "}
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custAddress2
                              }
                              <br />
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custAddress3
                              }
                              <br />
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custCity?.description
                              }
                              {", "}
                              {
                                caseDataSheetData?.outboundCase?.custState
                                  ?.description
                              }
                              {" - "}
                              {
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custPincode
                              }
                            </address>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-1 text-center font-14">
                            <i className="mdi mdi-cellphone-iphone"></i>
                          </div>
                          <div className="col-11 pl-0">
                            <p className="mb-1">
                              {func.emptyStringFormatter(
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custMobile
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-1 text-center font-14">
                            <i className="mdi mdi-email"></i>
                          </div>
                          <div className="col-11 pl-0">
                            <p className="mb-1">
                              {func.emptyStringFormatter(
                                caseDataSheetData?.outboundCase?.customer
                                  ?.custEmail
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <hr className="my-2" />
                      </div>
                      {caseDataSheetData?.outboundCase?.customerIdentification
                        ?.chassisNo ? (
                        <>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5">
                                <span>VIN</span>
                              </div>
                              <div className="col-7 pl-0">
                                <strong>
                                  {func.emptyStringFormatter(
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.chassisNo
                                  )}
                                </strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-5">
                                <span>Regn No.</span>
                              </div>
                              <div className="col-7 pl-0">
                                <strong>
                                  {func.emptyStringFormatter(
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.vehicleRegn1
                                  )}
                                </strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-5">
                                <span>Engine No.</span>
                              </div>
                              <div className="col-7 pl-0">
                                <strong>
                                  {func.emptyStringFormatter(
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.engineNo
                                  )}
                                </strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-5">
                                <span>Model</span>
                              </div>
                              <div className="col-7 pl-0 text-truncate">
                                <strong
                                  title={
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.vehicelModel
                                  }
                                >
                                  {
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.vehicelModel
                                  }
                                </strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-5">
                                <span>MY/VY</span>
                              </div>
                              <div className="col-7 pl-0">
                                <strong>
                                  {
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.modelYear
                                  }
                                  /
                                  {
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.vinYear
                                  }
                                </strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-5">
                                <span>Exterior</span>
                              </div>
                              <div className="col-7 pl-0">
                                <strong>
                                  {func.emptyStringFormatter(
                                    caseDataSheetData?.outboundCase
                                      ?.customerIdentification?.exteriorColor
                                  )}
                                </strong>
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="row">
                              <div className="col-5">
                                <div className="border rounded">
                                  <ImageRenderer
                                    imageCode={
                                      caseDataSheetData?.outboundCase
                                        ?.customerIdentification?.vehicelModel
                                    }
                                  ></ImageRenderer>
                                </div>
                              </div>
                              <div className="col-auto">
                                <ImageRendererBrand />
                              </div>
                              <div className="col-auto">
                                <img src={mobileImage} alt="" height="40" />
                              </div>
                              <div className="col-12">
                                <hr className="my-2" />
                              </div>
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-5">
                                    <span>Selling Dealer</span>
                                  </div>
                                  <div className="col-7 pl-0">
                                    <strong>
                                      {func.emptyStringFormatter(
                                        caseDataSheetData?.outboundCase?.tagRpo
                                          ?.sellingDealer
                                      )}
                                    </strong>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5">
                                    <span>Selling Outlet</span>
                                  </div>
                                  <div className="col-7 pl-0 text-truncate">
                                    <strong>
                                      {func.emptyStringFormatter(
                                        caseDataSheetData?.outboundCase?.tagRpo
                                          ?.sellingOutlet
                                      )}
                                    </strong>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-5">
                                    <span>Sale Date</span>
                                  </div>
                                  <div className="col-7 pl-0">
                                    <strong>
                                      {func.dateFormatter(
                                        caseDataSheetData?.outboundCase?.tagRpo
                                          ?.rpoDate
                                      )}
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="col-12">
                        <hr className="my-2" />
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-2">
                            <span>Dealer</span>
                          </div>
                          <div className="col-10">
                            <strong className="text-uppercase">
                              {
                                caseDataSheetData?.outboundCase?.allotedDealer
                                  ?.dealerName
                              }
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <span>Outlet</span>
                          </div>
                          <div className="col-10">
                            <strong className="text-uppercase">
                              {
                                caseDataSheetData?.outboundCase?.allotedOutlet
                                  ?.branchName
                              }
                            </strong>
                          </div>
                        </div>
                        <div className="rounded img-right">
                          <ImageRendererDealership />
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                          <div className="col-2">
                            <span>Query</span>
                          </div>
                          <div className="col-8 text-truncate">
                            <strong
                              title={func.substringStringFormatter(
                                caseDataSheetData?.outboundCase?.caseQuery
                              )}
                            >
                              {func.substringStringFormatter(
                                caseDataSheetData?.outboundCase?.caseQuery
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <span>Reply</span>
                          </div>
                          <div className="col-8 text-truncate">
                            <strong
                              title={func.substringStringFormatter(
                                caseDataSheetData?.outboundCase?.callerReply
                              )}
                            >
                              {func.substringStringFormatter(
                                caseDataSheetData?.outboundCase?.callerReply
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3 border-0 rounded-0 listing-header">
                  <div className="card-header font-15 text-uppercase listing-header">
                    Follow-up list
                    <a
                      href=""
                      className="text-body float-right font-16 listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion2"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion2"
                    >
                      <span className="mdi mdi-menu-down"></span>
                    </a>
                  </div>
                  <div
                    className={
                      "card-body collapse " +
                      (openSection === constants.ALL
                        ? collapseAll
                          ? ""
                          : "show"
                        : openSection === constants.FUP_LIST
                        ? "show"
                        : "")
                    }
                    id="caseDatasheetPopupAccordion2"
                    data-parent="#caseDatasheetPopupAccordion"
                  >
                    <div className="overflow-auto" style={{ width: 500 }}>
                      <table
                        className={
                          "table w-100 " +
                          (caseDataSheetData?.outboundCase?.caseFollowUps
                            ?.length > 0
                            ? "css-serial"
                            : "")
                        }
                      >
                        <thead>
                          <tr>
                            <th>
                              <div style={{ width: 20 }}>Sr.</div>
                            </th>
                            <th>
                              <div style={{ width: 100 }}>Telecaller Text</div>
                            </th>
                            <th>
                              <div style={{ width: 100 }}>Mobile</div>
                            </th>
                            <th>
                              <div style={{ width: 60 }}>Truecaller</div>
                            </th>
                            <th>
                              <div style={{ width: 130 }}>Follow-Up Date</div>
                            </th>
                            <th>
                              <div style={{ width: 100 }}>
                                Next Follow-Up Due on
                              </div>
                            </th>
                            <th>
                              <div style={{ width: 70 }}>Connected</div>
                            </th>
                            <th>
                              <div style={{ width: 50 }}>Status</div>
                            </th>
                            <th>
                              <div style={{ width: 100 }}>By</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDataSheetData?.outboundCase?.caseFollowUps
                            ?.length > 0 ? (
                            caseDataSheetData?.outboundCase?.caseFollowUps &&
                            caseDataSheetData?.outboundCase?.caseFollowUps.map(
                              (caseFollowUp, key) => (
                                <tr key={key}>
                                  <td>.</td>
                                  <td
                                    title={func.emptyStringFormatter(
                                      caseFollowUp.fupText
                                    )}
                                  >
                                    <span className="two-line-wrap">
                                      {func.emptyStringFormatter(
                                        caseFollowUp.fupText
                                      )}
                                    </span>
                                  </td>
                                  <td>
                                    {func.emptyStringFormatter(
                                      caseFollowUp.fupMobile
                                    )}
                                  </td>
                                  <td
                                    className={
                                      "mdi mdi-" +
                                      (caseFollowUp?.flagTrueCallerVerified ===
                                      "N"
                                        ? "close"
                                        : "check")
                                    }
                                  ></td>
                                  <td>
                                    {func.dateTimeFormatter(
                                      caseFollowUp?.fupDate
                                    )}
                                  </td>
                                  <td>
                                    {func.dateFormatter(
                                      caseFollowUp?.fupDueDatetime
                                    )}
                                  </td>
                                  <td>
                                    {func.callDescriptionFormatter(
                                      caseFollowUp?.fupCallConnected
                                    )}
                                  </td>
                                  <td>
                                    <span
                                      className={
                                        "status bg-" +
                                        (caseFollowUp?.fupStatus === "A"
                                          ? "success"
                                          : "danger")
                                      }
                                    >
                                      {func.statusDescriptionFormatter(
                                        caseFollowUp?.fupStatus
                                      )}
                                    </span>
                                  </td>
                                  <td>
                                    {func.emptyStringFormatter(
                                      caseFollowUp?.byCompany
                                    )}
                                    -
                                    {func.emptyStringFormatter(
                                      caseFollowUp?.fupUserId
                                    )}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan="9"
                                style={{
                                  textAlign: "center",
                                  paddingRight: "250px",
                                }}
                              >
                                <img src={NoData} alt="No Records" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 border-0 rounded-0">
                  <div className="card-header font-15 text-uppercase">
                    Feedback
                    <a
                      href=""
                      className="text-body float-right font-16"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion4"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion4"
                    >
                      <span className="mdi mdi-menu-down"></span>
                    </a>
                  </div>
                  <div
                    className={
                      "card-body collapse " +
                      (openSection === constants.ALL
                        ? collapseAll
                          ? ""
                          : "show"
                        : openSection === constants.ACTIVITY_LOG
                        ? "show"
                        : "")
                    }
                    id="caseDatasheetPopupAccordion4"
                    data-parent="#caseDatasheetPopupAccordion"
                  >
                    <CustomerFeedback
                      caseDataSheetData={caseDataSheetData}
                    ></CustomerFeedback>
                  </div>
                </div>

                <div className="card mb-3 border-0 rounded-0 listing-header">
                  <div className="card-header font-15 text-uppercase listing-header">
                    Activity Log
                    <a
                      href=""
                      className="text-body float-right font-16 listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion3"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion3"
                    >
                      <span className="mdi mdi-menu-down"></span>
                    </a>
                  </div>
                  <div
                    className={
                      "card-body collapse " +
                      (openSection === constants.ALL
                        ? collapseAll
                          ? ""
                          : "show"
                        : openSection === constants.ACTIVITY_LOG
                        ? "show"
                        : "")
                    }
                    id="caseDatasheetPopupAccordion3"
                    data-parent="#caseDatasheetPopupAccordion"
                  >
                    <div className="overflow-auto">
                      <table
                        className={
                          "table w-100 " +
                          (caseDataSheetData?.caseActivityLog?.length > 0
                            ? "css-serial"
                            : "")
                        }
                      >
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>By</th>
                            <th>IP Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDataSheetData?.caseActivityLog?.length > 0 ? (
                            caseDataSheetData &&
                            caseDataSheetData?.caseActivityLog &&
                            caseDataSheetData.caseActivityLog.map(
                              (activityLog, key) => (
                                <tr key={key}>
                                  <td>.</td>
                                  <td
                                    title={func.emptyStringFormatter(
                                      activityLog?.actionDescription
                                    )}
                                  >
                                    {func.emptyStringFormatter(
                                      activityLog?.actionDescription
                                    )}
                                  </td>
                                  <td>
                                    {func.dateTimeFormatter(
                                      activityLog?.logDateTime
                                    )}
                                  </td>
                                  <td>
                                    <span className="text-uppercase">
                                      {func.emptyStringFormatter(
                                        activityLog?.logDealerId
                                      )}
                                      -
                                      {func.emptyStringFormatter(
                                        activityLog?.userName
                                      )}
                                    </span>
                                  </td>
                                  <td>
                                    {func.emptyStringFormatter(
                                      activityLog?.logIpAddress
                                    )}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan="9"
                                style={{
                                  textAlign: "center",
                                  padding: "30px 0 0 0",
                                }}
                              >
                                <img src={NoData} alt="No Records" />
                              </td>
                              <td>{}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="card mb-3 border-0 rounded-0 listing-header">
                  <div className="card-header font-15 text-uppercase listing-header">
                    Customer Verification
                    <a
                      href=""
                      className="text-body float-right font-16 listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion5"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion5"
                    >
                      <span className="mdi mdi-menu-down"></span>
                    </a>
                  </div>
                  <div
                    className={
                      "card-body collapse " +
                      (openSection === constants.ALL
                        ? collapseAll
                          ? ""
                          : "show"
                        : openSection === constants.ACTIVITY_LOG
                        ? "show"
                        : "")
                    }
                    id="caseDatasheetPopupAccordion5"
                    data-parent="#caseDatasheetPopupAccordion"
                  >
                    <div className="overflow-auto">
                      <table
                        className={
                          "table " +
                          (caseDataSheetData?.verificationParams?.length > 0
                            ? "css-serial"
                            : "")
                        }
                      >
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Parameter</th>
                            <th>Actual Value</th>
                            <th>Status</th>
                            <th>Response</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDataSheetData?.verificationParams?.length > 0 ? (
                            caseDataSheetData?.verificationParams &&
                            caseDataSheetData?.verificationParams.map(
                              (customerMultiVerificationParam, key) => (
                                <tr key={key}>
                                  <td>.</td>
                                  <td>
                                    {
                                      customerMultiVerificationParam.paramDescription
                                    }
                                  </td>
                                  <td>
                                    {customerMultiVerificationParam.actualValue}
                                  </td>
                                  <td>
                                    <div
                                      className={
                                        "VERIFICATION status-" +
                                        (customerMultiVerificationParam.flagVerified ===
                                        "Y"
                                          ? "check"
                                          : "" &&
                                            customerMultiVerificationParam.flagVerified ===
                                              "N"
                                          ? "close"
                                          : "")
                                      }
                                    ></div>
                                  </td>
                                  <td>
                                    {func.emptyStringFormatter(
                                      customerMultiVerificationParam.textResponse
                                    )}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan="9"
                                style={{
                                  textAlign: "center",
                                  padding: "30px 0 0 0",
                                }}
                              >
                                <img src={NoData} alt="No Records" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CaseDatasheet;
