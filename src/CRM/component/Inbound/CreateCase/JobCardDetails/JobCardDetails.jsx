import React, { useState, useEffect } from "react";
import { fetchJobCardHistoryService } from "../../../../store/services/inboundServices";
import func from "../../../../../utils/common.functions";
import * as constants from "../../../../../utils/constant";
import ImageRenderer from "../../../common/ImageRenderer/ImageRenderer";
const JobCardDetails = ({
  jobCardDataSheetPayload,
  setJobCardDataSheetPayload,
}) => {
  const [jobCardHistory, setJobCardHistory] = useState({
    jobCardBasicInfo: null,
    vehicleInfo: null,
    custVoiceAdvisorObservations: null,
    custVoiceCustomerObservations: null,
    jobCardAddedParts: null,
    jobCardAddedLabors: null,
    jobCardSummary: null,
    techAdvisorObservations: null,
  });

  useEffect(() => {
    if (jobCardDataSheetPayload.cardMasterSerial > 0) {
      const apiData = fetchJobCardHistoryService(
        jobCardDataSheetPayload.cardMasterSerial
      );
      Promise.resolve(apiData)
        .then((res) => {
          if (res !== null) {
            setJobCardHistory({
              jobCardBasicInfo: res.jobCardBasicInfo,
              vehicleInfo: res.vehicleInfo,
              custVoiceAdvisorObservations:
                res.custVoiceAdvisorObservation &&
                res.custVoiceAdvisorObservation.filter(
                  (custVoice) => custVoice.complainSource === "ADVISOR"
                ),
              custVoiceCustomerObservations:
                res.custVoiceAdvisorObservation &&
                res.custVoiceAdvisorObservation.filter(
                  (custVoice) => custVoice.complainSource === "CUSTOMER"
                ),
              jobCardAddedParts: res.jobCardAddedParts,
              jobCardAddedLabors: res.jobCardAddedLabors,
              jobCardSummary: res.jobCardSummary,
            });
          }
        })
        .catch((error) => {
          setJobCardHistory(error);
        });
    }
  }, [jobCardDataSheetPayload.cardMasterSerial]);

  const [collapseAll, setCollapseAll] = useState(false);
  const [openSection, setOpenSection] = useState(constants.ALL);

  const handleCollapseAll = () => {
    setOpenSection(constants.ALL);
    setCollapseAll(!collapseAll);
  };
  const customStyle = {
    show: {
      display: "block",
      paddingRight: "17px",
    },
    hide: {
      display: "none",
    },
  };

  const JobCardBasicInfo = ({ basicInfo }) => {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <span>Job Card</span>
          </div>
          <div className="col-8">
            <strong>{func.addLeadingZeros(basicInfo.cardNo, 6)}</strong>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <span>Repair Type</span>
          </div>
          <div className="col-8">
            <strong>{basicInfo.repairTypeDesc}</strong>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <span>Service Dealer</span>
          </div>
          <div className="col-8">
            <strong>{basicInfo.serviceDealer}</strong>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <span>Service Outlet</span>
          </div>
          <div className="col-8">
            <strong>
              {basicInfo.branchDesc} {' ('}
              {basicInfo.kvps}
              {')'}
            </strong>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <span>Advisor</span>
          </div>
          <div className="col-8">
            <strong>{basicInfo.advisorName}</strong>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <span>Opened On</span>
          </div>
          <div className="col-8">
            <strong>{func.dateFormatter(basicInfo.openedOn)}</strong>
          </div>
        </div>
      </div>
    );
  };
  const JobCardSellingInfo = ({ vehicleInfo }) => {
    return (
      <div>
        <div className="row mt-3">
          <div className="col-4">
            <span>Selling Dealer</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.sellingDealer}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Selling Outlet</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.sellingDealerLocation}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Selling Date</span>
          </div>
          <div className="col-8">
            <strong>{func.dateFormatter(vehicleInfo.sellingDate)}</strong>
          </div>
        </div>
      </div>
    );
  };
  const JobCardVehicleInfo = ({ vehicleInfo, basicInfo }) => {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <span>VIN</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.chassisNo}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Registration</span>
          </div>
          <div className="col-8">
            <strong>
              {vehicleInfo.regnNo1} - {vehicleInfo.regnNo2}
            </strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Engine No</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.engineNo}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Model</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.vehVariantDesc}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>MY/VY</span>
          </div>
          <div className="col-8">
            <strong>
              {vehicleInfo.modelYear}/{vehicleInfo.vinYear}
            </strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Exterior</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.exteriorColor}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Fuel</span>
          </div>
          <div className="col-8">
            <strong>{vehicleInfo.fuel}</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-4">
            <span>Remarks</span>
          </div>
          <div className="col-8">
            <strong>{basicInfo.remarks}</strong>
          </div>
        </div>
      </div>
    );
  };

  const JobCardCustomerObservations = ({ custVoiceCustomerObservations }) => {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>Sr.</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {custVoiceCustomerObservations?.length > 0 ? (
            custVoiceCustomerObservations &&
            custVoiceCustomerObservations.map((custVoice, key) => (
              <tr key={key}>
                <td key={key}>{key + 1}</td>
                <td>
                  <span className="text-uppercase">
                    {custVoice.description}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <p>No Records Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const JobCardAdvisorObservations = ({ custVoiceAdvisorObservations }) => {
    return (
      <table
        className={
          "table " +
          (custVoiceAdvisorObservations &&
          custVoiceAdvisorObservations.length > 0
            ? " css-serial"
            : "")
        }
      >
        <thead>
          <tr>
            <th style={{ width: "40px" }}>Sr.</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {custVoiceAdvisorObservations &&
          custVoiceAdvisorObservations.length > 0 ? (
            custVoiceAdvisorObservations.map((custVoice, key) => (
              <tr key={key}>
                <td key={key}>.</td>
                <td>
                  <span className="text-uppercase">
                    {custVoice.description}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ "text-align": "center" }}>
                <p>No Records Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const JobCardAddedParts = ({ parts }) => {
    return (
      <table className={"table " + (parts.length > 0 ? "css-serial" : "")}>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>Sr.</th>
            <th>Part No</th>
            <th>Category</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {parts.length > 0 ? (
            parts &&
            parts.map((part, key) => (
              <tr key={key}>
                <td key={key}>.</td>
                <td>{part.partNo}</td>
                <td>
                  <span className="text-uppercase">{part.itemGroup}</span>
                </td>
                <td>
                  <span className="text-uppercase">{part.partDescription}</span>
                </td>
                <td>{part.actualQuantity}</td>
                <td>
                  <span className="text-uppercase">{part.unit}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                style={{ textAlign: "center", padding: "30px 0 0 0" }}
              >
                <p>No Records Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const JobCardAddedLabors = ({ labors }) => {
    return (
      <table className={"table " + (labors.length > 0 ? "css-serial" : "")}>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>Sr.</th>
            <th>Packge Code</th>
            <th>Description</th>
            <th>Time Unit</th>
          </tr>
        </thead>
        <tbody>
          {labors.length > 0 ? (
            labors &&
            labors.map((labor, key) => (
              <tr key={key}>
                <td key={key}>.</td>
                <td>{labor.labourCode}</td>
                <td>
                  <span className="text-uppercase">
                    {labor.labourDescription}
                  </span>
                </td>
                <td>
                  <span className="text-uppercase">
                    {func.roundOff(labor.timeUnit, 0)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <p>No Records Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const JobCardSummary = ({ summary }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Part Total</td>
            <td align="right">{func.roundOff(summary.partTotalAmount, 0)}</td>
          </tr>
          <tr>
            <td>Labour Total</td>
            <td align="right">{func.roundOff(summary.labourTotalAmount, 0)}</td>
          </tr>
          <tr>
            <td>Taxes</td>
            <td align="right">
              {func.roundOff(
                summary.labourTaxAmount + summary.partTaxAmount,
                0
              )}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Invoice Total</th>
            <th className="text-right">
              {func.roundOff(summary.invoiceAmount, 0)}
            </th>
          </tr>
        </tfoot>
      </table>
    );
  };

  const JobCardTechnicalAdvisorObservations = ({ techAdvisorObservations }) => {
    return (
      <table
        className={
          "table " +
          (techAdvisorObservations && techAdvisorObservations.length > 0
            ? "css-serial"
            : "")
        }
      >
        <thead>
          <tr>
            <th style={{ width: "40px" }}>Sr.</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {techAdvisorObservations && techAdvisorObservations.length > 0 ? (
            techAdvisorObservations.map((techAdvice, key) => (
              <tr key={key}>
                <td key={key}>.</td>
                <td>
                  <span className="text-uppercase">
                    {techAdvice.description}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                style={{ textAlign: "center", padding: "30px 0 0 0" }}
              >
                <p>No Records Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  if (jobCardHistory.jobCardBasicInfo === null) return null;

  return (
    <div>
      <div
        className={
          "modal fade" +
          (jobCardDataSheetPayload.isJobCardDataSheetEnable ? " show" : "")
        }
        id="jobCardModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={
          jobCardDataSheetPayload.isJobCardDataSheetEnable
            ? customStyle.show
            : customStyle.hide
        }
      >
        <div className="modal-dialog modal-xl shadow-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 h-100 modal-table">
            <div className="modal-header card-header font-14 font-weight-600">
              Job Card Detail
              <div className="float-right">
                <button
                  type="button"
                  name=""
                  id="collapseall1"
                  className="btn curser-pointer p-0 mr-3"
                  onClick={handleCollapseAll}
                >
                  <span
                    className={
                      "mdi mdi-chevron-double-" + (collapseAll ? "up" : "down")
                    }
                  ></span>
                  {collapseAll ? constants.Expand_All : constants.Collapse_All}
                </button>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() =>
                    setJobCardDataSheetPayload({
                      isJobCardDataSheetEnable: false,
                    })
                  }
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="modal-body p-0">
              <div className="card border-0">
                <div className="card-body accordion" id="jobCardAccordion">
                  <div className="card mb-3 border-0 rounded-0">
                    <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                      job card information
                      <a
                        href=""
                        className={
                          "text-body float-right" +
                          (openSection === constants.ALL
                            ? collapseAll
                              ? " collapsed"
                              : ""
                            : openSection === constants.CASE_DETAILS
                            ? ""
                            : " collapsed")
                        }
                        data-toggle="collapse"
                        data-target="#jobCardAccordion0"
                        aria-expanded="true"
                        aria-controls="jobCardAccordion0"
                      >
                        <span className="mdi mdi-arrow-down-drop-circle-outline"></span>
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
                      id="jobCardAccordion0"
                      data-parent="#jobCardAccordion"
                    >
                      <div className="row">
                        <div className="col-4">
                          <JobCardBasicInfo
                            basicInfo={jobCardHistory.jobCardBasicInfo}
                          />
                        </div>
                        <div className="col-4">
                          <JobCardVehicleInfo
                            vehicleInfo={jobCardHistory.vehicleInfo}
                            basicInfo={jobCardHistory.jobCardBasicInfo}
                          />
                        </div>
                        <div className="col-4 align-self-center">
                          <div className="row justify-content-center align-items-center">
                            <div className="col-auto">
                              <div className="border p-2 rounded">
                                <ImageRenderer
                                  imageCode={
                                    jobCardHistory.vehicleInfo.vehModel
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <hr className="mt-3 mb-1" />
                            </div>
                            <div className="col-12">
                              <JobCardSellingInfo
                                vehicleInfo={jobCardHistory.vehicleInfo}
                                basicInfo={jobCardHistory.jobCardBasicInfo}
                              ></JobCardSellingInfo>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="card mb-3 border-0 rounded-0">
                        <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                          Customer Voice
                          <a
                            href=""
                            className="text-body float-right"
                            data-toggle="collapse"
                            data-target="#jobCardAccordion1"
                            aria-expanded="true"
                            aria-controls="jobCardAccordion1"
                          >
                            <span
                              className={
                                "mdi mdi-arrow-down-drop-circle-outline"
                              }
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
                              : openSection === constants.CUSTOMER_INFORMATION
                              ? "show"
                              : "")
                          }
                          id="jobCardAccordion1"
                          data-parent="#jobCardAccordion"
                        >
                          <JobCardCustomerObservations
                            custVoiceCustomerObservations={
                              jobCardHistory.custVoiceCustomerObservations
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="card mb-3 border-0 rounded-0">
                        <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                          Parts
                          <a
                            href=""
                            className="text-body float-right"
                            data-toggle="collapse"
                            data-target="#jobCardAccordion3"
                            aria-expanded="true"
                            aria-controls="jobCardAccordion3"
                          >
                            <span className="mdi mdi-arrow-down-drop-circle-outline"></span>
                          </a>
                        </div>
                        <div
                          className={
                            "card-body collapse " +
                            (openSection === constants.ALL
                              ? collapseAll
                                ? ""
                                : "show"
                              : openSection === constants.PART_SUMMARY
                              ? "show"
                              : "")
                          }
                          id="jobCardAccordion3"
                          data-parent="#jobCardAccordion3"
                        >
                          <JobCardAddedParts
                            parts={jobCardHistory.jobCardAddedParts}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="card mb-3 border-0 rounded-0">
                        <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                          invoice
                          <a
                            href=""
                            className="text-body float-right"
                            data-toggle="collapse"
                            data-target="#jobCardAccordion6"
                            aria-expanded="true"
                            aria-controls="jobCardAccordion6"
                          >
                            <span className="mdi mdi-arrow-down-drop-circle-outline"></span>
                          </a>
                        </div>
                        <div
                          className={
                            "card-body collapse " +
                            (openSection === constants.ALL
                              ? collapseAll
                                ? ""
                                : "show"
                              : openSection === constants.BALANCE_COUNTS
                              ? "show"
                              : "")
                          }
                          id="jobCardAccordion6"
                          data-parent="#jobCardAccordion"
                        >
                          <JobCardSummary
                            summary={jobCardHistory.jobCardSummary}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="card mb-3 border-0 rounded-0">
                        <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                          Advisor Observation
                          <a
                            href=""
                            className="text-body float-right"
                            data-toggle="collapse"
                            data-target="#jobCardAccordion2"
                            aria-expanded="true"
                            aria-controls="jobCardAccordion2"
                          >
                            <span className="mdi mdi-arrow-down-drop-circle-outline"></span>
                          </a>
                        </div>
                        <div
                          className={
                            "card-body collapse " +
                            (openSection === constants.ALL
                              ? collapseAll
                                ? ""
                                : "show"
                              : openSection === constants.ADVISOR_OBSERVATION
                              ? "show"
                              : "")
                          }
                          id="jobCardAccordion2"
                          data-parent="#jobCardAccordion2"
                        >
                          <JobCardAdvisorObservations
                            custVoiceAdvisorObservations={
                              jobCardHistory.custVoiceAdvisorObservations
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="card mb-3 border-0 rounded-0">
                        <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                          labour
                          <a
                            href=""
                            className="text-body float-right"
                            data-toggle="collapse"
                            data-target="#jobCardAccordion5"
                            aria-expanded="true"
                            aria-controls="jobCardAccordion5"
                          >
                            <span className="mdi mdi-arrow-down-drop-circle-outline"></span>
                          </a>
                        </div>
                        <div
                          className={
                            "card-body collapse " +
                            (openSection === constants.ALL
                              ? collapseAll
                                ? ""
                                : "show"
                              : openSection === constants.LABOR_SUMMARY
                              ? "show"
                              : "")
                          }
                          id="jobCardAccordion5"
                          data-parent="#jobCardAccordion5"
                        >
                          <JobCardAddedLabors
                            labors={jobCardHistory.jobCardAddedLabors}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="card mb-3 border-0 rounded-0">
                        <div className="card-header border rounded-0 text-uppercase font-weight-600 font-12 py-1">
                          technical advice
                          <a
                            href=""
                            className="text-body float-right"
                            data-toggle="collapse"
                            data-target="#jobCardAccordion4"
                            aria-expanded="true"
                            aria-controls="jobCardAccordion4"
                          >
                            <span className="mdi mdi-arrow-down-drop-circle-outline"></span>
                          </a>
                        </div>
                        <div
                          className={
                            "card-body collapse " +
                            (openSection === constants.ALL
                              ? collapseAll
                                ? ""
                                : "show"
                              : openSection ===
                                constants.TECHNICAL_ADVICE_SUMMARY
                              ? "show"
                              : "")
                          }
                          id="jobCardAccordion4"
                          data-parent="#jobCardAccordion"
                        >
                          <JobCardTechnicalAdvisorObservations
                            techAdvisorObservations={
                              jobCardHistory.custVoiceAdvisorObservations
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          jobCardDataSheetPayload.isJobCardDataSheetEnable
            ? "modal-backdrop fade show"
            : ""
        }
      ></div>
    </div>
  );
};

export default JobCardDetails;
