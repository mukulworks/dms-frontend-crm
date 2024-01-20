import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rolling } from "react-loading-io";
import { fetchInboundCaseById } from "../../../store/services/inboundServices";
import {
  showCaseDataSheetCircularLoader,
  hideCaseDataSheetCircularLoader,
} from "../../../store/actions/inboundActions";
import func from "../../../../utils/common.functions";
import * as constants from "../../../../utils/constant";
import NoData from "../../../../images/no-data.jpg";
import FileWithExtension from "../../../../components/Shared/FileWithExtension/FileWithExtension";
import ImageRenderer from "../../common/ImageRenderer/ImageRenderer";

const CaseDataSheet = ({
  isCaseDataSheetActive,
  setIsCaseDataSheetActive,
  caseDataSheetApiReqData,
  communicationLogs,
}) => {
  const dispatch = useDispatch();
  const [caseDatasheetData, setCaseDatasheetData] = useState(null);
  const [collapseAll, setCollapseAll] = useState(false);
  const [openSection, setOpenSection] = useState(constants.ALL);
  const [singleCollpase, setSingleCollapse] = useState(false);
  const [close, setClose] = useState(false);
  const { caseDatasheetLoader } = useSelector((state) => {
    let caseDatasheetLoader = state.inboundReducer.caseDatasheetLoader;
    return {
      caseDatasheetLoader: caseDatasheetLoader,
    };
  });

  useEffect(() => {
    if (caseDataSheetApiReqData && caseDataSheetApiReqData !== undefined) {
      dispatch(showCaseDataSheetCircularLoader());
      const apiData = fetchInboundCaseById(caseDataSheetApiReqData);
      Promise.resolve(apiData)
        .then((res) => {
          dispatch(hideCaseDataSheetCircularLoader());
          setCaseDatasheetData(res);
        })
        .catch((error) => {
          dispatch(hideCaseDataSheetCircularLoader());
        });
    }
  }, [caseDataSheetApiReqData]);

  const handleCollapseAll = () => {
    setOpenSection(constants.ALL);
    setCollapseAll(!collapseAll);
    setSingleCollapse(!singleCollpase);
  };

  const handleSingleCollapse = (code) => {
    switch (code) {
      case constants.CASE_DETAILS:
      case constants.FUP_LIST:
      case constants.ACTIVITY_LOG:
        setOpenSection(code);
        setSingleCollapse(!singleCollpase);
        break;
      default:
        setOpenSection(constants.ALL);
        break;
    }
  };

  const customStyle = {
    show: {
      display: "block",
    },
    hide: {
      display: "none",
    },
  };

  if (caseDatasheetData == null) return null;
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
              id="collapseall"
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
        {caseDatasheetLoader ? (
          <Rolling size={30} thickness={5} speed={0.8} color="#42bd3b" />
        ) : caseDatasheetData?.caseUniqueId === caseDataSheetApiReqData ? (
          <div
            className="modal-body p-0"
            style={{ overflow: "auto", height: "650px" }}
          >
            <div className="card border-0">
              <div
                className="card-body accordion px-0"
                id="caseDatasheetPopupAccordion"
              >
                <div className="card mb-3 border-0 rounded-0">
                  <div className="card-header border rounded-0 text-uppercase font-weight-600 font-14 listing-header">
                    Case Id - {caseDatasheetData?.caseId}
                    <a
                      href=""
                      className={
                        "text-body float-right listing-header" +
                        (openSection === constants.ALL
                          ? collapseAll
                            ? " collapsed"
                            : " "
                          : openSection === constants.CASE_DETAILS
                            ? " "
                            : " collapsed")
                      }
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion1"
                      aria-expanded={collapseAll}
                      aria-controls="caseDatasheetPopupAccordion1"
                      onClick={() =>
                        handleSingleCollapse(constants.CASE_DETAILS)
                      }
                    >
                      <span
                        className={`mdi ${singleCollpase ? "mdi-menu-down" : "mdi-menu-up"
                          }`}
                      ></span>
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
                    <div className="row header-margin">
                      <div className="col-12 manage-case">
                        <div className="row">
                          <div className="col-3">
                            <span>Case ID</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>{caseDatasheetData?.caseId}</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Opened On</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {func.dateFormatter(caseDatasheetData?.openedOn)}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Call from</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {caseDatasheetData?.customer?.callerContactNumber}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Source</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {func.emptyStringFormatter(
                                caseDatasheetData?.caseSource?.description
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Department</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {
                                caseDatasheetData?.caseCategory
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
                              title={func.emptyStringFormatter(
                                caseDatasheetData?.caseCategory
                                  ?.categoryDescription
                              )}
                            >
                              {func.emptyStringFormatter(
                                caseDatasheetData?.caseCategory
                                  ?.categoryDescription
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <span>Sub-Category</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong
                              title={func.emptyStringFormatter(
                                caseDatasheetData?.caseSubCategory
                                  ?.subCategoryDesc
                              )}
                            >
                              {func.emptyStringFormatter(
                                caseDatasheetData?.caseSubCategory
                                  ?.subCategoryDesc
                              )}
                            </strong>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-3">
                            <span>RPO#</span>
                          </div>
                          <div className="col-8 pl-0">
                            <strong>
                              {func.emptyStringFormatter(
                                caseDatasheetData?.orderNo
                              )}
                            </strong>
                          </div>
                        </div>
                        {caseDatasheetData?.isProspectCreated && (
                          <div className="row">
                            <div className="col-3">
                              <span>Prospect No</span>
                            </div>
                            <div className="col-8 pl-0">
                              <strong>
                                {func.emptyStringFormatter(
                                  caseDatasheetData?.prospectMasterSerial
                                )}{" "}
                                Created with case
                              </strong>
                            </div>
                          </div>
                        )}

                        <div className="pos-top-right">
                          <div className="caseData-Status">
                            <p>
                              <span className="mdi mdi-folder"></span>
                            </p>
                            <p className="text-uppercase font-10">
                              <strong>
                                {func.statusDescriptionFormatter(
                                  caseDatasheetData.caseStatus
                                )}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <hr />
                      </div>
                      <div className="col-12">
                        <div>
                          <div className="row">
                            <div className="col-3 font-14">
                              <i className="mdi mdi-account"></i>
                            </div>
                            <div className="col-8 pl-0">
                              <strong>
                                Mr.{caseDatasheetData?.customer?.custName}
                              </strong>
                              {/*<span className="status bg-primary ml-2">To Be Added</span> */}
                              <p className="text-success mb-1">
                                CCMS-ID/PID - {caseDatasheetData?.dmsInfoId}
                              </p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-3 font-14">
                              <i className="mdi mdi-home"></i>
                            </div>
                            <div className="col-8 pl-0">
                              <address className="mb-1">
                                {func.emptyStringFormatter(
                                  `${caseDatasheetData?.customer?.custAddress1}, ${caseDatasheetData?.customer?.custAddress2}, ${caseDatasheetData?.customer?.custCity?.description}, ${caseDatasheetData?.customer?.custState?.description}`
                                )}
                              </address>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 font-14">
                              <i className="mdi mdi-cellphone-iphone"></i>
                            </div>
                            <div className="col-8 pl-0">
                              <p className="mb-1">
                                {func.emptyStringFormatter(
                                  caseDatasheetData?.customer?.custMobile
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 font-14">
                              <i className="mdi mdi-email"></i>
                            </div>
                            <div className="col-8  pl-0">
                              <p className="mb-1">
                                {func.emptyStringFormatter(
                                  caseDatasheetData?.customer?.custEmail
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <hr />
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-5">
                            <span>VIN</span>
                          </div>
                          <div className="col-7 pl-0">
                            <strong>
                              {func.emptyStringFormatter(caseDatasheetData.vin)}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">
                            <span>Model</span>
                          </div>
                          <div className="col-7 pl-0">
                            <strong>
                              {func.emptyStringFormatter(
                                caseDatasheetData.vehModelCode
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">
                            <span>Fuel</span>
                          </div>
                          <div className="col-7 pl-0">
                            <strong>
                              {func.emptyStringFormatter(
                                caseDatasheetData.fuelCode
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="rounded img-right">
                          <ImageRenderer
                            imageCode={caseDatasheetData.vehModelCode}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <hr />
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-2">
                            <span>Dealer</span>
                          </div>
                          <div className="col-10">
                            <strong className="text-uppercase">
                              {caseDatasheetData?.allotedDealer?.dealerName}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <span>Outlet</span>
                          </div>
                          <div className="col-10">
                            <strong className="text-uppercase">
                              {func.emptyStringFormatter(
                                caseDatasheetData?.allotedOutlet?.branchName
                              )}
                            </strong>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-2">
                            <span>Query</span>
                          </div>
                          <div className="col-10">
                            <strong
                              title={func.substringStringFormatter(
                                caseDatasheetData?.caseQuery
                              )}
                            >
                              {func.substringStringFormatter(
                                caseDatasheetData?.caseQuery,
                                50
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <span>Reply</span>
                          </div>
                          <div className="col-10">
                            <strong
                              title={func.substringStringFormatter(
                                caseDatasheetData?.callerReply
                              )}
                            >
                              {func.substringStringFormatter(
                                caseDatasheetData?.callerReply,
                                50
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3 border-0 rounded-0">
                  <div className="card-header border rounded-0 text-uppercase font-weight-600 font-14 listing-header">
                    Follow-up list
                    <a
                      href=""
                      className="text-body float-right listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion2"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion2"
                      onClick={() => handleSingleCollapse(constants.FUP_LIST)}
                    >
                      <span
                        className={`mdi ${singleCollpase ? "mdi-menu-down" : "mdi-menu-up"
                          }`}
                      ></span>
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
                    <div
                      className="overflow-auto header-margin"
                      style={{ width: "590px", maxHeight: "200px" }}
                    >
                      <table
                        className={
                          "table w-100 " +
                          (caseDatasheetData?.caseFollowUps?.length > 0
                            ? "css-serial"
                            : "")
                        }
                      >
                        <thead>
                          <tr>
                            <th>
                              <div style={{ width: "20px" }}>Sr.</div>
                            </th>
                            <th>
                              <div style={{ width: "100px" }}>
                                Telecaller Text
                              </div>
                            </th>
                            <th>
                              <div style={{ width: "100px" }}>Mobile</div>
                            </th>
                            <th>
                              <div style={{ width: "60px" }}>Truecaller</div>
                            </th>
                            <th>
                              <div style={{ width: "130px" }}>
                                Follow-Up Date
                              </div>
                            </th>
                            <th>
                              <div style={{ width: "100px" }}>
                                Next Follow-Up Due on
                              </div>
                            </th>
                            <th>
                              <div style={{ width: "70px" }}>Connected</div>
                            </th>
                            <th>
                              <div style={{ width: "50px" }}>Status</div>
                            </th>
                            <th>
                              <div style={{ width: "100px" }}>By</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDatasheetData?.caseFollowUps?.length > 0 ? (
                            caseDatasheetData &&
                            caseDatasheetData?.caseFollowUps &&
                            caseDatasheetData.caseFollowUps.map(
                              (caseFollowUp, key) => (
                                <tr key={key}>
                                  <td>.</td>
                                  <td
                                    title={func.emptyStringFormatter(
                                      caseFollowUp?.fupText
                                    )}
                                  >
                                    <span className="two-line-wrap">
                                      {func.substringStringFormatter(
                                        caseFollowUp?.fupText,
                                        50
                                      )}
                                    </span>
                                  </td>
                                  <td>
                                    {func.emptyStringFormatter(
                                      caseFollowUp?.fupMobile
                                    )}
                                  </td>
                                  {/* <td><img src="../images/car.png" width="50"/><img src="../images/car.png" width="50"/></td>  */}
                                  <td
                                    className={
                                      "mdi mdi-" +
                                      (caseFollowUp?.flagTrueCallerVerified ==
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
                <div className="card mb-3 border-0 rounded-0 listing-header">
                  <div className="card-header border rounded-0 text-uppercase font-weight-600 font-14 listing-header">
                    Communication Log
                    <a
                      href=""
                      className="text-body float-right listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion3"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion3"
                      onClick={() =>
                        handleSingleCollapse(constants.COMMUNICATION_LOG)
                      }
                    >
                      <span
                        className={`mdi ${singleCollpase ? "mdi-menu-down" : "mdi-menu-up"
                          }`}
                      ></span>
                    </a>
                  </div>
                  <div
                    className={
                      "card-body collapse " +
                      (openSection === constants.ALL
                        ? collapseAll
                          ? ""
                          : "show"
                        : openSection === constants.COMMUNICATION_LOG
                          ? "show"
                          : "")
                    }
                    id="caseDatasheetPopupAccordion3"
                    data-parent="#caseDatasheetPopupAccordion"
                  >
                    <div
                      className="overflow-auto header-margin"
                      style={{ height: "200px" }}
                    >
                      <table
                        className={
                          "table w-100 " +
                          (communicationLogs?.length > 0 ? "css-serial" : "")
                        }
                      >
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Text</th>
                            <th>Status</th>
                            <th>Event Type</th>
                            <th>Mail Subject</th>
                            <th>Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {communicationLogs?.length > 0 ? (
                            communicationLogs.map((activityLog, key) => (
                              <tr key={key}>
                                <td>.</td>
                                <td>
                                  {func.emptyStringFormatter(
                                    activityLog?.mailId
                                  )}
                                </td>
                                <td>
                                  {func.emptyStringFormatter(
                                    activityLog?.mobile
                                  )}
                                </td>
                                <td>
                                  {/* {func.emptyStringFormatter(
                                    activityLog?.textResult
                                  )} */}
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary rounded"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    style={{ fontSize: 10 }}
                                  >
                                    Click to show msg
                                  </button>
                                  {createPortal(
                                    !close ? (
                                      <div
                                        className="modal fade"
                                        id="exampleModal"
                                        tabindex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                      >
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                              >
                                                <span aria-hidden="true">
                                                  &times;
                                                </span>
                                              </button>
                                            </div>
                                            <div className="modal-body">
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    activityLog?.textResult,
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <></>
                                    ),
                                    document.getElementById("modal-container")
                                  )}
                                </td>
                                <td>
                                  {func.emptyStringFormatter(
                                    activityLog?.statusResult
                                  )}
                                </td>
                                <td>
                                  {func.emptyStringFormatter(
                                    activityLog?.eventType
                                  )}
                                </td>
                                <td>
                                  {func.emptyStringFormatter(
                                    activityLog?.mailSubject
                                  )}
                                </td>
                                <td>
                                  {func.emptyStringFormatter(
                                    activityLog?.reason
                                  )}
                                </td>
                              </tr>
                            ))
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
                              <td>{ }</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 border-0 rounded-0 listing-header">
                  <div className="card-header border rounded-0 text-uppercase font-weight-600 font-14 listing-header">
                    Activity Log
                    <a
                      href=""
                      className="text-body float-right listing-header"
                      data-toggle="collapse"
                      data-target="#caseDatasheetPopupAccordion3"
                      aria-expanded="true"
                      aria-controls="caseDatasheetPopupAccordion3"
                      onClick={() =>
                        handleSingleCollapse(constants.ACTIVITY_LOG)
                      }
                    >
                      <span
                        className={`mdi ${singleCollpase ? "mdi-menu-down" : "mdi-menu-up"
                          }`}
                      ></span>
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
                    <div
                      className="overflow-auto header-margin"
                      style={{ height: "200px" }}
                    >
                      <table
                        className={
                          "table w-100 " +
                          (caseDatasheetData?.caseActivityLog?.length > 0
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
                          {caseDatasheetData?.caseActivityLog?.length > 0 ? (
                            caseDatasheetData &&
                            caseDatasheetData?.caseActivityLog &&
                            caseDatasheetData.caseActivityLog.map(
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
                              <td>{ }</td>
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

export default CaseDataSheet;
