import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Criteria from "../../common/Criteria/Criteria";
import OutboundHeader from "../OutboundHeader/OutboundHeader";
import OutboundListing from "../OutboundListing/OutboundListing";
import FollowUpDetails from "../../common/FollowUpDetails/FollowUpDetails";
import * as constants from "../../../../utils/constant";
import {
  fetchOutboundCriteria,
  fetchOutboundCasesByCriteria,
  emptyOutboundCasesList,
} from "../../../store/actions/outboundActions/outboundActions";
import GridPagination from "../../../../components/Shared/Pagination/Pagination";

const PendingFollowUps = ({ calledFrom }) => {
  const dispatch = useDispatch();
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(true);
  const [openFollowUpModal, setOpenFollowUpModal] = useState(false);
  const [header, setHeader] = useState();
  const [activePage, setActivePage] = useState(0);
  const [getCaseId, setGetCaseId] = useState("");
  const [resetStatus, setResetStatus] = useState(0);

  useEffect(() => {
    if (
      criteriaModel === null ||
      calledFrom === "MENU" ||
      calledFrom == "BACK"
    ) {
      dispatch(fetchOutboundCriteria());
    }

    if (calledFrom === "MENU") {
      dispatch(emptyOutboundCasesList());
    } else if (calledFrom === "SAVE") {
      if (localStorage.getItem("selectedOutboundCriteria") !== null) {
        //to maintain the listing on the screen
        let selectedCriteria = JSON.parse(
          localStorage.getItem("selectedOutboundCriteria")
        );
        dispatch(fetchOutboundCasesByCriteria(selectedCriteria));

        // to maintain the page number in pagination
        setActivePage(selectedCriteria["pageIndex"]);
      
      }
    } else if (calledFrom === "BACK") {
      if (localStorage.getItem("selectedOutboundCriteria") !== null) {
        //to maintain the page number in pagination
        let selectedCriteria = JSON.parse(
          localStorage.getItem("selectedOutboundCriteria")
        );
        setActivePage(selectedCriteria["pageIndex"]);
      }
    }
    // else if(calledFrom === 'BACK'){
    //     if ((outboundCases !== undefined) && localStorage.getItem('selectedOutboundCriteria') !== null) {
    //         // let selectedCriteria = JSON.parse(localStorage.getItem('selectedOutboundCriteria'));
    //         // dispatch(fetchOutboundCasesByCriteria(selectedCriteria));
    //     }
    // }
  }, []);

  const { outboundCases, recordCount, pageNo, criteriaModel } = useSelector(
    (state) => {
      // let criteria = state.outboundReducer.outboundModel.outboundCases.criteria
      let outboundCases =
        state.outboundReducer.outboundModel.outboundCases.outboundCases;
      let recordCount =
        state.outboundReducer.outboundModel.outboundCases.recordCount;
      let pageNo = state.outboundReducer.outboundModel.outboundCases.pageNo;
      let criteriaModel = state.outboundReducer.outboundModel.criteriaModel;
      let brands = criteriaModel.brands;
      let countries = criteriaModel.country;
      let nations = criteriaModel.reportFormats;
      let zones = criteriaModel.zones;
      let caseDepartments = criteriaModel.caseDepartments;
      let caseSources = criteriaModel.caseSources;
      let caseCategories = criteriaModel.caseCategories;
      let dealers = criteriaModel.dealers;
      let outlet = dealers === undefined ? null : dealers[0].outets;
      let caseAllotedUsers = criteriaModel.caseAllotedUsers;
      let searchParameters = criteriaModel.searchParameters;
      let searchStatusParameters = criteriaModel.searchStatusParamters;
      let callType = "OUTBOUND";

      return {
        outboundCases: outboundCases,
        criteriaModel: {
          brands: brands,
          countries: countries,
          nations: nations,
          zones: zones,
          caseDepartments: caseDepartments,
          caseSources: caseSources,
          caseCategories: caseCategories,
          dealers: dealers,
          outlet: outlet,
          caseAllotedUsers: caseAllotedUsers,
          searchParameters: searchParameters,
          searchStatusParameters: searchStatusParameters,
          callType: callType,
        },
        recordCount: recordCount,
        // pageCount: pageCount,
        pageNo: pageNo,
      };
    }
  );

  const bindCriteria = (event, resetList, date = "") => {
    if (event) {
      let brandCode = event.target.form["brand"].value;
      let country = event.target.form["country"].value;
      let reportFormat = event.target.form["nation"].value;
      let zone = event.target.form["zone"].value;
      let departmentCode =
        criteriaModel.callType === "INBOUND"
          ? event.target.form["department"].value
          : null;
      let source =
        criteriaModel.callType === "INBOUND"
          ? event.target.form["source"].value
          : null;
      let categoryID = parseInt(event.target.form["category"].value); //for caseCategory
      let subcategoryCode = event.target.form["subcategory"].value
        ? parseInt(event.target.form["subcategory"].value)
        : null;
      let dealerCode = event.target.form["dealer"].value;
      let branchCode = event.target.form["outlet"].value;
      let allotedCode = event.target.form["alloted"].value;
      let caseStatus = event.target.form["caseStatus"].value;
      let searchKey = event.target.form["searchKey"].value;
      let searchValue = date
        ? date?.selectedFromDate?.toISOString().split("T")[0] +
          "|" +
          date?.selectedToDate?.toISOString().split("T")[0]
        : event.target.form["searchValue"]?.value;
      let data = {
        brandCode: brandCode,
        countryCode: country,
        reportFormat: reportFormat,
        zone: zone,
        allotedDealerId: dealerCode,
        allotedOutletId: branchCode,
        departmentCode: departmentCode,
        caseSource: source,
        caseStatus: caseStatus,
        categoryID: categoryID,
        subCategoryId: subcategoryCode,
        caseAllottedTo: allotedCode,
        searchKey: searchKey,
        searchValue: searchValue,
        pageIndex: activePage,
      };
      localStorage.setItem("selectedOutboundCriteria", JSON.stringify(data));
      dispatch(fetchOutboundCasesByCriteria(data));

      let headerData = {
        brand: criteriaModel.brands?.find((x) => x.code === brandCode)
          .description,
        country: criteriaModel.countries?.find((x) => x.code === country)
          .description,
        nation: criteriaModel.nations?.find((x) => x.code === reportFormat)
          .description,
        dealer:
          dealerCode === ""
            ? null
            : criteriaModel.dealers?.find((x) => x.dealerCode === dealerCode)
                .dealerName,
        year: new Date().getFullYear(),
      };
      setHeader(headerData);
    }
    // else if(criteriaModel && criteriaModel.brands !== undefined){
    //     let brand = criteriaModel.brands[0].description
    //     let country = criteriaModel.countries[0].description
    //     let nation = criteriaModel.nations[0].description
    //     let dealer = criteriaModel.dealers[0].dealerName
    //     let month = new Date().getMonth()
    //     let year =  new Date().getFullYear()
    //     let data = {
    //         brand, country, nation, dealer, month, year
    //     }
    //     setHeader(data)
    // }
    else if (resetList === constants.RESET) {
      dispatch(emptyOutboundCasesList());
      //reset pagination page to 1 on clicking reset button
      setActivePage(0);
      setResetStatus((prevState) => prevState + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber-1);
    let data = JSON.parse(localStorage.getItem("selectedOutboundCriteria"));
    data["pageIndex"] = pageNumber ;
    localStorage.setItem("selectedOutboundCriteria", JSON.stringify(data));
    dispatch(fetchOutboundCasesByCriteria(data));
  };

  return (
    <div>
      <Criteria
        calledFrom={calledFrom}
        isCriteriaOpen={isCriteriaOpen}
        setIsCriteriaOpen={setIsCriteriaOpen}
        criteriaModel={criteriaModel}
        bindCriteria={bindCriteria}
        casesList={outboundCases}
        setActivePage={setActivePage}
        callType={"OUTBOUND"}
        resetStatus={resetStatus}
      />
      <div className={"section" + (isCriteriaOpen ? "" : " criteria-width")}>
        <OutboundHeader header={header} listType="Pending Follow Ups" />
        <div className="mt-1">
          <div className="row mx-1">
            <div className="col-12 p-0">
              <OutboundListing
                setOpenFollowUpModal={setOpenFollowUpModal}
                outboundCases={outboundCases}
                setGetCaseId={setGetCaseId}
              />
              {recordCount > 0 && (
                <GridPagination
                  activePage={activePage}
                  itemsCountPerPage={50}
                  recordCount={recordCount}
                  pageRangeDisplayed={10}
                  handlePageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <FollowUpDetails
        openFollowUpModal={openFollowUpModal}
        setOpenFollowUpModal={setOpenFollowUpModal}
        getCaseId={getCaseId}
      />
    </div>
  );
};

export default PendingFollowUps;
