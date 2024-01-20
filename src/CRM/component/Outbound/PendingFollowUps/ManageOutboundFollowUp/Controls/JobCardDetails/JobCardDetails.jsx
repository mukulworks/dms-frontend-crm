import React from "react";
import * as constants from "../../../../../../../utils/constant";
import func from "../../../../../../../utils/common.functions";
import JobCard from "../../../../../Inbound/CreateCase/JobCardDetails/JobCardDetails";

const JobCardDetails = ({ switchControl, jobCardControl, jobCardDetails }) => {
  const clickHandler = () => {
    switchControl(jobCardControl ? "" : constants.JOB_CARD_DETAILS);
  };
  const [jobCardDataSheetPayload, setJobCardDataSheetPayload] = React.useState({
    modalCode: constants.JOB_CARD_DETAILS,
    isJobCardDataSheetEnable: false,
    cardMasterSerial: 0,
  });
  const openJobCardModal = (cardMasterSerial) => {
    console.log("opened model", cardMasterSerial);
    setJobCardDataSheetPayload({
      modalCode: constants.JOB_CARD_DETAILS,
      isJobCardDataSheetEnable: true,
      cardMasterSerial: cardMasterSerial,
    });
  };
  return (
    <>
      <li
        className={`nav-item JobCardDetails ${jobCardControl ? "active" : ""}`}
      >
        <div className="sub-content-wrapper">
          <a className="nav-link" href="#" onClick={clickHandler}>
            <span className="mdi mdi-notebook"></span>
            <span className="text-title">Job Card Details</span>
          </a>

          <div
            className={`sub-content pt ${jobCardControl ? "" : "d-none"}`}
            style={{ maxHeight: 380, overflow: "auto" }}
          >
            <div className="bg-light pt-3 px-3 process-flow h-100 overflow-auto">
              <div className="card">
                <div className="card-header">Job Card Details</div>
                {jobCardDetails?.jobCardNo > 0 ? (
                  <div className="card-body py-2 px-2">
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-5 text-muted">Job Card No</div>
                          <div
                            onClick={() =>
                              openJobCardModal(jobCardDetails?.jobCardShortCode)
                            }
                            className="col-7 text-uppercase text-black"
                          >
                            {jobCardDetails?.jobCardNo +
                              "/" +
                              jobCardDetails?.jobCardCompany +
                              "/" +
                              jobCardDetails?.jobCardLocation || "-"}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 text-muted">Opened on</div>
                          <div className="col-7 text-uppercase text-black">
                            {func.dateFormatter(jobCardDetails?.openedOn)}{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 text-muted">Gate Pass</div>
                          <div className="col-7 text-uppercase text-black">
                            {func.dateFormatter(jobCardDetails?.gatePass)}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 text-muted">Kms</div>
                          <div className="col-7 text-uppercase text-black">
                            {func.commaFormatter(jobCardDetails?.kms)}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 text-muted">Visit Count</div>
                          <div className="col-7 text-uppercase text-black">
                            {jobCardDetails?.visitCount || "-"}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 text-muted">Repair Type</div>
                          <div className="col-7 text-uppercase text-black">
                            {jobCardDetails?.repairType || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No Record Exist</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
      <JobCard
        jobCardDataSheetPayload={jobCardDataSheetPayload}
        setJobCardDataSheetPayload={setJobCardDataSheetPayload}
      />
    </>
  );
};

export default JobCardDetails;
