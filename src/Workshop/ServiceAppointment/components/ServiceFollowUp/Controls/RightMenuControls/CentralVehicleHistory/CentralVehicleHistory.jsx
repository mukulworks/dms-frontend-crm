import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import NewWindow from "react-new-window";
import useWindowSize from "../../../../../../../Hooks/useWindowSize";
import CustomerInfo from "../../../ManageServiceAppointment/CustomerInfo/CustomerInfo";
import {
  showLoader,
  hideLoader,
  showCircularLoader,
} from "../../../../../store/actions/serviceAppointmentAction";
import { fetchCentralVehicleHistoryService } from "../../../../../store/services/manageFollowUpService";
import VehicleHistoryCriteria from "./VehicleHistoryCriteria/VehicleHistoryCriteria";
import History from "./History/History";
import TechnicalAdvice from "./TechnicalAdvice/TechnicalAdvice";
import Watchpoints from "./Watchpoints/Watchpoints";
import PartsSummary from "./PartsSummary/PartsSummary";
import LaborSummary from "./LaborSummary/LaborSummary";
import HistoryCard from "./HistoryCard/HistoryCard";
import WarrantyCard from "./WarrantyCard/WarrantyCard";
import Communication from "./Communication/Communication";
import ContactChange from "./ContactChange/ContactChange";
import * as constants from "../../../../../../../utils/constant";
import { createPortal } from "react-dom";

