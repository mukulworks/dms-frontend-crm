import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as constants from "../../../../../../../utils/constant";
import AllotedDealer from "./AllotedDealer/AllotedDealer";
const CallerInformation = ({
  states,
  selectedRecord,
  searchRecord,
  setStateCode,
  isAllotedControlActive,
  setIsAllotedControlActive,
  stateCode,
  dealers,
  showAllotedDealer,
  searchValue,
  custTitles,
}) => {
  const { register, errors } = useFormContext();
  const [cityList, setCityList] = useState([]);
  const [searchByValue, setSearchByValue] = useState("");
  const validate = {
    callerInfo: {
      callerName: {
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      mobile: {
        required: true,
        minLength: 10,
        maxLength: 10,
      },
      email: {
        required: true,
        pattern:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        minLength: 2,
        maxLength: 100,
      },
      address1: {
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      address2: {
        required: false,
        minLength: 2,
        maxLength: 100,
      },
      state: {
        required: true,
      },
      city: {
        required: true,
      },
      pinCode: {
        required: true,
        min: 100000,
        max: 999999,
      },
    },
  };

  const hasError = (inputName) =>
    Boolean(errors && errors["callerInfo"] && errors["callerInfo"][inputName]);
  const getError = (inputName) =>
    Boolean(hasError(inputName) ? errors["callerInfo"][inputName].message : "");

  const defaultInputValues = (inputCode) => {
    let defaultValue;
    switch (inputCode) {
      case constants.CALLER_NAME:
        switch (searchRecord && searchRecord.searchType) {
          case constants.PROSPECTS:
          case constants.ORDERS:
          case constants.CASES:
            if (selectedRecord !== undefined) {
              if (selectedRecord.customerFirstName !== null) {
                defaultValue = selectedRecord.customerFirstName;
                return defaultValue;
              }
            }
            break;
          default:
            break;
        }
        break;
      case constants.CALLER_MOBILE:
        switch (searchRecord && searchRecord.searchType) {
          case constants.PROSPECTS:
          case constants.ORDERS:
          case constants.CASES:
            if (selectedRecord !== undefined) {
              if (selectedRecord.customerMobile !== null) {
                defaultValue = selectedRecord.customerMobile;
                return defaultValue;
              }
            }
            break;
          default:
            if (searchValue.type == "MOBILE") {
              return searchValue.val;
            }
            break;
        }
        break;
      case constants.CALLER_EMAIL:
        switch (searchRecord && searchRecord.searchType) {
          case constants.PROSPECTS:
          case constants.ORDERS:
          case constants.CASES:
            if (selectedRecord !== undefined) {
              if (selectedRecord.customerEmail !== null) {
                defaultValue = selectedRecord.customerEmail;
                return defaultValue;
              }
            }
            break;
          default:
            if (searchValue.type == "EMAIL") {
              return searchValue.val;
            }
            break;
        }
        break;
      default:
        return "";
    }
  };
  const fetchCitiesByState = (e) => {
    if (e.target.value !== "") {
      let stateCode = e.target.value;
      if (states !== undefined && states !== null) {
        let cities = states.find((state) => {
          return state.code === stateCode;
        }).cities;
        setStateCode(stateCode);
        setCityList(cities);
      }
    } else {
      setCityList([]);
    }
  };

  const handleChange = (e) => {
    let { value } = e.target;
    if (value.length < 7) {
      setSearchByValue(value);
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">Caller Information</div>
        <div className="card-body p-1">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Name<span className="star">*</span>
            </label>
            <div className="row">
              <div className="col-3 pr-0 text-left">
                <select
                  name="callerInfo.custTitle"
                  id="callerInfo.custTitle"
                  className="form-control"
                  ref={register}
                >
                  {custTitles?.map((title) => {
                    return <option value={title.code}>{title.code}</option>;
                  })}
                </select>
              </div>
              <div
                className="col-9"
                key={defaultInputValues(constants.CALLER_NAME)}
              >
                <input
                  name="callerInfo.custName"
                  type="text"
                  className={
                    "form-control" + (hasError("custName") ? " is-invalid" : "")
                  }
                  id="callerInfo.custName"
                  autoComplete="disable"
                  defaultValue={defaultInputValues(constants.CALLER_NAME)}
                  placeholder="Enter Caller Name"
                  ref={register(validate.callerInfo.callerName)}
                  autoComplete="nope"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Mobile<span className="star">*</span>
            </label>
            <div className="row">
              <div className="col-2 pr-0 text-left">
                <input
                  name="callerInfo.custPhoneCountryCode"
                  type="text"
                  className="form-control"
                  value="+91"
                  readOnly
                  ref={register}
                />
              </div>
              <div
                className="col-10"
                key={defaultInputValues(constants.CALLER_MOBILE)}
              >
                <input
                  name="callerInfo.custMobile"
                  type="text"
                  className={
                    "form-control" +
                    (hasError("custMobile") ? " is-invalid" : "")
                  }
                  id="callerInfo.custMobile"
                  autoComplete="disable"
                  placeholder="Enter Caller Mobile No."
                  defaultValue={defaultInputValues(constants.CALLER_MOBILE)}
                  ref={register(validate.callerInfo.mobile)}
                  maxLength={10}
                  autoComplete="nope"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Email<span className="star">*</span>
            </label>
            <div key={defaultInputValues(constants.CALLER_EMAIL)}>
              <input
                name="callerInfo.email"
                type="text"
                className={
                  "form-control" + (hasError("email") ? " is-invalid" : "")
                }
                id="callerInfo.email"
                autoComplete="disable"
                placeholder="Enter Caller Email"
                defaultValue={defaultInputValues(constants.CALLER_EMAIL)}
                ref={register(validate.callerInfo.email)}
                autoComplete="nope"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Address<span className="star">*</span>
            </label>
            <div key={defaultInputValues(constants.CALLER_ADDRESS1)}>
              <input
                ref={register(validate.callerInfo.address1)}
                name="callerInfo.custAddress1"
                type="text"
                autoComplete="disable"
                className={
                  "form-control" +
                  (hasError("custAddress1") ? " is-invalid" : "")
                }
                placeholder="Enter Address"
                defaultValue={defaultInputValues(constants.CALLER_ADDRESS1)}
                autoComplete="nope"
              />
            </div>
          </div>
          <div className="form-group">
            <div key={defaultInputValues(constants.CALLER_ADDRESS2)}>
              <input
                ref={register(validate.callerInfo.address2)}
                name="callerInfo.custAddress2"
                type="text"
                autoComplete="disable"
                className={
                  "form-control" +
                  (hasError("custAddress2") ? " is-invalid" : "")
                }
                placeholder="Enter Address"
                defaultValue={defaultInputValues(constants.CALLER_ADDRESS2)}
                autoComplete="nope"
              />
            </div>
          </div>
          <div className="form-group">
            <div key={defaultInputValues(constants.CALLER_ADDRESS3)}>
              <input
                ref={register}
                name="callerInfo.custAddress3"
                type="text"
                autoComplete="disable"
                className="form-control"
                placeholder="Enter Address"
                defaultValue={defaultInputValues(constants.CALLER_ADDRESS3)}
                autoComplete="nope"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              State<span className="star">*</span>
            </label>
            <div key={defaultInputValues(constants.STATE)}>
              <select
                ref={register(validate.callerInfo.state)}
                name="callerInfo.custStateCode"
                id="callerInfo.custStateCode"
                className={
                  "form-control" +
                  (hasError("custStateCode") ? " is-invalid" : "")
                }
                defaultValue={defaultInputValues(constants.STATE)}
                onChange={fetchCitiesByState}
              >
                <option value="">Select State</option>
                {states &&
                  states.map((state, key) => (
                    <option value={state.code} key={key}>
                      {state.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              City<span className="star">*</span>
            </label>
            <div key={defaultInputValues(constants.CITY)}>
              <select
                ref={register(validate.callerInfo.city)}
                name="callerInfo.custCityCode"
                id="callerInfo.custCityCode"
                className={
                  "form-control" +
                  (hasError("custCityCode") ? " is-invalid" : "")
                }
                defaultValue={defaultInputValues(constants.CITY)}
              >
                <option value="">Select City</option>
                {cityList &&
                  cityList.map((city, key) => (
                    <option value={city.city} key={key}>
                      {city.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div
            className="form-group"
            key={defaultInputValues(constants.CALLER_ADDRESS3)}
          >
            <label htmlFor="exampleInputEmail1">
              Pin Code<span className="star">*</span>
            </label>
            <input
              ref={register(validate.callerInfo.pinCode)}
              name="callerInfo.custPincode"
              type="TEXT"
              autoComplete="disable"
              className={
                "form-control" + (hasError("custPincode") ? " is-invalid" : "")
              }
              placeholder="Enter Caller Pin Code"
              // defaultValue={defaultInputValues(constants.PINCODE)}
              // value={searchByValue}
              onChange={handleChange}
              autoComplete="nope"
              maxLength={6}
            />
          </div>
          {showAllotedDealer ? (
            <AllotedDealer
              dealers={dealers}
              isAllotedControlActive={isAllotedControlActive}
              setIsAllotedControlActive={setIsAllotedControlActive}
              stateCode={stateCode}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CallerInformation;
