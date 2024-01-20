import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CriteriaArrow from "../../../../images/criteria-arrow.png";
import * as constants from "../../../../utils/constant";
import ReactDatePicker from "react-datepicker";
import Loader from "../Loader/Loader";
const Criteria = ({
  isCriteriaOpen,
  setIsCriteriaOpen,
  criteriaModel,
  bindCriteria,
  calledFrom,
  casesList,
  callType,
  resetStatus,
}) => {
  const setDefaultValues = (criteriaType) => {
    var selectedCriteria = localStorage.getItem(
      callType == "INBOUND" ? "selectedCriteria" : "selectedOutboundCriteria"
    );
    switch (criteriaType) {
      case constants.BRAND:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.brandCode;
        }
        break;
      case constants.COUNTRY:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.countryCode;
        }
        break;
      case constants.NATION:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.reportFormat;
        }
        break;
      case constants.ZONE:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.zone;
        }
        break;
      case constants.DEALER:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.allotedDealerId;
        }
        break;
      case constants.DEPARTMENT:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.departmentCode;
        }
        break;
      case constants.SOURCE:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.caseSource;
        }
        break;
      case constants.CATEGORY:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.categoryID;
        }
        break;
      case constants.SUBCATEGORY:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.subcategoryCode;
        }
        break;
      case constants.ALLOCATED_TO:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.caseAllottedTo;
        }
        break;
      case constants.ALLOCATED_TO:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);
          return selectedCriteria.caseStatus;
        }
        break;
      case constants.SEARCH_BY:
        if (selectedCriteria) {
          selectedCriteria = JSON.parse(selectedCriteria);

          return selectedCriteria.searchKey;
        }
        break;
      default:
        break;
    }
  };
  const { register, getValues, setValue, watch } = useForm();
  useEffect(() => {
    if (resetStatus) {
      setValue("brand", criteriaModel.brands[0].code);
      setValue("country", criteriaModel.countries[0].code);
      setValue("nation", criteriaModel.nations[0].code);
      setValue("zone", "");

      setValue("outlet", criteriaModel.outlet[0].branchCode);
      setValue("department", criteriaModel.caseDepartments[0].code);
      setValue("source", "");
      setValue("category", "");
      setValue("subcategory", "");
      setValue("alloted", "");
      setValue("caseStatus", criteriaModel.searchStatusParameters[0].code);
      setValue("searchKey", "");
      setValue("searchValue", "");
    }
  }, [resetStatus]);
  const [isCriteriaDisabled, setIsCriteriaDisabled] = useState(false);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState(
    criteriaModel?.caseCategories
  );
  const [selectedDealer, setSelectedDealer] = useState(
    setDefaultValues(constants.DEALER) ||
      (criteriaModel?.dealers?.length > 0 &&
        criteriaModel?.dealers[0].dealerCode)
  );
  const [searchBy, setSearchBy] = useState(
    setDefaultValues(constants.SEARCH_BY)
  );
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState("");
  const [viewType, setViewType] = useState(
    setDefaultValues(constants.NATION) ||
      (criteriaModel?.nations?.length > 0 && criteriaModel?.nations[0].code)
  );
  useEffect(() => {
    setViewType(
      setDefaultValues(constants.NATION) ||
        (criteriaModel?.nations?.length > 0 && criteriaModel?.nations[0].code)
    );
  }, [criteriaModel?.nations, resetStatus]);
  useEffect(() => {
    setCategoryList(criteriaModel?.caseCategories);
    handleCategory(
      {
        target: { value: setDefaultValues(constants.DEPARTMENT) },
      },
      false
    );
  }, [criteriaModel?.caseCategories, resetStatus]);
  useEffect(() => {
    setSelectedDealer(
      setDefaultValues(constants.DEALER) ||
        (criteriaModel?.dealers?.length > 0 &&
          criteriaModel?.dealers[0].dealerCode)
    );
  }, [criteriaModel?.dealers, resetStatus]);

  useEffect(() => {
    if (calledFrom === "BACK") {
      if (
        casesList !== undefined &&
        (localStorage.getItem("selectedCriteria") !== null ||
          localStorage.getItem("selectedOutboundCriteria") !== null)
      ) {
        setIsCriteriaDisabled(true);
      }
    } else if (calledFrom === "SAVE") {
      setIsCriteriaDisabled(true);
    }
  }, [calledFrom]);

  const handleCategory = (e, emptyList = true) => {
    let departmentCode = e.target.value;
    let categories = [];
    departmentCode =
      departmentCode === "PRE_SALES" ? "PRE-SALES" : departmentCode;

    if (departmentCode) {
      if (departmentCode == "SALES") {
        setCategoryList(criteriaModel?.caseCategories);
        return;
      }
      if (
        criteriaModel?.caseCategories !== undefined &&
        criteriaModel?.caseCategories !== null
      ) {
        categories = criteriaModel.caseCategories.filter((category) => {
          return category.classifictaionGroup === departmentCode;
        });
      }
      setCategoryList(categories);
    } else {
      if (emptyList) {
        setCategoryList([]);
        setSubCategoryList([]);
      }
    }
  };

  const handleSubCategory = (e) => {
    let categoryID = e.target.value;
    if (
      criteriaModel &&
      criteriaModel.caseCategories &&
      criteriaModel.caseCategories !== ""
    ) {
      let subCategoryArr = criteriaModel.caseCategories.find((category) => {
        return category.categoryID === parseInt(categoryID);
      });
      if (subCategoryArr !== undefined) {
        subCategoryArr = subCategoryArr["subCategories"];

        setSubCategoryList(subCategoryArr);
      } else setSubCategoryList([]);
    } else {
      setSubCategoryList([]);
    }
  };

  const submitCriteria = (event) => {
    if (selectedFromDate > selectedToDate) {
      setErrorMsg("From Date cannot be greater than to Date");
      return;
    }
    setErrorMsg("");
    setIsCriteriaDisabled(true);
    //reset the page number to 1 in pagination
    setIsCriteriaOpen(false);
    bindCriteria(
      event,
      null,
      searchBy == "CASE_DATE" ? { selectedFromDate, selectedToDate } : null
    );
  };
  const handleNationChange = (e) => {
    setViewType(e.target.value);

    switch (e.target.value) {
      case constants.NATION:
        setValue("zone", "");
        setValue("dealer", "");
        setValue("outlet", "");
        break;
      case constants.ZONE_WISE:
        setValue("dealer", "");
        setValue("outlet", "");
        break;
      case constants.DEALERSHIP_WISE:
        setValue("zone", "");
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setIsCriteriaDisabled(false);
    bindCriteria(null, constants.RESET);
  };

  const handleEnableDisable = (type) => {
    switch (viewType) {
      case constants.NATION:
        setValue("zone", "");
        setValue("dealer", "");
        return true;
      case constants.ZONE_WISE:
        if (type === constants.ZONE) {
          setValue("dealer", "");
          setValue("outlet", "");
          return false;
        } else {
          return true;
        }
      case constants.DEALERSHIP_WISE:
        if (type === constants.DEALER || type == constants.OUTLET) {
          setValue("zone", "");
          return false;
        } else {
          return true;
        }

      default:
        break;
    }
  };
  return (
    <aside className={isCriteriaOpen ? "" : "small"}>
      {criteriaModel ? (
        <div className={"card" + (isCriteriaOpen ? "" : " d-none")}>
          <div className="card-body px-0 pt-2 pb-0">
            <p className="card-title font-13 px-3 text-capitalize mb-1 font-weight-bold criteria-right-arrow">
              please select your criteria
              <span
                className="mdi mdi-chevron-double-left font-20 float-right"
                onClick={() => setIsCriteriaOpen(!isCriteriaOpen)}
              ></span>
            </p>
            <hr className="mt-2" />
            <form style={{ overflow: "auto", height: "calc(100% - 50px)" }}>
              <ul className="list-group list-group-flush">
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Brand</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="brand"
                        id="brand"
                        className="form-control"
                        disabled={isCriteriaDisabled}
                        defaultValue={setDefaultValues(constants.BRAND)}
                      >
                        {criteriaModel &&
                          criteriaModel.brands &&
                          criteriaModel.brands.map((brand, key) => (
                            <option key={key} value={brand.code}>
                              {brand.description}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Country</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="country"
                        id="country"
                        className="form-control"
                        disabled={isCriteriaDisabled}
                        defaultValue={setDefaultValues(constants.COUNTRY)}
                      >
                        {criteriaModel.countries &&
                          criteriaModel.countries.map((county, key) => (
                            <option key={key} value={county.code}>
                              {county.description}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">View Type</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="nation"
                        id="nation"
                        className="form-control"
                        disabled={isCriteriaDisabled}
                        ref={register}
                        value={viewType}
                        onChange={(e) => handleNationChange(e)}
                      >
                        {criteriaModel.nations &&
                          criteriaModel.nations.map((nation, key) => (
                            <option key={key} value={nation.code}>
                              {nation.description}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Zone</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="zone"
                        id="zone"
                        className="form-control"
                        ref={register}
                        defaultValue={setDefaultValues(constants.ZONE)}
                        disabled={
                          isCriteriaDisabled ||
                          handleEnableDisable(constants.ZONE)
                        }
                      >
                        {viewType != "ZONE_WISE" && (
                          <option value="">All Zones</option>
                        )}
                        {criteriaModel.zones &&
                          criteriaModel.zones.map((zone, key) => (
                            <option key={key} value={zone.code}>
                              {zone.description}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Dealer</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="dealer"
                        id="dealer"
                        className="form-control"
                        ref={register}
                        onChange={(e) => {
                          setSelectedDealer(e.target.value);
                        }}
                        defaultValue={setDefaultValues(constants.DEALER)}
                        disabled={handleEnableDisable(constants.DEALER)}
                      >
                        {viewType != "DEALERSHIP_WISE" && (
                          <option value="">All Dealers</option>
                        )}
                        {criteriaModel.dealers &&
                          criteriaModel.dealers.map((dealer, key) => (
                            <option key={key} value={dealer.dealerCode}>
                              {dealer.dealerName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Outlet</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="outlet"
                        id="outlet"
                        className="form-control"
                        ref={register}
                        defaultValue={setDefaultValues(constants.OUTLET)}
                        disabled={handleEnableDisable(constants.OUTLET)}
                      >
                        {viewType != "DEALERSHIP_WISE" && (
                          <option value="" disabled selected hidden>
                            All Locations
                          </option>
                        )}

                        {criteriaModel.dealers?.map((dealer) => {
                          if (dealer?.dealerCode == selectedDealer) {
                            return dealer?.outets?.map((dealer, key) => (
                              <option key={key} value={dealer.branchCode}>
                                {dealer.branchName}
                              </option>
                            ));
                          }
                        })}
                      </select>
                    </div>
                  </div>
                </li>
                {criteriaModel.callType === "INBOUND" && (
                  <li className="inbound-list-group-item">
                    <div className="row form-group">
                      <div className="col-4 pr-0">
                        <label htmlFor="">Department</label>
                      </div>
                      <div className="col-8">
                        <select
                          name="department"
                          id="department"
                          className="form-control"
                          ref={register}
                          disabled={isCriteriaDisabled}
                          onChange={handleCategory}
                        >
                          {criteriaModel.caseDepartments &&
                            criteriaModel.caseDepartments.map(
                              (caseDepartment, key) => (
                                <option key={key} value={caseDepartment.code}>
                                  {caseDepartment.description}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>
                  </li>
                )}
                {criteriaModel.callType === "INBOUND" && (
                  <li className="inbound-list-group-item">
                    <div className="row form-group">
                      <div className="col-4 pr-0">
                        <label htmlFor="">Source</label>
                      </div>
                      <div className="col-8">
                        <select
                          name="source"
                          id="source"
                          className="form-control"
                          disabled={isCriteriaDisabled}
                          ref={register}
                          defaultValue={setDefaultValues(constants.SOURCE)}
                        >
                          <option value="">All Sources</option>
                          {criteriaModel.caseSources &&
                            criteriaModel.caseSources.map((caseSource, key) => (
                              <option key={key} value={caseSource.code}>
                                {caseSource.description}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </li>
                )}

                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Category</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="category"
                        id="category"
                        className="form-control"
                        ref={register}
                        disabled={isCriteriaDisabled}
                        onChange={handleSubCategory}
                        defaultValue={setDefaultValues(constants.CATEGORY)}
                      >
                        <option value="">All Category</option>
                        {criteriaModel.callType === "INBOUND"
                          ? categoryList &&
                            categoryList.map((caseCategory, key) => (
                              <option key={key} value={caseCategory.categoryID}>
                                {caseCategory.categoryDescription}
                              </option>
                            ))
                          : criteriaModel.callType === "OUTBOUND"
                          ? criteriaModel &&
                            criteriaModel.caseCategories &&
                            criteriaModel.caseCategories.map(
                              (caseCategory, key) => (
                                <option
                                  key={key}
                                  value={caseCategory.categoryID}
                                >
                                  {caseCategory.categoryDescription}
                                </option>
                              )
                            )
                          : null}
                      </select>
                    </div>
                  </div>
                </li>

                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Sub Category</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="subcategory"
                        id="subcategory"
                        className="form-control"
                        ref={register}
                        disabled={isCriteriaDisabled}
                        defaultValue={setDefaultValues(constants.SUBCATEGORY)}
                      >
                        <option value="">All Sub-Category</option>
                        {subCategoryList &&
                          subCategoryList.map((subCategory, key) => (
                            <option key={key} value={subCategory.subCategoryID}>
                              {subCategory.subCategoryDesc}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Allocated To</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="alloted"
                        id="alloted"
                        className="form-control mb-1"
                        ref={register}
                        disabled={isCriteriaDisabled}
                        defaultValue={setDefaultValues(constants.ALLOCATED_TO)}
                      >
                        <option key="0" value="">
                          All Users
                        </option>
                        {criteriaModel.caseAllotedUsers &&
                          criteriaModel.caseAllotedUsers.map(
                            (allotedUser, key) => (
                              <option key={key} value={allotedUser.userCode}>
                                {allotedUser.userName}
                              </option>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Status</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="caseStatus"
                        id="caseStatus"
                        className="form-control mb-1"
                        ref={register}
                        disabled={isCriteriaDisabled}
                        defaultValue={setDefaultValues(constants.CASE_STATUS)}
                      >
                        {criteriaModel.searchStatusParameters &&
                          criteriaModel.searchStatusParameters.map(
                            (statusParameter, key) => (
                              <option key={key} value={statusParameter.code}>
                                {statusParameter.description}
                              </option>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="inbound-list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pr-0">
                      <label htmlFor="">Search By</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="searchKey"
                        id="searchKey"
                        ref={register}
                        className="form-control mb-1"
                        disabled={isCriteriaDisabled}
                        onChange={(e) => setSearchBy(e.target.value)}
                        defaultValue={setDefaultValues(constants.SEARCH_BY)}
                      >
                        <option key="0" value="">
                          Search By
                        </option>
                        {criteriaModel.searchParameters &&
                          criteriaModel.searchParameters.map(
                            (searchParam, key) => (
                              <option key={key} value={searchParam.code}>
                                {searchParam.description}
                              </option>
                            )
                          )}
                      </select>
                      {searchBy ? (
                        criteriaModel.searchParameters?.map((search) => {
                          if (search.code === searchBy) {
                            if (search.controlType == "DROPDOWN") {
                              return (
                                <select
                                  name="searchValue"
                                  id="searchValue"
                                  className="form-control mb-1"
                                  ref={register}
                                  disabled={isCriteriaDisabled}
                                >
                                  {search.collections &&
                                    search.collections.map(
                                      (searchParam, key) => (
                                        <option
                                          key={key}
                                          value={searchParam.code}
                                        >
                                          {searchParam.description}
                                        </option>
                                      )
                                    )}
                                </select>
                              );
                            } else if (search.controlType == "DATE_CALENDAR") {
                              return (
                                <>
                                  {errorMsg ? (
                                    <div
                                      className="alert alert-danger mb-0"
                                      role="alert"
                                    >
                                      {" "}
                                      {errorMsg}{" "}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {errorMsg && <></>}
                                  <label htmlFor="">From</label>
                                  <ReactDatePicker
                                    className="form-control mb-1"
                                    onChange={(e) => {
                                      setSelectedFromDate(e);
                                    }}
                                    closeOnScroll={true}
                                    selected={selectedFromDate}
                                    // onBlur={props.onBlur}
                                    dateFormat="dd-MMM-yyyy"
                                  />
                                  <label htmlFor="">To</label>
                                  <ReactDatePicker
                                    className="form-control mb-1"
                                    onChange={(e) => {
                                      setSelectedToDate(e);
                                    }}
                                    closeOnScroll={true}
                                    selected={selectedToDate}
                                    // onBlur={props.onBlur}
                                    dateFormat="dd-MMM-yyyy"
                                  />
                                </>
                              );
                            } else {
                              return (
                                <input
                                  name="searchValue"
                                  id="searchValue"
                                  type="text"
                                  className="form-control"
                                  ref={register}
                                  placeholder=""
                                />
                              );
                            }
                          }
                        })
                      ) : (
                        <input
                          name="searchValue"
                          id="searchValue"
                          type="text"
                          className="form-control"
                          ref={register}
                          placeholder=""
                        />
                      )}
                    </div>
                  </div>
                </li>
              </ul>
              <div className="row p-3">
                <div className="col-6">
                  <button
                    onClick={submitCriteria}
                    type="button"
                    name="proceed"
                    id="submitButton"
                    className="btn btn-success btn-lg btn-block rounded-0"
                    disabled={isCriteriaDisabled}
                  >
                    Proceed
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={handleReset}
                    type="button"
                    name="reset"
                    id="resetButton"
                    className="btn btn-outline-success btn-lg btn-block rounded-0"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className={(isCriteriaOpen ? "d-none " : "") + "criteria-button"}>
        <span onClick={() => setIsCriteriaOpen(!isCriteriaOpen)}>
          <img src={CriteriaArrow} alt="" />
        </span>
      </div>
    </aside>
  );
};

export default Criteria;
