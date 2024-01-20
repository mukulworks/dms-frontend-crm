import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const Row = ({
  index,
  label,
  value,
  originalValue,
  actualValue,
  inputRule,
  dropdownLists,
  flagVerified,
  textResponse,
  paramUniqueId,
}) => {
  const [verified, setVerified] = useState(flagVerified === "N" ? false : true);

  const handleFlagVerified = (flag) => {
    if (verified === true) {
      return "Y";
    } else if (verified === false) {
      return "N";
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">{label}</div>
        <div className="col-2 font-weight-bold font-12">{originalValue}</div>
        <div className="col-3 font-weight-bold font-12">{value}</div>
        <div className="col-2">
          <span className="radio-button">
            <input
              type="radio"
              name={`${label}[${index}]-verified`}
              onClick={() => setVerified(true)}
              defaultChecked={flagVerified === "Y" && true}
            />
            <span></span>
          </span>
          <span className="radio-button close-button">
            <input
              type="radio"
              name={`${label}[${index}]-verified`}
              onClick={() => setVerified(false)}
              defaultChecked={flagVerified === "N" && true}
            />
            <span></span>
          </span>
        </div>
        <div className="col-2">
          {verified === false && inputRule === "TEXT_BOX" ? (
            <TextBox
              index={index}
              paramUniqueId={paramUniqueId}
              flagVerified={handleFlagVerified(flagVerified)}
              actualValue={value}
              isVisible={verified}
            />
          ) : verified === false && inputRule === "COMBO" ? (
            <Dropdown
              index={index}
              paramUniqueId={paramUniqueId}
              flagVerified={handleFlagVerified(flagVerified)}
              actualValue={value}
              dropdownLists={dropdownLists}
              isVisible={verified}
            />
          ) : null}
          {verified === true && inputRule === "TEXT_BOX" ? (
            <TextBox
              index={index}
              paramUniqueId={paramUniqueId}
              flagVerified={handleFlagVerified(flagVerified)}
              actualValue={value}
              isVisible={verified}
            />
          ) : verified === true && inputRule === "COMBO" ? (
            <Dropdown
              index={index}
              paramUniqueId={paramUniqueId}
              flagVerified={handleFlagVerified(flagVerified)}
              actualValue={value}
              dropdownLists={dropdownLists}
              isVisible={verified}
            />
          ) : null}
        </div>
      </div>
      <hr className="mb-1 mt-0" />
    </React.Fragment>
  );
};

export default Row;

const TextBox = ({
  index,
  paramUniqueId,
  flagVerified,
  actualValue,
  isVisible,
}) => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <input
        name={`verificationParamCodes[${index}].textResponse`}
        id={`verificationParamCodes[${index}].textResponse`}
        className="form-control"
        ref={register()}
        type="text"
        hidden={isVisible}
      />
      <input
        name={`verificationParamCodes[${index}].paramUniqueId`}
        id={`verificationParamCodes[${index}].paramUniqueId`}
        ref={register()}
        hidden
        type="text"
        defaultValue={paramUniqueId}
      />
      <input
        name={`verificationParamCodes[${index}].flagVerified`}
        id={`verificationParamCodes[${index}].flagVerified`}
        ref={register()}
        hidden
        type="text"
        defaultValue={flagVerified}
      />
      <input
        name={`verificationParamCodes[${index}].actualResponse`}
        id={`verificationParamCodes[${index}].actualResponse`}
        ref={register()}
        hidden
        type="text"
        defaultValue={actualValue}
      />
    </div>
  );
};

const Dropdown = ({
  index,
  paramUniqueId,
  flagVerified,
  actualValue,
  dropdownLists,
  isVisible,
}) => {
  const { register } = useFormContext();
  return (
    <div className="form-group">
      {isVisible ? (
        <select
          name={`verificationParamCodes[${index}].textResponse`}
          id={`verificationParamCodes[${index}].textResponse`}
          className="form-control"
          ref={register()}
          hidden={isVisible}
        >
          <option value=""></option>
        </select>
      ) : (
        <select
          name={`verificationParamCodes[${index}].textResponse`}
          id={`verificationParamCodes[${index}].textResponse`}
          className="form-control"
          ref={register()}
          hidden={isVisible}
        >
          {dropdownLists &&
            dropdownLists.map((dropdownList, key) => (
              <option value={dropdownList.code} key={key}>
                {dropdownList.description}
              </option>
            ))}
        </select>
      )}
      <select
        name={`verificationParamCodes[${index}].paramUniqueId`}
        id={`verificationParamCodes[${index}].paramUniqueId`}
        ref={register()}
        hidden
      >
        <option value={paramUniqueId}></option>
      </select>
      <select
        name={`verificationParamCodes[${index}].flagVerified`}
        id={`verificationParamCodes[${index}].flagVerified`}
        ref={register()}
        hidden
      >
        <option value={flagVerified}></option>
      </select>
      <select
        name={`verificationParamCodes[${index}].actualResponse`}
        id={`verificationParamCodes[${index}].actualResponse`}
        ref={register()}
        hidden
      >
        <option value={actualValue}></option>
      </select>
    </div>
  );
};
