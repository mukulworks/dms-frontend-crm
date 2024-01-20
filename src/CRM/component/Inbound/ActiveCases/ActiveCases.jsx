import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Criteria from "../../common/Criteria/Criteria";
import InboundHeader from "../InboundHeader/InboundHeader";
import { fetchInboundCriteria } from "../../../store/actions/inboundActions";
import ServiceInboundListing from "../InboundListing/ServiceInboundListing/ServiceInboundListing";
import SalesInboundListing from "../InboundListing/SalesInboundListing/SalesInboundListing";
import * as constants from "../../../../utils/constant";
import GridPagination from "../../../../components/Shared/Pagination/Pagination";
import {
  fetchInboundCasesByCriteria,
  emptyInboundCasesList,
} from "../../../store/actions/inboundActions";
import FollowUpDetails from "../../common/FollowUpDetails/FollowUpDetails";

const ActiveCases = ({ calledBy, chooseComponent, calledFrom }) => {
  const dispatch = useDispatch();
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(true);
  const [header, setHeader] = useState();
  const [openInboundDetails, setOpenInboundDetails] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [getCaseId, setGetCaseId] = useState("");
  const [isReFetchListing, setIsReFetchListing] = useState(false);
  const [resetStatus, setResetStatus] = useState(0);
  useEffect(() => {
    if (!criteriaModel || (calledFrom === "MENU" && !isReFetchListing)) {
      dispatch(fetchInboundCriteria(calledBy));
    }

    if (calledFrom === "MENU" && !isReFetchListing) {
      dispatch(emptyInboundCasesList());
    } else if (calledFrom === "SAVE" || isReFetchListing) {
      if (localStorage.getItem("selectedCriteria") !== null) {
        //to maintain the listing on the screen
        let selectedCriteria = JSON.parse(
          localStorage.getItem("selectedCriteria")
        );
        dispatch(fetchInboundCasesByCriteria(selectedCriteria));
        setIsReFetchListing(false);
        // to maintain the page number in pagination
        setActivePage(selectedCriteria["pageIndex"]);
      }
    } else if (calledFrom === "BACK") {
      if (localStorage.getItem("selectedCriteria") !== null) {
        //to maintain the page number in pagination
        let selectedCriteria = JSON.parse(
          localStorage.getItem("selectedCriteria")
        );
        setActivePage(selectedCriteria["pageIndex"]);
      }
    }
  }, [isReFetchListing]);

  const { criteriaModel, isCaseCreationEnable } = useSelector((state) => {
    let criteriaModel = state.inboundReducer.inboundModel?.criteriaModel;

    if (criteriaModel !== null) {
      let brands = criteriaModel?.brands;
      let countries = criteriaModel?.country;
      let nations = criteriaModel?.reportFormats;
      let caseDepartments =
        calledBy === "SERVICE"
          ? criteriaModel?.caseDepartments?.filter((x) => x.code === "SERVICE")
          : criteriaModel?.caseDepartments?.filter((x) => x.code !== "SERVICE");
      let caseSources = criteriaModel?.caseSources;
      let caseCategories = criteriaModel?.caseCategories;
      // let defaultSubCategory = caseCategories === undefined ? null : caseCategories[0].subCategories
      let zones = criteriaModel?.zones;
      let dealers = criteriaModel?.dealers;
      let outlet = dealers === undefined ? null : dealers[0].outets;
      let caseAllotedUsers = criteriaModel?.caseAllotedUsers;
      let searchParameters = criteriaModel?.searchParameters;
      let searchStatusParameters = criteriaModel?.searchStatusParamters;
      let callType = "INBOUND";
      return {
        criteriaModel: {
          brands: brands,
          countries: countries,
          nations: nations,
          zones: zones,
          dealers: dealers,
          outlet: outlet,
          caseDepartments: caseDepartments,
          caseSources: caseSources,
          caseCategories: caseCategories,
          caseAllotedUsers: caseAllotedUsers,
          searchParameters: searchParameters,
          searchStatusParameters: searchStatusParameters,
          callType: callType,
        },
        isCaseCreationEnable: criteriaModel?.isCaseCreationEnable,
      };
    }
    return {
      criteriaModel: null,
      isCaseCreationEnable: criteriaModel?.isCaseCreationEnable,
    };
  });

  const { inboundCases, recordCount, disabledHeaderItems, escalationHoldType } =
    useSelector((state) => {
      let model = state.inboundReducer.inboundModel.caseListModel;
      if (model != null) {
        let inboundCases = model.inboundCases;
        let recordCount = model.recordCount;
        let disabledHeaderItems = model.disabledHeaderItems || [];
        let removedCases = model.removedCases;
        let escalationHoldType = model.escalationHoldType;
        function findWithAttr(array, attr, value) {
          if (array?.length > 0) {
            for (var i = 0; i < array.length; i += 1) {
              if (array[i][attr] === value) {
                return i;
              }
            }
          }
          return -1;
        }
        if (removedCases?.status === 200) {
          removedCases.payload.payload.caseUniqueSerials.forEach((caseid) => {
            let index = findWithAttr(inboundCases, "caseId", caseid);
            if (inboundCases) {
              inboundCases.splice(index, 1);
            }
          });
        }
        return {
          inboundCases: inboundCases,
          recordCount: recordCount,
          disabledHeaderItems: disabledHeaderItems,
          escalationHoldType: escalationHoldType,
        };
      }
      return {
        inboundCases: null,
        recordCount: null,
        disabledHeaderItems: [],
        escalationHoldType: "",
      };
    });

  const bindCriteria = (event, resetList, date = "") => {
    if (event) {
      let brandCode = event.target.form["brand"].value;
      let country = event.target.form["country"].value;
      let reportFormat = event.target.form["nation"].value;
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
      let outletCode = event.target.form["outlet"].value;
      let allotedCode = event.target.form["alloted"].value;
      let caseStatus = event.target.form["caseStatus"].value;
      let searchKey = event.target.form["searchKey"].value;

      let searchValue = date
        ? date?.selectedFromDate?.toISOString().split("T")[0] +
          "|" +
          date?.selectedToDate?.toISOString().split("T")[0]
        : event.target.form["searchValue"]?.value;
      let zone = event.target.form["zone"].value;
      let data = {
        brandCode: brandCode,
        countryCode: country,
        reportFormat: reportFormat,
        allotedDealerId: dealerCode,
        allotedOutletId: outletCode,
        departmentCode: departmentCode,
        caseSource: source,
        categoryID: categoryID,
        subCategoryId: subcategoryCode,
        caseAllottedTo: allotedCode,
        caseStatus: caseStatus,
        searchKey: searchKey,
        searchValue: searchValue,
        pageIndex: activePage,
        zone: zone,
      };
      localStorage.setItem("selectedCriteria", JSON.stringify(data));
      dispatch(fetchInboundCasesByCriteria(data));

      let headerData = {
        brand: criteriaModel.brands.find((x) => x.code === brandCode)
          .description,
        country: criteriaModel.countries.find((x) => x.code === country)
          .description,
        nation: criteriaModel.nations.find((x) => x.code === reportFormat)
          .description,
        dealer:
          dealerCode === ""
            ? null
            : criteriaModel.dealers.find((x) => x.dealerCode === dealerCode)
                .dealerName,
        year: new Date().getFullYear(),
      };
      setHeader(headerData);
      //set page number to 1 after getting list from API
      setActivePage(0);
    } else if (criteriaModel && criteriaModel.brands !== undefined) {
      let brand = criteriaModel.brands[0].description;
      let country = criteriaModel.countries[0].description;
      let nation = criteriaModel.nations[0].description;
      let dealer = criteriaModel.dealers[0].dealerName;
      let month = new Date().getMonth();
      let year = new Date().getFullYear();
      let data = {
        brand,
        country,
        nation,
        dealer,
        month,
        year,
      };
      setHeader(data);
    }

    if (resetList === constants.RESET) {
      dispatch(emptyInboundCasesList());
      //reset pagination page to 0 on clicking reset button
      setActivePage(0);
      localStorage.removeItem("selectedCriteria");
      setResetStatus((prevState) => prevState + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber - 1);
    let data = JSON.parse(localStorage.getItem("selectedCriteria"));
    data["pageIndex"] = pageNumber - 1;
    localStorage.setItem("selectedCriteria", JSON.stringify(data));
    dispatch(fetchInboundCasesByCriteria(data));
  };

  return (
    <React.Fragment>
      <Criteria
        isCriteriaOpen={isCriteriaOpen}
        setIsCriteriaOpen={setIsCriteriaOpen}
        criteriaModel={criteriaModel}
        bindCriteria={bindCriteria}
        calledFrom={calledFrom}
        casesList={inboundCases}
        callType={"INBOUND"}
        resetStatus={resetStatus}
      />
      <div className={"section" + (isCriteriaOpen ? "" : " criteria-width")}>
        <InboundHeader
          listType={
            calledBy === constants.SERVICE
              ? "Service - Active Follow-Ups"
              : "Active Follow-Ups"
          }
          header={header}
          chooseComponent={chooseComponent}
          showCreateButton={isCaseCreationEnable}
        />

        <div className="mt-1">
          <div className="row mx-1">
            <div className="col-12 p-0">
              {calledBy === constants.SALES ? (
                <SalesInboundListing
                  chooseComponent={chooseComponent}
                  setOpenInboundDetails={setOpenInboundDetails}
                  inboundCases={inboundCases}
                  setGetCaseId={setGetCaseId}
                  disabledHeaderItems={disabledHeaderItems}
                  escalationHoldType={escalationHoldType}
                  setIsReFetchListing={setIsReFetchListing}
                />
              ) : calledBy === constants.SERVICE ? (
                <ServiceInboundListing
                  chooseComponent={chooseComponent}
                  setOpenInboundDetails={setOpenInboundDetails}
                  inboundCases={inboundCases}
                  setGetCaseId={setGetCaseId}
                  disabledHeaderItems={disabledHeaderItems}
                  escalationHoldType={escalationHoldType}
                  setIsReFetchListing={setIsReFetchListing}
                />
              ) : null}
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
            <FollowUpDetails
              openFollowUpModal={openInboundDetails}
              setOpenFollowUpModal={setOpenInboundDetails}
              getCaseId={getCaseId}
            />
            {/* <InboundDetails openInboundDetails={openInboundDetails} setOpenInboundDetails={setOpenInboundDetails}/> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActiveCases;