const CentralVehicleHistory = ({
  searchTypeValue,
  chassisNo,
  isCVHClick,
  setIsCVHClick,
}) => {
  const dispatch = useDispatch();

  const [fullSecreen, setFullScreen] = useState(false);
  const [close, setClose] = useState(false);

  const clickFullScreen = () => {
    setFullScreen(!fullSecreen);
  };
  const closeModal = () => {
    setClose(true);
    setIsCVHClick(false);
  };

  useEffect(() => {
    isCVHClick && setClose(false);
  }, [isCVHClick]);

  const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);
  const [centralVehicalHistory, setCentralVehicalHistory] = useState();
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    setCentralVehicalHistory(null);
    let searchType = searchTypeValue;
    let searchValue = chassisNo;
    // let searchValue2 = 0;
    // let dealerId = 'KRISTAN';
    // let brandCode = 'AUDI';
    // let countryCode = "IN"//controlRequestData.countryCode;
    var data = {
      searchType: searchType,
      searchValue: searchValue,
    };
    // dispatch(showLoader())
    const apiData = fetchCentralVehicleHistoryService(data);
    Promise.resolve(apiData)
      .then((res) => {
        if (res !== null) {
          // dispatch(hideLoader())
          setCentralVehicalHistory(res);
        }
      })
      .catch((error) => {
        // dispatch(hideLoader())
        // setCentralVehicalHistory(error)
      });
    // }
  }, [chassisNo]);

  const [errorMessage, setErrorMessage] = useState("");
  const submitCriteria = (e) => {
    let searchType = e.target.form["identification"].value;
    let searchValue1 = e.target.form["criteriaType"].value;
    setIsRequired(false);

    switch (searchType) {
      case "C":
        if (searchValue1 === "" || searchValue1.trim().length !== 17) {
          let errorMsg = "Chassis Number should be of length 17";
          setIsRequired(true);
          setErrorMessage(errorMsg);
        } else {
          fetchCentralVehicleHistoryData(e);
        }
        break;
      case "E":
        if (
          searchValue1 === "" ||
          searchValue1.trim().length < 10 ||
          searchValue1.trim().length > 12
        ) {
          let errorMsg = "Engine Number should be between 10 and 12";
          setIsRequired(true);
          setErrorMessage(errorMsg);
        } else {
          fetchCentralVehicleHistoryData(e);
        }
        break;
      case "R":
        if (searchValue1 === "" || searchValue1.trim().length < 0) {
          setIsRequired(true);
          setErrorMessage("Required");
        } else if (!searchValue1.includes("-")) {
          setIsRequired(true);
          setErrorMessage("Please enter valid Registration number");
        } else {
          fetchCentralVehicleHistoryData(e);
        }
        break;
      default:
        setIsRequired(false);
        break;
    }
  };

  const fetchCentralVehicleHistoryData = (e) => {
    dispatch(showLoader());
    let searchType = e.target.form["identification"].value;
    let searchValue1 = e.target.form["criteriaType"].value;
    let searchValue2;
    let data;

    switch (searchType) {
      case "C":
      case "E":
        searchValue1 = searchValue1.toString().trim().toUpperCase();
        data = { searchType, searchValue1, searchValue2: 0 };
        break;
      case "R":
        if (searchValue1.includes("-")) {
          searchValue1 = searchValue1.toString().trim().toUpperCase();
          let splittedReg = searchValue1.split("-");
          searchValue1 = splittedReg[0];
          searchValue2 = splittedReg[1];
          data = { searchType, searchValue1, searchValue2 };
        }
        break;
      default:
        break;
    }

    const apiData = fetchCentralVehicleHistoryService(data);
    Promise.resolve(apiData)
      .then((res) => {
        if (res !== null) {
          dispatch(hideLoader());
          setCentralVehicalHistory(res);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        setCentralVehicalHistory(error);
      });
  };

  const toggleCriteria = () => {
    setIsCriteriaOpen(!isCriteriaOpen);
  };

  const size = useWindowSize();
  const styleObject = {
    historyTableStyle: {
      tableStyle: {
        height: size.height - 383,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    techincalAdviceTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    watchPointTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    partSummaryTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    laborSummaryTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    contactChangeTableStyle: {
      tableStyle: {
        height: size.height - 300,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    cardSummaryTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    warrantySummaryTableStyle: {
      tableStyle: {
        height: size.height - 355,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    communincationTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    jobCardHistoryTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
    emptyTableStyle: {
      tableStyle: {
        height: size.height - 290,
        fontSize: "11px",
        fontWeight: "normal",
        background: "white",
      },
      alignCenter: { "text-align": "center" },
      fontColor: { color: "blue" },
      fontColorAlign: { color: "blue" },
      defaultColDef: {
        resizable: true,
      },
    },
  };

  const windowFeatures = {
    // menubar:'yes',
    // location:'yes',
    // resizable:'yes',
    // scrollbars:'yes',
    // status:'yes',
    width: "500",
    // height:'500'
  };

  return (
    <>
      {createPortal(
        !close ? (
          <div
            className={`modal fade ${close ? "" : "show"}`}
            style={{ display: "block" }}
            id="modal"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div
              className={`modal-dialog modal-dialog-centered modal-xl ${
                fullSecreen ? "full-screen" : ""
              }`}
              role="document"
            >
              {!centralVehicalHistory ? (
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col" style={{ minHeight: 700 }}>
                        <div className="d-flex justify-content-center align-items-center h-100 w-100">
                          <div
                            className="spinner-border"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="modal-content" style={{ flexDirection: "row" }}>
                  <VehicleHistoryCriteria
                    submitCriteria={submitCriteria}
                    isOpen={isCriteriaOpen ? true : false}
                    toggleCriteria={toggleCriteria}
                    errorMessage={errorMessage}
                    isRequired={isRequired}
                  />
                  <section
                    className={
                      "section" +
                      (isCriteriaOpen ? "" : " criteria-width-without-menu")
                    }
                  >
                    <div>
                      <h1 className="page-heading-title d-flex justify-content-between pr-3 py-2">
                        {" "}
                        <div>
                          <span className="mdi mdi-calendar-clock mr-2"></span>
                          Central Vehicle History
                        </div>
                        <div>
                          <span
                            className={`mdi mdi-fullscreen-exit mr-2 ${
                              fullSecreen ? "" : "d-none"
                            }`}
                            onClick={clickFullScreen}
                          ></span>
                          <span
                            className={`mdi mdi-fullscreen mr-2 ${
                              !fullSecreen ? "" : "d-none"
                            }`}
                            onClick={clickFullScreen}
                          ></span>

                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={closeModal}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </h1>
                      <CustomerInfo
                        centralCustomerMasterInfo={
                          centralVehicalHistory.customerInfo
                        }
                      />
                      <div className="col-12">
                        {/* <div className="col-12" style={{ height: (size.height - 242) }}> */}
                        <div className="row text-uppercase justify-content-between font-10 font-weight-normal h-100">
                          <div className="col-12 central-history px-0">
                            <ul
                              className="nav nav-tabs m-0"
                              id="myTab"
                              role="tablist"
                            >
                              {centralVehicalHistory.controls &&
                                centralVehicalHistory.controls.map(
                                  (control, key) => (
                                    <li
                                      className="nav-item"
                                      role="presentation"
                                      key={key}
                                    >
                                      <a
                                        className={
                                          "nav-link" +
                                          (control.code === "HISTORY"
                                            ? " active show"
                                            : "")
                                        }
                                        id={control.code + "-tab"}
                                        data-toggle="tab"
                                        href={`#${control.code}`}
                                        role="tab"
                                        aria-controls={control.code}
                                        aria-selected={
                                          control.code === "HISTORY"
                                            ? "true"
                                            : "false"
                                        }
                                      >
                                        {control.description}
                                      </a>
                                    </li>
                                  )
                                )}
                            </ul>

                            <div
                              className="tab-content border border-top-0 bg-light p-0"
                              id="myTabContent"
                            >
                              {centralVehicalHistory &&
                                centralVehicalHistory.controls &&
                                centralVehicalHistory.controls.map(
                                  (control, key) =>
                                    control.code === constants.HISTORY ? (
                                      <div
                                        className="tab-pane fade p-0 show active"
                                        id={control.code}
                                        role="tabpanel"
                                        aria-labelledby={control.code + "-tab"}
                                        key={key}
                                      >
                                        <History
                                          control={control}
                                          styleObject={
                                            styleObject.historyTableStyle
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className="tab-pane fade"
                                        id={control.code}
                                        role="tabpanel"
                                        aria-labelledby={control.code + "-tab"}
                                        key={key}
                                      >
                                        {control.code ===
                                        constants.TECHNICAL_ADVICE_SUMMARY ? (
                                          <TechnicalAdvice
                                            control={control}
                                            styleObject={
                                              styleObject.techincalAdviceTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.WATCH_POINT ? (
                                          <Watchpoints
                                            control={control}
                                            styleObject={
                                              styleObject.watchPointTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.CONTACT_CHANGE ? (
                                          <ContactChange
                                            control={control}
                                            styleObject={
                                              styleObject.contactChangeTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.PART_SUMMARY ? (
                                          <PartsSummary
                                            partList={control.partList}
                                            styleObject={
                                              styleObject.partSummaryTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.LABOR_SUMMARY ? (
                                          <LaborSummary
                                            control={control}
                                            styleObject={
                                              styleObject.laborSummaryTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.VEHICLE_CARD ? (
                                          <HistoryCard
                                            control={control}
                                            styleObject={
                                              styleObject.jobCardHistoryTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.WARRANTY_CARD ? (
                                          <WarrantyCard
                                            control={control}
                                            styleObject={
                                              styleObject.warrantySummaryTableStyle
                                            }
                                          />
                                        ) : control.code ===
                                          constants.COMMUNICATION ? (
                                          <Communication
                                            control={control}
                                            styleObject={
                                              styleObject.communincationTableStyle
                                            }
                                          />
                                        ) : null}
                                      </div>
                                    )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        ),
        document.getElementById("modal-container")
      )}
    </>
  );
};

export default CentralVehicleHistory;
