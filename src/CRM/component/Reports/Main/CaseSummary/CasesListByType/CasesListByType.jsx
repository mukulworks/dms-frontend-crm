import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Pagination from "react-js-pagination";
import SalesInboundListing from "../../../../Inbound/InboundListing/SalesInboundListing/SalesInboundListing";
import { fetchListingByCriteria } from "../../../../../store/services/ReportsServices/reportsServices";
import func from "../../../../../../utils/common.functions";
import InboundHeader from "../../../../Inbound/InboundHeader/InboundHeader";
import ServiceInboundListing from "../../../../Inbound/InboundListing/ServiceInboundListing/ServiceInboundListing";
import * as constants from "../../../../../../utils/constant";
import * as types from "../../../../../store/actions/index";
import Loader from "../../../../common/Loader/Loader";
import FollowUpDetails from "../../../../common/FollowUpDetails/FollowUpDetails";
import CaseDataSheet from "../../../../Inbound/CaseDataSheet/CaseDataSheet";
const CasesListByType = ({
  openListModal,
  setOpenListModal,
  criteriaValues,
  apiParameters,
  header,
  calledFrom,
}) => {
  const customStyle = {
    show: {
      display: "block",
    },
    hide: {
      display: "none",
    },
  };
  const dispatch = useDispatch();
  const [reportSummaryData, setReportSummaryData] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [caseListType, setCaseListType] = useState("");
  const [getCaseId, setGetCaseId] = useState("");
  const [openInboundDetails, setOpenInboundDetails] = useState(false);
  const [isCaseDataSheetActive, setIsCaseDataSheetActive] = useState(false);
  const [caseDataSheetApiReqData, setCaseDataSheetApiReqData] = useState();
  const openCaseDataSheet = (caseUniqueId) => {
    setIsCaseDataSheetActive(!isCaseDataSheetActive);
    setCaseDataSheetApiReqData(caseUniqueId);
  };
  useEffect(() => {
    if (openListModal) {
      let criteriaParameters = criteriaValues?.criteriaParameters;
      let listPayload = {};
      let additionalParameters = {};
      let criMonth, criYear;
      if (criteriaParameters) {
        for (const criteriaParameter of criteriaParameters) {
          if (criteriaParameter.code === "BRAND_CODE") {
            listPayload["brandCode"] = criteriaParameter.value;
          } else if (criteriaParameter.code === "COUNTRY_CODE") {
            listPayload["countryCode"] = criteriaParameter.value;
          } else if (criteriaParameter.code === "ZONE_CODE") {
            listPayload["zone"] = criteriaParameter.value;
          } else if (criteriaParameter.code === "COMPANY_ID") {
            listPayload["allotedDealerId"] = criteriaParameter.value;
          } else if (criteriaParameter.code === constants.REPORT_FORMAT) {
            listPayload["reportFormat"] = criteriaParameter.value;
          } else if (criteriaParameter.code === constants.DEPARTMENT_CODE) {
            listPayload["departmentCode"] = criteriaParameter.value;
            setCaseListType(criteriaParameter.value);
          } else if (criteriaParameter.code === constants.MONTH) {
            criMonth = criteriaParameter.value;
          } else if (criteriaParameter.code === constants.YEAR) {
            criYear = criteriaParameter.value;
          }
        }
      }

      let d = new Date();
      let currentMonth = moment(d).format("MMM");

      if (criMonth === currentMonth) {
        additionalParameters["startDate"] = func.getFirstDateOfCurrentMonth(d);
        additionalParameters["endDate"] = d;
        listPayload["additionalParameters"] = additionalParameters;
      } else {
        let date = new Date(Date.parse(criMonth + " 1, " + criYear));
        additionalParameters["startDate"] =
          func.getFirstDateOfCurrentMonth(date);
        additionalParameters["endDate"] = func.getLastDateOfCurrentMonth(date);
      }

      if (apiParameters?.category) {
        listPayload["categoryId"] = parseInt(apiParameters?.category);
      }
      if (apiParameters?.subCategory) {
        listPayload["subCategoryId"] = parseInt(apiParameters?.subCategory);
      }
      if (apiParameters?.dataType) {
        additionalParameters["dataType"] = apiParameters?.dataType;
      }

      listPayload["caseStatus"] = "A";
      listPayload["callTypeId"] = 2;
      listPayload["caseAllottedTo"] = "ALL PENDING";
      listPayload["additionalParameters"] = additionalParameters;
      listPayload["pageIndex"] = activePage;
      let payload = {
        // type: 'SALES',
        data: listPayload,
      };

      dispatch({ type: types.SHOW_LOADER });
      let apiData = fetchListingByCriteria(payload);
      apiData
        .then((res) => {
          dispatch({ type: types.HIDE_LOADER });
          if (res && res.result) {
            setReportSummaryData(res?.result);
          }
        })
        .catch((error) => {
          dispatch({ type: types.HIDE_LOADER });
        });
    }
    return () => {
      setReportSummaryData(null);
    };
  }, [criteriaValues, apiParameters, activePage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return reportSummaryData ? (
    <div>
      <div
        className={
          "modal fade" + (openListModal && reportSummaryData ? " show" : "")
        }
        style={openListModal ? customStyle.show : customStyle.hide}
        id="caseDatasheetModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl shadow-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 h-100">
            <div className="modal-header card-header font-14 font-weight-600">
              Cases List By Type -{" "}
              {reportSummaryData?.selectedCriteria?.category || ""}{" "}
              {reportSummaryData?.selectedCriteria?.subCategory || ""}{" "}
              <div className="float-right">
                {reportSummaryData?.selectedCriteria?.additionalDetails
                  ?.dataType || ""}
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setOpenListModal(false);
                    setReportSummaryData(null);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="modal-body p-0">
              <InboundHeader listType="Case Summary" header={header} />
              <div className="mt-3">
                <div className="row mx-2">
                  <div className="col-12 p-0 pb-3">
                    {calledFrom && calledFrom === constants.SALES ? (
                      <SalesInboundListing
                        inboundCases={reportSummaryData?.inboundCases}
                        setOpenInboundDetails={setOpenInboundDetails}
                        setGetCaseId={setGetCaseId}
                        openCaseDataSheet={openCaseDataSheet}
                        disabledHeaderItems={
                          reportSummaryData?.disabledHeaderItems || []
                        }
                      />
                    ) : calledFrom === constants.SERVICE ? (
                      <ServiceInboundListing
                        inboundCases={reportSummaryData?.inboundCases}
                        setOpenInboundDetails={setOpenInboundDetails}
                        setGetCaseId={setGetCaseId}
                        disabledHeaderItems={
                          reportSummaryData?.disabledHeaderItems || []
                        }
                        openCaseDataSheet={openCaseDataSheet}
                      />
                    ) : null}

                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={50}
                      totalItemsCount={reportSummaryData?.recordCount}
                      pageRangeDisplayed={10}
                      onChange={handlePageChange}
                      // prevPageText='[Prev Page]'
                      // nextPageText='[Next Page]'
                      // firstPageText='{First Page}'
                      // lastPageText='{Last Page}'
                      innerClass="pagination justify-content-center mt-3" //for ul
                      itemClass="page-item"
                      activeClass="page-item active" //active li
                      linkClass="page-link"
                      disabledClass="page-item"
                    />
                  </div>
                </div>
              </div>
            </div>
            <FollowUpDetails
              openFollowUpModal={openInboundDetails}
              setOpenFollowUpModal={setOpenInboundDetails}
              getCaseId={getCaseId}
            />
            <CaseDataSheet
              isCaseDataSheetActive={isCaseDataSheetActive}
              setIsCaseDataSheetActive={setIsCaseDataSheetActive}
              caseDataSheetApiReqData={caseDataSheetApiReqData}
            />
          </div>
        </div>
      </div>

      <div className={openListModal ? "modal-backdrop fade show" : ""}></div>
    </div>
  ) : (
    ""
  );
};

export default CasesListByType;
