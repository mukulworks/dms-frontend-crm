import React, { useState } from "react";
import { useDispatch } from "react-redux";
import func from "../../../../../../../../utils/common.functions";
import * as constants from "../../../../../../../../utils/constant";
import JobCardDetails from "../../../../JobCardDetails/JobCardDetails";
import { fillJobCardInformation } from "../../../../../../../store/actions/inboundActions";

const ServiceJobCard = ({
  name,
  id,
  listData,
  isActive,
  isTagROChecked,
  setIsTagROChecked,
}) => {
  const dispatch = useDispatch();
  const [jobCardDataSheetPayload, setJobCardDataSheetPayload] = useState({
    modalCode: constants.JOB_CARD_DETAILS,
    isJobCardDataSheetEnable: false,
    cardMasterSerial: 0,
  });

  const handleClick = (listD) => {
    if (isTagROChecked === "D") return;
    setIsTagROChecked(listD?.cardMasterSerial);
    let payload = {
      searchType: id,
      cardMasterSerial: listD?.cardMasterSerial,
      listD: listD,
    };
    dispatch(fillJobCardInformation(payload));
  };

  const openJobCardModal = (cardMasterSerial) => {
    setJobCardDataSheetPayload({
      modalCode: constants.JOB_CARD_DETAILS,
      isJobCardDataSheetEnable: true,
      cardMasterSerial: cardMasterSerial,
    });
  };

  return (
    <>
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
                  <div className="card shadow-sm mb-2" key={key}>
                    <div className="card-header">
                      <div className="custom-radio-btn">
                        <div
                          className={
                            "custom-control custom-radio form-check-inline"
                          }
                          data-toggle="collapse"
                          data-target={"#collapse" + key}
                          aria-expanded={true}
                          aria-controls={"collapse" + key}
                        >
                          <input
                            type="radio"
                            className="custom-control-input"
                            id={id + "-" + key}
                            name="PID-1"
                            disabled={isTagROChecked === "D" ? true : false}
                            checked={
                              isTagROChecked === listD.cardMasterSerial
                                ? true
                                : false
                            }
                            onClick={() => handleClick(listD)}
                          />
                          <label
                            className="custom-control-label text-primary"
                            htmlFor={id + "-" + key}
                            onClick={() => handleClick(listD.cardMasterSerial)}
                            // onClick={() => handleClick(listD.cardMasterSerial)}
                          >
                            {name}
                            {" - "}
                            {listD.cardNo}
                          </label>
                        </div>
                        <a
                          href=""
                          className="dots"
                          data-toggle="modal"
                          data-target="#caseDatasheetModal"
                          onClick={() =>
                            openJobCardModal(listD.cardMasterSerial)
                          }
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
                              <span>Dealer</span>
                              <strong title={listD.serviceKVPS}>
                                {func.emptyStringFormatter(
                                  listD.serviceCompanyDesc
                                )}
                              </strong>
                            </li>
                            <li>
                              <span>Outlet</span>
                              <strong
                                title={
                                  func.emptyStringFormatter(
                                    listD.serviceBranchDesc
                                  ) +
                                  "/" +
                                  func.emptyStringFormatter(listD.sellingKVPS)
                                }
                                className="text-uppercase"
                              >
                                {func.emptyStringFormatter(
                                  listD.serviceBranchDesc
                                )}
                              </strong>
                            </li>
                            <li>
                              <span>Opened</span>
                              <strong title={func.dateFormatter(listD.openOn)}>
                                {func.dateMonthFormatter(listD.openOn)}
                              </strong>
                            </li>
                            <li>
                              <span>Repair Type</span>
                              <strong
                                className="text-uppercase"
                                title={listD.rrDesc}
                              >
                                {func.emptyStringFormatter(listD.repairType)}
                              </strong>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <ul className="nav flex-column">
                            <li>
                              <span>KMS</span>
                              <strong>{func.numberFormatter(listD.kms)}</strong>
                            </li>
                            <li>
                              <span>Closed</span>
                              <strong
                                title={func.dateFormatter(listD.closeDate)}
                              >
                                {func.dateMonthFormatter(listD.closeDate)}
                              </strong>
                            </li>
                            <li>
                              <span>Status</span>
                              <strong>
                                {func.emptyStringFormatter(listD.status)}
                              </strong>
                            </li>
                            <li>
                              <span>IFB</span>
                              <strong>
                                {listD.rating
                                  ? parseInt(listD.rating / 20) + " star"
                                  : "-"}
                              </strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <JobCardDetails
        jobCardDataSheetPayload={jobCardDataSheetPayload}
        setJobCardDataSheetPayload={setJobCardDataSheetPayload}
      />
    </>
  );
};

export default ServiceJobCard;
