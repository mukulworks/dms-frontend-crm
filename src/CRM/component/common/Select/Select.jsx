import React from "react";

const Select = ({
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
        defaultValue={emptyOption}
      >
        <option value="">{emptyOption}</option>
        {selectList}
      </select>
    </div>
  );
};

export default Select;
