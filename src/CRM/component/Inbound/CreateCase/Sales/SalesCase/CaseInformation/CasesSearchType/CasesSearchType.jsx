import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkSalesActiveCases,
  custHistoryByIdentification,
} from "../../../../../../../store/actions/inboundActions";
import * as constants from "../../../../../../../../utils/constant";

const CasesSearchType = ({ type, setCalledFrom, setSearchValue }) => {
  const dispatch = useDispatch();
  const [toggleSearchBy, setToggleSearchBy] = useState(constants.MOBILE);
  const [searchByValue, setSearchByValue] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [errorComment, setErrorComment] = useState("");

  const handleClick = (type) => {
    setSearchByValue("");
    setSearchValue({ type: "", val: "" });
    setToggleSearchBy(type);
    setErrorComment(""); //it empties the error comment on switching the mobile/email/vin
  };

  const checkValidations = (name, value) => {
    switch (name) {
      case constants.MOBILE:
        name = constants.MOBILE;
        if (value.length < 10 || value.length > 10) {
          setIsValidated(false);
          setErrorComment("Mobile No. should be of length 10.");
          return false;
        } else {
          setIsValidated(true);
          return true;
        }
      case constants.EMAIL:
        name = constants.EMAIL;
        var pattern = new RegExp(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
        if (pattern.test(value)) {
          setIsValidated(true);
          return true;
        } else {
          setIsValidated(false);
          setErrorComment("Please enter valid email.");
          return false;
        }
      case "V":
        name = "V";
        if (value.length !== 17) {
          setIsValidated(false);
          setErrorComment("VIN should be of length 17.");
          return false;
        } else {
          setIsValidated(true);
          return true;
        }
      default:
        return false;
    }
  };

  const fetchCustHistoryDetails = (event) => {
    setCalledFrom(searchByValue);
    let value = searchByValue;
    let name = toggleSearchBy === constants.VIN ? "V" : toggleSearchBy;
    let departmentCode = constants.PRESALES;

    let valid = checkValidations(name, value);

    let data = {
      name: name,
      value: value,
      departmentCode: departmentCode,
    };
    if (valid) {
      if (data.value && data.value !== "") {
        dispatch(checkSalesActiveCases(data));
        dispatch(custHistoryByIdentification(data));
      }
    }
  };

  //handlechange function is used to restrict the user to enter limited number of counts in text box for mobile/VIN
  const handleChange = (name, e) => {
    let { value } = e.target;
    switch (name) {
      case constants.MOBILE:
        name = constants.MOBILE;
        if (value.length < 11) {
          setSearchValue({ type: "MOBILE", val: value });
          setSearchByValue(value);
          setCalledFrom(value);
          return true;
        } else {
          setIsValidated(false);
          setErrorComment("Mobile No. should be of length 10.");
          return false;
        }
      case "V":
        if (value.length < 18) {
          setSearchByValue(value);
          return true;
        } else {
          setIsValidated(false);
          setErrorComment("VIN should be of length 17.");
          return false;
        }
      default:
        return false;
    }
  };

  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="">Search</label>
        <div className="custom-radio-btn">
          <div className="custom-control custom-radio form-check-inline">
            <input
              type="radio"
              className="custom-control-input"
              id={type + "1"}
              defaultChecked
              name={type + "search-by"}
              onClick={() => handleClick(constants.MOBILE)}
            />
            <label className="custom-control-label" htmlFor={type + "1"}>
              Mobile
            </label>
          </div>
          <div className="custom-control custom-radio form-check-inline">
            <input
              type="radio"
              className="custom-control-input"
              id={type + "2"}
              name={type + "search-by"}
              onClick={() => handleClick(constants.EMAIL)}
            />
            <label className="custom-control-label" htmlFor={type + "2"}>
              Email
            </label>
          </div>
          <div className="custom-control custom-radio form-check-inline">
            <input
              type="radio"
              className="custom-control-input"
              id={type + "3"}
              name={type + "search-by"}
              onClick={() => handleClick(constants.VIN)}
            />
            <label className="custom-control-label" htmlFor={type + "3"}>
              VIN
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row is-invalid" id={type + "searchBy"}>
          {toggleSearchBy === constants.MOBILE ? (
            <>
              <div className="col-3 text-center">
                <input
                  type="text"
                  className="form-control"
                  value="+91"
                  readOnly
                />
              </div>
              <div className="col-7 pl-0">
                <input
                  name={type + ".mobile"}
                  value={searchByValue}
                  onChange={(e) => handleChange(constants.MOBILE, e)}
                  type="number"
                  className="form-control"
                  placeholder="Enter Caller Mobile No."
                  id={type + "-searchArea"}
                  autoComplete="disable"
                />
              </div>
            </>
          ) : toggleSearchBy === constants.EMAIL ? (
            <div className="col-10 pl-3">
              <input
                name={type + ".email"}
                value={searchByValue}
                onChange={(e) => {
                  setSearchValue({ type: "EMAIL", val: e.target.value });
                  setSearchByValue(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Enter Caller Email"
                id={type + "-searchArea"}
                autoComplete="disable"
              />
            </div>
          ) : toggleSearchBy === constants.VIN ? (
            <div className="col-10 pl-3">
              <input
                name={type + ".vin"}
                value={searchByValue}
                onChange={(e) => handleChange("V", e)}
                type="text"
                className="form-control"
                placeholder="Enter Caller VIN"
                id={type + "-searchArea"}
                autoComplete="disable"
              />
            </div>
          ) : null}
          <div className="col-2 pl-0 text-center">
            <button
              type="button"
              name={type + "button"}
              id={type + "searchButton"}
              className="btn btn-success btn-lg btn-block p-1"
              onClick={fetchCustHistoryDetails}
              accessKey="s"
            >
              &#128269;
            </button>
          </div>
        </div>
        {isValidated ? null : (
          <div
            id={type + "validationServer03Feedback"}
            className="invalid-feedback"
          >
            {errorComment}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CasesSearchType;
