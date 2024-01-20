import React, { useState } from "react";
import { useSelector } from "react-redux";
import SalesSearchResults from "./SalesSearchResults/SalesSearchResults";
import CallerInformation from "./CallerInformation/CallerInformation";
import CaseInformation from "./CaseInformation/CaseInformation";
import * as constants from "../../../../../../utils/constant";
import useWindowSize from "../../../../../../Hooks/useWindowSize";
import NotificationPopup from "../../../../../../../src/components/Shared/NotificationPopUp/NotificationPopup";
import PopUpImage from "../../../../../../images/already-modified.png";

const SalesCase = ({
  isActive,
  isControlActive,
  setIsControlActive,
  isAllotedControlActive,
  setIsAllotedControlActive,
}) => {
  const size = useWindowSize();
  const [stateCode, setStateCode] = useState("");
  const [showAllotedDealer, setShowAllotedDealer] = useState();
  const [searchValue, setSearchValue] = useState({ type: "", val: "" });
  const {
    salesCaseResponseModel,
    dealers,
    states,
    vehicleModels,
    payload,
    selectedRecord,
    searchRecord,
    prospectList,
    orderList,
    caseList,
    counts,
    isCircularLoading,
    isCaseExists,
    message,
    custTitles,
  } = useSelector((state) => {
    let salesCaseResponseModel =
      state.inboundReducer.inboundModel.createNewCase.salesCaseResponseModel;
    let states = state.inboundReducer.inboundModel.createNewCase.states;
    let cities = state.inboundReducer.inboundModel.createNewCase.cities;
    let dealers = state.inboundReducer.inboundModel.createNewCase.dealers;
    let custTitles = state.inboundReducer.inboundModel.createNewCase.custTitles;
    let vehicleModels =
      state.inboundReducer.inboundModel.createNewCase.vehicleModels;
    let payload = state.inboundReducer.inboundModel.payload;
    let prospectList =
      state.inboundReducer.inboundModel.customerHistory.PROSPECT_LIST;
    let orderList =
      state.inboundReducer.inboundModel.customerHistory.ORDER_LIST;
    let caseList = state.inboundReducer.inboundModel.customerHistory.CASE_LIST;
    let last30DayCase = state.inboundReducer.inboundModel.salesLast30DayCase;
    let isCaseExists = last30DayCase.isCaseExists;
    let message = last30DayCase.message;
    let searchRecord = state.inboundReducer.searchRecord;
    let selectedRecord;

    switch (searchRecord && searchRecord.searchType) {
      case constants.PROSPECTS:
        selectedRecord = prospectList?.find((prospect) => {
          return prospect.custMasterSerial === searchRecord.searchValue;
        });
        break;
      case constants.ORDERS:
        selectedRecord = orderList?.find((order) => {
          return order.custMasterSerial === searchRecord.searchValue;
        });
        break;
      case constants.CASES:
        selectedRecord = caseList?.find((caseItem) => {
          return caseItem.caseUniqueId === searchRecord.searchValue;
        });
        break;
      default:
        break;
    }

    let isCircularLoading = state.inboundReducer.isCircularLoading;
    let totalRecords = 0;
    let prospectCounts = 0;
    let orderCounts = 0;
    let caseCounts = 0;
    if (prospectList) {
      prospectCounts = prospectList.length;
      totalRecords += prospectList.length > 0 ? prospectCounts : 0;
    }
    if (orderList) {
      orderCounts = orderList.length;
      totalRecords += orderList.length > 0 ? orderCounts : 0;
    }
    if (caseList) {
      caseCounts = caseList.length;
      totalRecords += caseList.length > 0 ? caseCounts : 0;
    }
    return {
      salesCaseResponseModel: salesCaseResponseModel,
      dealers: dealers,
      states: states,
      cities: cities,
      payload: payload,
      selectedRecord: selectedRecord,
      searchRecord: searchRecord,
      vehicleModels: vehicleModels,
      prospectList: prospectList,
      orderList: orderList,
      caseList: caseList,
      counts: {
        totalRecords: totalRecords,
        prospectCounts: prospectCounts,
        orderCounts: orderCounts,
        caseCounts: caseCounts,
      },
      isCircularLoading: isCircularLoading,
      isCaseExists: isCaseExists,
      message: message,
      custTitles: custTitles,
    };
  });

  const [isPopUpActive, setIsPopUpActive] = useState(!isCaseExists);

  return (
    <div
      className={
        "row" + (isActive ? "" : " d-none ") + " call-details grid-section pb-3"
      }
      style={{ height: size.height !== undefined ? size.height - 200 : 0 }}
    >
      <div className="col-7">
        <div className="row">
          <CaseInformation
            vehicleModels={vehicleModels}
            salesCaseResponseModel={salesCaseResponseModel}
            payload={payload}
            setShowAllotedDealer={setShowAllotedDealer}
            setSearchValue={setSearchValue}
          />
          <CallerInformation
            isAllotedControlActive={isAllotedControlActive}
            setIsAllotedControlActive={setIsAllotedControlActive}
            stateCode={stateCode}
            states={states}
            selectedRecord={selectedRecord}
            searchRecord={searchRecord}
            setStateCode={setStateCode}
            dealers={dealers}
            showAllotedDealer={showAllotedDealer}
            searchValue={searchValue}
            custTitles={custTitles}
          />
        </div>
      </div>
      <div className="col-5" style={{ height: "410px" }}>
        <SalesSearchResults
          isControlActive={isControlActive}
          setIsControlActive={setIsControlActive}
          prospectList={prospectList}
          orderList={orderList}
          caseList={caseList}
          counts={counts}
          isCircularLoading={isCircularLoading}
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

export default SalesCase;
