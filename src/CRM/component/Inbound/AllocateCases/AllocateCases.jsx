import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Criteria from "../../common/Criteria/Criteria";
import InboundHeader from "../InboundHeader/InboundHeader";
import GridPagination from "../../../../components/Shared/Pagination/Pagination";
import InboundDetails from "../InboundListing/InboundDetails/InboundDetails";
import * as constants from "../../../../utils/constant";
import SalesInboundListing from "../InboundListing/SalesInboundListing/SalesInboundListing";
import ServiceInboundListing from "../InboundListing/ServiceInboundListing/ServiceInboundListing";
import {
  fetchInboundCriteria,
  fetchInboundCasesByCriteria,
  emptyInboundCasesList,
  assignCaseToUser,
} from "../../../store/actions/inboundActions";

const AllocateCases = ({ calledBy, chooseComponent, calledFrom }) => {
  const dispatch = useDispatch();
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(true);
  const [header, setHeader] = useState();
  const [openInboundDetails, setOpenInboundDetails] = useState(false);
  const [resetInboundList, setResetInboundList] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [department, setDepartment] = useState("");
  const [allocateCaseList, setAllocateCaseList] = useState([]);
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [isReFetchListing, setIsReFetchListing] = useState(false);
  const [resetStatus, setResetStatus] = useState(0);
  useEffect(() => {
    if (criteriaModel === null || calledFrom === "MENU") {
      dispatch(fetchInboundCriteria(calledBy));
    }

    if (calledFrom == "MENU" && !isReFetchListing) {
      dispatch(emptyInboundCasesList());
    } else {
      if (
        (inboundCases === null || inboundCases === undefined) &&
        localStorage.getItem("selectedCriteria") != null
      ) {
        let selectedCriteria = JSON.parse(
          localStorage.getItem("selectedCriteria")
        );
        dispatch(fetchInboundCasesByCriteria(selectedCriteria));
        setIsReFetchListing(false);
      }
    }
  }, [isReFetchListing]);

  const { criteriaModel, message } = useSelector((state) => {
    let criteriaModel = state.inboundReducer.inboundModel?.criteriaModel;
    let message = state.inboundReducer.inboundModel?.removedCases?.message;
    if (criteriaModel !== null) {
      let brands = criteriaModel.brands;
      let countries = criteriaModel.country;
      let zones = criteriaModel.zones;
      let nations = criteriaModel.reportFormats;
      let caseDepartments = criteriaModel.caseDepartments;
      let caseSources = criteriaModel.caseSources;
      let caseCategories = criteriaModel.caseCategories;
      // let defaultSubCategory = caseCategories === undefined ? null : caseCategories[0].subCategories
      let dealers = criteriaModel.dealers;
      let outlet = dealers === undefined ? null : dealers[0].outets;
      let caseAllotedUsers = criteriaModel.caseAllotedUsers;
      let searchParameters = criteriaModel.searchParameters;
      let searchStatusParameters = criteriaModel.searchStatusParamters;
      return {
        criteriaModel: {
          brands: brands,
          countries: countries,
          nations: nations,
          zones: zones,
          caseDepartments: caseDepartments,
          caseSources: caseSources,
          caseCategories: caseCategories,
          // defaultSubCategory: defaultSubCategory,
          dealers: dealers,
          outlet: outlet,
          caseAllotedUsers: caseAllotedUsers,
          searchParameters: searchParameters,
          searchStatusParameters: searchStatusParameters,
          callType: "INBOUND",
        },
        message: message,
      };
    }
    return {
      criteriaModel: {},
      message: message,
    };
  });
  const { inboundCases, recordCount, disabledHeaderItems, escalationHoldType } =
    useSelector((state) => {
      let model = state.inboundReducer.inboundModel.caseListModel;
      if (model != null) {
        let inboundCases = model.inboundCases;
        let recordCount = model.recordCount;
        let disabledHeaderItems = model.disabledHeaderItems || [];
        let escalationHoldType = model.escalationHoldType;

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
      setDepartment(departmentCode);
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
      setResetStatus((prevState) => prevState + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber-1);
    let data = JSON.parse(localStorage.getItem("selectedCriteria"));
    data["pageIndex"] = pageNumber;
    dispatch(fetchInboundCasesByCriteria(data));
  };

  const defaultUser = () => {
    if (criteriaModel && criteriaModel?.caseAllotedUsers) {
      return criteriaModel?.caseAllotedUsers[0]?.userCode;
    }
  };
  const [allotedUser, setAllotedUser] = useState(defaultUser());

  const assignSelectedCasesToUser = () => {
    if (allocateCaseList?.length > 0 && allotedUser) {
      let payload = {
        allotedUserId: allotedUser,
        caseUniqueSerials: [...allocateCaseList],
        ipAddress: "1:1:1:1",
      };
      dispatch(assignCaseToUser(payload));
      setShowAlertMessage("ok");
      setTimeout(() => {
        setShowAlertMessage("");
      }, 2000);
      // if(removedCases?.status === 200){
      let selectedCriteria = JSON.parse(
        localStorage.getItem("selectedCriteria")
      );
      dispatch(fetchInboundCasesByCriteria(selectedCriteria));
      // }

      // let apiData = assignCasesToUserService(payload)
      // Promise.resolve(apiData)
      // .then(res => {
      //     if(res && res === 200){
      //         let selectedCriteria = JSON.parse(localStorage.getItem('selectedCriteria'))
      //         dispatch(fetchInboundCasesByCriteria(selectedCriteria))
      //     }
      // })
      // .catch(error => {

      // })
    }
  };

  const handleCheckBoxClick = (e, val) => {
    if (e.target.checked) {
      setAllocateCaseList((prevState) => [...prevState, val]);
    } else {
      setAllocateCaseList((prevState) => {
        const newState = JSON.parse(JSON.stringify(prevState));
        const index = newState.indexOf(val);
        if (index > -1) {
          newState.splice(index, 1);
        }
        return newState;
      });
    }
  };
  return (
    <React.Fragment>
      <Criteria
        isCriteriaOpen={isCriteriaOpen}
        setIsCriteriaOpen={setIsCriteriaOpen}
        criteriaModel={criteriaModel}
        bindCriteria={bindCriteria}
        setResetInboundList={setResetInboundList}
        callType={"INBOUND"}
        resetStatus={resetStatus}
        // showHideAllotedUser={false}
      />
      <div className={"section" + (isCriteriaOpen ? "" : " criteria-width")}>
        <InboundHeader
          listType="Allocate"
          header={header}
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
              {department === constants.SERVICE ? (
                <ServiceInboundListing
                  chooseComponent={chooseComponent}
                  setOpenInboundDetails={setOpenInboundDetails}
                  inboundCases={inboundCases}
                  handleCheckBoxClick={handleCheckBoxClick}
                  disabledHeaderItems={disabledHeaderItems}
                  escalationHoldType={escalationHoldType}
                  setIsReFetchListing={setIsReFetchListing}
                />
              ) : (
                <SalesInboundListing
                  chooseComponent={chooseComponent}
                  setOpenInboundDetails={setOpenInboundDetails}
                  inboundCases={inboundCases}
                  handleCheckBoxClick={handleCheckBoxClick}
                  disabledHeaderItems={disabledHeaderItems}
                  escalationHoldType={escalationHoldType}
                  setIsReFetchListing={setIsReFetchListing}
                />
              )}
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
            <InboundDetails
              openInboundDetails={openInboundDetails}
              setOpenInboundDetails={setOpenInboundDetails}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllocateCases;
