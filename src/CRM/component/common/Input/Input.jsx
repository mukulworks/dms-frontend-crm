import React, { useEffect } from "react";

const Input = ({
  label,
  name,
  type,
  inputClassName,
  star,
  id,
  autoComplete,
  placeholder,
  customRef,
  value,
  disabled,
  readOnly,
}) => {
  const [val, setValue] = React.useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor="exampleInputEmail1">
          {label}
          {star && <span className={star}>*</span>}
        </label>
      )}
      <div>
        <input
          name={name}
          type={type}
          className={inputClassName}
          id={id}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={customRef}
          value={val}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Input;
