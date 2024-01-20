import React, { useEffect, useState } from "react";
import CriteriaArrow from "../../../../images/criteria-arrow.png";
import * as constants from "../../../../utils/constant";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader/Loader";
import { useForm } from "react-hook-form";

const Criteria = ({
  isCriteriaOpen,
  setIsCriteriaOpen,
  criteriaObjects,
  bindCriteria,
  criteriaType,
  prevPath,
}) => {
  const [isCriteriaDisabled, setIsCriteriaDisabled] = useState(false);
  const [disableList, setDisableList] = useState("ALL");
  const [startDate, setStartDate] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });
  const [defaultDept, setDefaultDept] = useState("");
  const [defaultZone, setDefaultZone] = useState("");
  const submitCriteria = (e) => {
    setIsCriteriaDisabled(true);
    let type = null;
    switch (prevPath) {
      case "/CRMREPORTS/INDEX":
        type = constants.CASE_SALES_SUMMARY;
        break;
      case "/CRMREPORTS/ServiceExcel":
        type = constants.CASE_REGISTER;
        break;
      case "/CRMREPORTS/SurveyExcelReport":
        type = constants.SCX_CASE_SUMMARY;
        break;
      case "/CRMREPORTS/CxSurveyExcelReport":
        type = constants.SCX_SURVEY_SUMMARY;
        break;
      case "/CRMREPORTS/ExcelReportCriteria":
        type = constants.CASE_INBOUND_EXCEL;
        break;
      case "/CRMREPORTS/Service":
        type = constants.CASE_SERVICE_SUMMARY;
        break;
      case "/CRMREPORTS/QFBData":
        type = constants.QFB_SUMMARY;
        break;
      default:
        break;
    }

    let { form } = e.target;
    let dataArray = [];
    let brand, country;
    for (let i = 0; i < form.length; i++) {
      if (form[i].name == "SHOW_FOLLOWUP") {
        dataArray.push({
          code: form[i].name,
          value: form[i].checked ? "Y" : "N",
        });
      } else {
        dataArray.push({ code: form[i].name, value: form[i].value });
      }
      if (form[i].name === "BRAND_CODES") {
        brand = form[i].value;
      } else if (form[i].name === "COUNTRY_CODE") {
        country = form[i].value;
      }
    }

    let payload = {
      reportType: type, //'CASE_SUMMARY',
      criteriaParameters: dataArray,
    };
    let headerData = {
      brand,
      country,
    };
    bindCriteria(payload, headerData);
  };
  const { setValue } = useForm();
  const handleReset = () => {
    setIsCriteriaDisabled(false);
    //TO EMPTY THE API DATA
    bindCriteria("RESET", null);
    criteriaObjects?.map((obj) => {
      document.getElementById(obj.code).value =
        obj.items?.length > 0 && obj.items[0]?.code;
      setValue(obj.code, obj.items?.length > 0 && obj.items[0]?.code);
    });
    setStartDate({
      fromDate: new Date(),
      toDate: new Date(),
    });
  };

  const handleDateChange = (date, dateType) => {
    switch (dateType) {
      case "DATE_FROM":
        setStartDate({ ...startDate, fromDate: date });
        break;
      case "DATE_TO": // edit by Mukul 
        setStartDate({ ...startDate, toDate: date });
        break;
      case "DATE_To": // edit by Mukul 
        setStartDate({ ...startDate, toDate: date });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let brand, country;
    if (criteriaObjects?.length > 0) {
      for (const criteriaObject of criteriaObjects) {
        if (criteriaObject.code === "BRAND_CODES") {
          brand = criteriaObject.items[0]["description"];
        } else if (criteriaObject.code === "COUNTRY_CODE") {
          country = criteriaObject.items[0]["description"];
        } else if (criteriaObject.code === "COMPANY_ID") {
          setDefaultDept(criteriaObject.items[0]["code"]);
        } else if (criteriaObject.code === "ZONE_CODE") {
          setDefaultZone(criteriaObject.items[0]["code"]);
        } else if (criteriaObject.code === "DEPARTMENT_ID") {
          handleChange({
            target: {
              name: "DEPARTMENT_ID",
              value: criteriaObject?.items[0].code,
            },
          });
        }
      }
    }

    let headerData = {
      brand,
      country,
    };
    bindCriteria(null, headerData);
  }, [criteriaObjects]);

  const setDependentList = (
    selectListName,
    selectedValue,
    controllingListName
  ) => {
    //case I - for setting default values on page load
    if (selectedValue) {
      for (const criteriaObject of criteriaObjects) {
        if (criteriaObject.code === controllingListName) {
          let dependentCriteriaItems = criteriaObject?.items.find(
            (x) => x.code == selectedValue
          )?.dependentCriteriaItems;

          let x = document.getElementById(selectListName);
          if (x) {
            //removing previous options
            let length = x.options.length;
            for (let i = length - 1; i >= 0; i--) {
              x.options[i] = null;
            }
            //adding new options
            if (dependentCriteriaItems) {
              for (const dependentCriteriaItem of dependentCriteriaItems) {
                let option = document.createElement("option");
                option.text = dependentCriteriaItem.description;
                option.value = dependentCriteriaItem.code;
                x.add(option);
              }
            }
          }
          return;
        }
      }
    } else {
      //Case - II for setting values on changing the list options
      let x = document.getElementById(selectListName);
      if (x) {
        //removing previous options
        let length = x.options.length;
        for (let i = length - 1; i >= 0; i--) {
          x.options[i] = null;
        }

        //adding new options
        for (const criteriaObject of criteriaObjects) {
          if (criteriaObject.code === controllingListName) {
            let dependentCriteriaItems =
              criteriaObject?.items[0]?.dependentCriteriaItems;
            if (dependentCriteriaItems) {
              for (const dependentCriteriaItem of dependentCriteriaItems) {
                let option = document.createElement("option");
                option.text = dependentCriteriaItem.description;
                option.value = dependentCriteriaItem.code;
                x.add(option);
              }
            }
            return;
          }
        }
      }
    }
  };

  const handleChange = (e) => {
    let { name, value, form } = e.target;

    switch (name) {
      case "REPORT_FORMAT":
        switch (value) {
          case "NATION":
            setDisableList("ALL");
            form["ZONE_CODE"].value = defaultZone;
            form["COMPANY_ID"].value = defaultDept;
            setDisableList("ALL");
            break;
          case "ZONE_WISE":
            form["ZONE_CODE"].value = defaultZone;
            form["COMPANY_ID"].value = defaultDept;
            setDisableList("ZONE");
            break;
          case "DEALERSHIP_WISE":
            form["COMPANY_ID"].value = defaultDept;
            form["ZONE_CODE"].value = defaultZone;
            setDisableList("DEALERSHIP");
            setDependentList("BRANCH_CODE", defaultDept, "COMPANY_ID");
            break;
          default:
            break;
        }
        break;
      case "CATEGORY_ID":
        setDependentList("SUBCATEGORY_ID", value, "CATEGORY_ID");
        break;
      case "DEPARTMENT_ID":
        setDependentList("CATEGORY_ID", value, "DEPARTMENT_ID");
        setDependentList(
          "SUBCATEGORY_ID",
          document.getElementById("CATEGORY_ID")?.value,
          "CATEGORY_ID"
        );
        break;
      case "COMPANY_ID":
        setDependentList("BRANCH_CODE", value, "COMPANY_ID");
      default:
        break;
    }
  };

  const disableDropdownList = (dropdownListName) => {
    switch (dropdownListName) {
      case "ZONE_CODE":
        return disableList === "ALL"
          ? true
          : disableList === "ZONE"
            ? false
            : true;
      case "COMPANY_ID":
        return disableList === "ALL"
          ? true
          : disableList === "DEALERSHIP"
            ? false
            : true;
      default:
        return isCriteriaDisabled;
    }
  };

  const setDefaultValue = (controlName, code) => {
    return code;
  };

  return (
    <aside className={isCriteriaOpen ? "" : "small"}>
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
          {criteriaObjects ? (
            <form>
              <ul className="list-group list-group-flush">
                {criteriaObjects
                  ? criteriaObjects.map((criteriaObject, key) => {
                    if (criteriaObject.objectType === "DROPDOWN") {
                      return (
                        <li className="inbound-list-group-item" key={key}>
                          <div className="row form-group">
                            <div className="col-4 pr-0">
                              <label htmlFor="">{criteriaObject.label}</label>
                            </div>
                            <div className="col-8">
                              <select
                                name={criteriaObject.code}
                                id={criteriaObject.code}
                                className="form-control"
                                defaultValue={setDefaultValue(
                                  criteriaObject.code,
                                  criteriaObject.selectedCode
                                )}
                                disabled={disableDropdownList(
                                  criteriaObject.code
                                )}
                                onChange={(e) => handleChange(e)}
                              >
                                {criteriaObject.items &&
                                  criteriaObject.items.map((item, key) => (
                                    <option key={key} value={item.code}>
                                      {item.description}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </li>
                      );
                    } else if (criteriaObject.objectType === "DATEPICKER") {
                      return (
                        <li className="inbound-list-group-item" key={key}>
                          <div className="row form-group">
                            <div className="col-4 pr-0">
                              <label htmlFor="">{criteriaObject.label}</label>
                            </div>
                            <div className="col-8">
                              <ReactDatePicker
                                className={"form-control"}
                                selected={
                                  criteriaObject.code === "DATE_FROM"
                                    ? startDate.fromDate
                                    : startDate.toDate
                                      || criteriaObject.code === "DATE_TO"
                                      ? startDate.toDate
                                      : startDate.toDate //edit by Mukul    
                                        || criteriaObject.code === "DATE_To"
                                        ? startDate.toDate
                                        : startDate.toDate //edit by Mukul                 
                                }
                                onChange={(date) =>
                                  handleDateChange(date, criteriaObject.code)
                                }
                                closeOnScroll={true}
                                dateFormat="dd-MMM-yyyy"
                                // minDate={new Date().setDate(
                                //   new Date().getDate() - 90
                                // )}  //by Mukul

                                minDate={criteriaObject.code === "DATE_TO" || criteriaObject.code === "DATE_To" ? startDate.fromDate : null} //edit by mukul 

                                maxDate={new Date().setDate(
                                  new Date().getDate()
                                )}
                                name={criteriaObject.code}
                                id={criteriaObject.code}
                                disabled={isCriteriaDisabled}
                              />
                            </div>
                          </div>
                        </li>
                      );
                    } else if (criteriaObject.objectType === "CHECKBOX") {
                      return (
                        <li className="inbound-list-group-item" key={key}>
                          <div className="row form-group">
                            <div className="col-4 pr-0">
                              <label htmlFor="">{criteriaObject.label}</label>
                            </div>
                            <div className="col-8">
                              <input
                                name={criteriaObject.code}
                                type="checkbox"
                                className=""
                                disabled={isCriteriaDisabled}
                              />
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })
                  : ""}
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
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
      </div>
      <div className={(isCriteriaOpen ? "d-none " : "") + "criteria-button"}>
        <span onClick={() => setIsCriteriaOpen(!isCriteriaOpen)}>
          <img src={CriteriaArrow} alt="" />
        </span>
      </div>
    </aside>
  );
};

export default Criteria;
