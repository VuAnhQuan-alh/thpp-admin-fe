import React, { Fragment, useState } from "react";
import { Label } from "reactstrap";

const InputField = (props) => {
  const {
    form,
    field,
    maxLength,
    placeholder,
    type,
    label,
    disabled,
    onChangeCustomize,
    onKeyDown,
    style,
    invalid,
    className,
    isRequired,
    setOnBlur,
    formatNumber,
    width40,
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;

  const format = (n) => {
    if (!n) return "";
    return n?.replace(/\D/g, "")?.replace(/\B(?=(\d{3})+(?!\d))/g, "").trim();
  };

  return (
    <div className={`app-input-wrap `} style={{ width: width40 ? "40%" : "" }}>
      {label ? (
        <label>
          {label} {isRequired && <span className="error">*</span>}
        </label>
      ) : (
        <div style={{ marginTop: "10px" }}></div>
      )}

      <input
        {...field}
        style={style}
        className={`${className} form-control ${
          errors[name] && touched[name] && "is-invalid"
        }`}
        onChange={onChangeCustomize || field.onChange}
        type={type}
        id={name}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        invalid={invalid || (!!errors[name] && touched[name])}
        onKeyDown={onKeyDown}
        // onBlur={() => setOnBlur && setOnBlur(true)}
        // onFocus={() => setOnBlur && setOnBlur(false)}
        value={formatNumber ? format(value?.toString()) : value}
      />
      {errors[name] && touched[name] && (
        <div className="error">{errors[name]}</div>
      )}
    </div>
    // </div>
  );
};

InputField.defaultProps = {
  type: "text",
  tabIndex: "0",
  invalid: "false",
};

export default InputField;
