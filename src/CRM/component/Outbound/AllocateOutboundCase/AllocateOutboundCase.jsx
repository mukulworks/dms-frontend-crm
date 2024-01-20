import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Criteria from "../../common/Criteria/Criteria";
import OutboundHeader from "../OutboundHeader/OutboundHeader";
import OutboundListing from "../OutboundListing/OutboundListing";
import * as constants from "../../../../utils/constant";
import {
  fetchOutboundCriteria,
  fetchOutboundCasesByCriteria,
  emptyOutboundCasesList,
} from "../../../store/actions/outboundActions/outboundActions";
import { assignCaseToUser } from "../../../store/actions/inboundActions";
import GridPagination from "../../../../components/Shared/Pagination/Pagination";

const AllocateOutboundCase = ({ chooseComponent, calledFrom }) => {
  const dispatch = useDispatch();
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(true);
  const [openFollowUpModal, setOpenFollowUpModal] = useState(false);
  const [header, setHeader] = useState();
  const [activePage, setActivePage] = useState(0);
  const [allocateCaseList, setAllocateCaseList] = useState([]);
  const [allotedUser, setAllotedUser] = useState();
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [resetStatus, setResetStatus] = useState(0);
  useEffect(() => {
    if (criteriaModel === null || calledFrom === "MENU") {
      dispatch(fetchOutboundCriteria());
    }

    if (calledFrom == "MENU") {
      dispatch(emptyOutboundCasesList());
    } else {
      if (
        (outboundCases === null || outboundCases === undefined) &&
        localStorage.getItem("selectedOutboundCriteria") != null
      ) {
        let selectedCriteria = JSON.parse(
          localStorage.getItem("selectedOutboundCriteria")
        );
        dispatch(fetchOutboundCasesByCriteria(selectedCriteria));
      }
    }
  }, []);

  const [timerCount, setTimeCount] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeCount(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { outboundCases, recordCount, criteriaModel, message } = useSelector(
    (state) => {
      // let criteria = state.outboundReducer.outboundModel.outboundCases.criteria
      let outboundCases =
        state.outboundReducer.outboundModel.outboundCases.outboundCases;
      let recordCount =
        state.outboundReducer.outboundModel.outboundCases?.recordCount;
      let criteriaModel = state.outboundReducer.outboundModel.criteriaModel;
      let message = state.outboundReducer?.outboundModel?.removedCases?.message;
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
        message: message,
        // pageCount: pageCount,
        // pageNumbers: pageNumbers
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
      dispatch(emptyOutboundCasesList());
      setResetStatus((prevState) => prevState + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber-1);
    let data = JSON.parse(localStorage.getItem("selectedOutboundCriteria"));
    data["pageIndex"] = pageNumber;
    dispatch(fetchOutboundCasesByCriteria(data));
  };

  const assignSelectedCasesToUser = () => {
    if (allocateCaseList?.length > 0 && allotedUser) {
      let payload = {
        allotedUserId: allotedUser,
        caseUniqueSerials: [...allocateCaseList],
        ipAddress: "1:1:1:1",
        outbound: true,
      };
      setShowAlertMessage("ok");
      setTimeout(() => {
        setShowAlertMessage("");
      }, 2000);
      dispatch(assignCaseToUser(payload));
      let selectedCriteria = JSON.parse(
        localStorage.getItem("selectedOutboundCriteria")
      );
      dispatch(fetchOutboundCasesByCriteria(selectedCriteria));
    }
  };

  return (
    <div>
      <Criteria
        calledFrom={calledFrom}
        isCriteriaOpen={isCriteriaOpen}
        setIsCriteriaOpen={setIsCriteriaOpen}
        criteriaModel={criteriaModel}
        bindCriteria={bindCriteria}
        callType={"OUTBOUND"}
        resetStatus={resetStatus}
      />
      <div className={"section" + (isCriteriaOpen ? "" : " criteria-width")}>
        <OutboundHeader
          header={header}
          listType="Allocate"
          chooseComponent={chooseComponent}
          assignSelectedCasesToUser={assignSelectedCasesToUser}
          caseAllotedUsers={criteriaModel.caseAllotedUsers}
          setAllotedUser={setAllotedUser}
        />
        <div className="mt-1">
          <div className="row mx-1">
            <div className="col-12 p-0">
              {showAlertMessage && (
                <div
                  className={`alert alert-success alert-dismissible fade position-absolute show`}
                  role="alert"
                  style={{ right: 15, zIndex: 99, top: 0 }}
                >
                  {message}
                  <button
                    type="button"
                    className="close p-2"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShowAlertMessage("")}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              <OutboundListing
                setOpenFollowUpModal={setOpenFollowUpModal}
                outboundCases={outboundCases}
                chooseComponent={chooseComponent}
                allocateCaseList={allocateCaseList}
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
      {/* <FollowUpDetails openFollowUpModal={openFollowUpModal} setOpenFollowUpModal={setOpenFollowUpModal} /> */}
    </div>
  );
};

export default AllocateOutboundCase;
