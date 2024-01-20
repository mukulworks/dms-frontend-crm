import React, { useState } from "react";
import { useSelector } from "react-redux";
import CallerInformation from "./CallerInformation/CallerInformation";
import CaseInformation from "./CaseInformation/CaseInformation";
import ServiceSearchResults from "./ServiceSearchResults/ServiceSearchResults";
import * as constants from "../../../../../../utils/constant";
import useWindowSize from "../../../../../../Hooks/useWindowSize";
import NotificationPopup from "../../../../../../../src/components/Shared/NotificationPopUp/NotificationPopup";
import PopUpImage from "../../../../../../images/already-modified.png";

const ServiceCase = ({
  isActive,
  isControlActive,
  setIsControlActive,
  isAllotedControlActive,
  setIsAllotedControlActive,
}) => {
  const size = useWindowSize();
  const [isTagROChecked, setIsTagROChecked] = useState("D");
  const [stateCode, setStateCode] = useState("");
  const [showAllotedDealer, setShowAllotedDealer] = useState();
  const {
    serviceCaseResponseModel,
    states,
    cities,
    searchRecord,
    selectedRecord,
    jobCards,
    cases,
    payload,
    count,
    jobCardsCircularLoader,
    isCourtesyCarAlloted,
    courtesyCarAllotments,
    selectedState,
    isCaseExists,
    message,
    selectedJobCard,
    custTitles,
  } = useSelector((state) => {
    let serviceCaseResponseModel =
      state.inboundReducer.inboundModel.createNewCase.serviceCaseResponseModel;
    let isComplainTypeEnable = serviceCaseResponseModel?.isComplainTypeEnable;
    let isComplainCaseTypeEnable =
      serviceCaseResponseModel?.isComplainCaseTypeEnable;
    let isFollowUpTypeEnable = serviceCaseResponseModel?.isFollowUpTypeEnable;
    let isVehicleSupportEnable =
      serviceCaseResponseModel?.isVehicleSupportEnable;
    let isVehicleStandEnable = serviceCaseResponseModel?.isVehicleStandEnable;
    let isCourtesyCarAlloted = serviceCaseResponseModel?.isCourtesyCarAlloted;
    let courtesyCarAllotments = serviceCaseResponseModel?.courtesyCarAllotments;
    let queryMaxCharacters = serviceCaseResponseModel?.queryMaxCharacters;
    let replyMaxCharacters = serviceCaseResponseModel?.replyMaxCharacters;
    let states = state.inboundReducer.inboundModel.createNewCase.states;
    let custTitles = state.inboundReducer.inboundModel.createNewCase.custTitles;

    let payload = state.inboundReducer.inboundModel.payload;
    let caseList = state.inboundReducer.inboundModel.customerHistory.CASE_LIST;
    let dmsCustomer =
      state.inboundReducer.inboundModel.customerHistory.dmsCustomer;
    let searchRecord = state.inboundReducer.searchRecord;
    let last30DayCase = state.inboundReducer.inboundModel.serviceLast30DayCase;
    let isCaseExists = last30DayCase.isCaseExists;
    let message = last30DayCase.message;
    let selectedRecord;
    let cities;
    let selectedState;

    switch (searchRecord && searchRecord.searchType) {
      case constants.CASES:
        selectedRecord = caseList?.find((caseL) => {
          return caseL.custMasterSerial === searchRecord.custMasterSerial;
        });
        break;
      case constants.JOB_CARD_DETAILS:
        if (dmsCustomer !== undefined && dmsCustomer !== null) {
          if (dmsCustomer.custMasterSerial !== null) {
            selectedRecord = dmsCustomer;
          }
        }
        if (states?.length > 0)
          for (const state of states) {
            if (state.code === selectedRecord?.customerAddress?.stateCode) {
              cities = state.cities;
            }
          }
        if (selectedRecord) {
          if (selectedRecord?.customerAddress) {
            selectedState = selectedRecord.customerAddress.stateCode;
          }
        }
        break;
      default:
        break;
    }

    let jobCards = state.inboundReducer.inboundModel.customerHistory.jobCards;
    let cases = state.inboundReducer.inboundModel.customerHistory.cases;
    let jobCardsCircularLoader = state.inboundReducer.jobCardsCircularLoader;
    let selectedJobCard = state.inboundReducer.selectedJobCard;

    let totalRecords = 0;
    let jobCardsCount = 0;
    let casesCount = 0;
    if (jobCards) {
      jobCardsCount = jobCards.length;
      totalRecords += jobCards.length > 0 ? jobCardsCount : 0;
    }
    if (cases) {
      casesCount = cases.length;
      totalRecords += cases.length > 0 ? casesCount : 0;
    }
    return {
      serviceCaseResponseModel: serviceCaseResponseModel,
      states: states,
      cities: cities,
      payload: payload,
      selectedRecord: selectedRecord,
      searchRecord: searchRecord,
      jobCards: jobCards,
      cases: cases,
      count: {
        totalRecords: totalRecords,
        jobCardsCount: jobCardsCount,
        casesCount: casesCount,
      },
      jobCardsCircularLoader: jobCardsCircularLoader,
      isCourtesyCarAlloted: isCourtesyCarAlloted,
      courtesyCarAllotments: courtesyCarAllotments,
      selectedState: selectedState,
      isCaseExists: isCaseExists,
      message: message,
      selectedJobCard: selectedJobCard,
      custTitles: custTitles,
    };
  });

  const [isPopUpActive, setIsPopUpActive] = useState(!isCaseExists);

  return (
    <div
      className={
        "row" + (isActive ? "" : " d-none ") + " call-details grid-section"
      }
    >
      <div className="col-7" style={{ overflow: "auto" }}>
        <div className="row">
          <CaseInformation
            serviceCaseResponseModel={serviceCaseResponseModel}
            setIsTagROChecked={setIsTagROChecked}
            isTagROChecked={isTagROChecked}
            selectedJobCard={selectedJobCard}
            setShowAllotedDealer={setShowAllotedDealer}
            isCourtesyCarAlloted={isCourtesyCarAlloted}
            courtesyCarAllotments={courtesyCarAllotments}
            payload={payload}
          />
          <CallerInformation
            states={states}
            cities={cities}
            selectedRecord={selectedRecord}
            searchRecord={searchRecord}
            setStateCode={setStateCode}
            showAllotedDealer={showAllotedDealer}
            stateCode={stateCode}
            selectedState={selectedState}
            isAllotedControlActive={isAllotedControlActive}
            setIsAllotedControlActive={setIsAllotedControlActive}
            isTagROChecked={isTagROChecked}
            selectedJobCard={selectedJobCard}
            custTitles={custTitles}
          />
        </div>
      </div>
      <div className="col-5" style={{ maxHeight: 620 }}>
        <ServiceSearchResults
          isControlActive={isControlActive}
          setIsControlActive={setIsControlActive}
          jobCards={jobCards}
          cases={cases}
          count={count}
          jobCardsCircularLoader={jobCardsCircularLoader}
          isTagROChecked={isTagROChecked}
          setIsTagROChecked={setIsTagROChecked}
        />
      </div>
      {isCaseExists && (
        <NotificationPopup
          isPopUpActive={isPopUpActive}
          setIsPopUpActive={setIsPopUpActive}
          image={PopUpImage}
          message={message}
        />
      )}
    </div>
  );
};

export default ServiceCase;
