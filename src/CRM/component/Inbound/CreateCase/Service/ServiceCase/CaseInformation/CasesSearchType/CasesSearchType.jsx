import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkServiceActiveCases,
  custHistoryByIdentification,
  fillCallerInformation,
} from "../../../../../../../store/actions/inboundActions";
import * as constants from "../../../../../../../../utils/constant";

const CasesSearchType = ({ type }) => {
  const dispatch = useDispatch();
  const [toggleSearchBy, setToggleSearchBy] = useState(constants.REGISTRATION);
  const [searchByValue, setSearchByValue] = useState({
    regPrefix: "",
    regSuffix: "",
    vin: "",
    mobile: "",
  });
  const [isValidated, setIsValidated] = useState(false);
  const [errorComment, setErrorComment] = useState("");

  const checkValidations = (name, value) => {
    switch (name) {
      case "R":
        if (value.regPrefix.length <= 0 || value.regSuffix.length <= 0) {
          setIsValidated(false);
          setErrorComment("Please enter Valid Registration Number");
          return false;
        } else {
          setIsValidated(true);
          return true;
        }
      case "V":
        if (value.vin.length !== 17) {
          setIsValidated(false);
          setErrorComment("VIN should be of length 17.");
          return false;
        } else {
          setIsValidated(true);
          return true;
        }
      case "M":
        if (value.mobile.length !== 10) {
          setIsValidated(false);
          setErrorComment("Mobile should be of length 10.");
          return false;
        } else {
          setIsValidated(true);
          return true;
        }
      default:
        return false;
    }
  };

  const fetchCustHistoryDetails = () => {
    let departmentCode = "SERVICE";
    let name =
      toggleSearchBy === constants.VIN
        ? constants.V
        : toggleSearchBy === constants.REGISTRATION
        ? constants.R
        : toggleSearchBy === constants.MOBILE
        ? constants.M
        : null;
    let valid = checkValidations(name, searchByValue);

    let value = null;
    if (name === constants.R) {
      value = searchByValue.regPrefix + "-" + searchByValue.regSuffix;
    } else if (name == constants.V) {
      value = searchByValue.vin;
    } else if (name == constants.M) {
      value = searchByValue.mobile;
    }

    let data = {
      name: name,
      value: value,
      departmentCode: departmentCode,
    };
    if (valid) {
      if (data.value && data.value !== "") {
        dispatch(checkServiceActiveCases(data));
        dispatch(custHistoryByIdentification(data));
        let payload = {
          searchType: constants.JOB_CARD_DETAILS,
          data: data,
        };
        dispatch(fillCallerInformation(payload));
      }
    }
  };
  // e.target.form.reset()
  // var code = event.keyCode || event.which;
  // if(code === 13) { //13 is the enter keycode
  //Do stuff in here
  // }

  const handleClick = (searchByType) => {
    setToggleSearchBy(searchByType);
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
              id="searchbyservices1"
              defaultChecked
              name="search-by-services"
              onClick={() => handleClick(constants.REGISTRATION)}
            />
            <label className="custom-control-label" htmlFor="searchbyservices1">
              Registration
            </label>
          </div>
          <div className="custom-control custom-radio form-check-inline">
            <input
              type="radio"
              className="custom-control-input"
              id="searchbyservices2"
              name="search-by-services"
              onClick={() => handleClick(constants.VIN)}
            />
            <label className="custom-control-label" htmlFor="searchbyservices2">
              VIN
            </label>
          </div>
          <div className="custom-control custom-radio form-check-inline">
            <input
              type="radio"
              className="custom-control-input"
              id="searchbyservices3"
              name="search-by-services"
              onClick={() => handleClick(constants.MOBILE)}
            />
            <label className="custom-control-label" htmlFor="searchbyservices3">
              Mobile
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row is-invalid" id="searchBys">
          {toggleSearchBy === constants.REGISTRATION ? (
            <>
              <div className="col-5 text-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Reg 1"
                  value={searchByValue.regPrefix}
                  onChange={(e) =>
                    setSearchByValue({
                      ...searchByValue,
                      regPrefix: e.target.value,
                    })
                  }
                  autoComplete="disable"
                />
              </div>
              <div className="col-5 pl-0">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter Reg 2"
                  value={searchByValue.regSuffix}
                  onChange={(e) =>
                    setSearchByValue({
                      ...searchByValue,
                      regSuffix: e.target.value,
                    })
                  }
                  autoComplete="disable"
                />
              </div>
            </>
          ) : toggleSearchBy === constants.VIN ? (
            <div className="col-10 pl-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Caller VIN"
                value={searchByValue.vin}
                onChange={(e) =>
                  setSearchByValue({ ...searchByValue, vin: e.target.value })
                }
                autoComplete="disable"
              />
            </div>
          ) : toggleSearchBy === constants.MOBILE ? (
            <div className="col-10 pl-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Caller Mobile"
                value={searchByValue.mobile}
                onChange={(e) =>
                  setSearchByValue({ ...searchByValue, mobile: e.target.value })
                }
                maxLength={10}
                autoComplete="disable"
              />
            </div>
          ) : null}
          <div className="col-1 px-0 text-center">
            <button
              type="button"
              name=""
              id="serviceSearchButton"
              className="btn btn-success btn-lg btn-block p-1 ml-2"
              onClick={fetchCustHistoryDetails}
              accessKey="s"
            >
              &#128269;
            </button>
          </div>
        </div>
        {isValidated ? null : (
          <div id="validationServer03Feedback" className="invalid-feedback">
            {errorComment}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CasesSearchType;
