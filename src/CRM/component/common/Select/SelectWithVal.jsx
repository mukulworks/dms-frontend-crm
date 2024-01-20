import React, { useEffect } from "react";

const SelectWithVal = ({
  label,
  name,
  id,
  selectClassName,
  star,
  emptyOption,
  selectList,
  customRef,
  onChangeFunction,
  defaultValue,
}) => {
  useEffect(() => {
    id == "service.complaintType" &&
      onChangeFunction({ target: { value: defaultValue } });
  }, []);
  return (
    <div className="form-group" key={defaultValue}>
      {label && (
        <label htmlFor="">
          {label}
          {star && <span className={star}>*</span>}
        </label>
      )}
      <select
        name={name}
        id={id}
        className={selectClassName}
        ref={customRef}
        onChange={onChangeFunction}
        defaultValue={defaultValue}
      >
        {emptyOption && <option value="">{emptyOption}</option>}
        {selectList}
      </select>
    </div>
  );
};

export default SelectWithVal;
