import React, { Fragment } from "react";
import Select, { components } from "react-select";
import { Label } from "reactstrap";
import logoDown from "../../assets/images/arrow-down.svg";

const optionssss = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default React.memo((props) => {
  const {
    title,
    options,
    horizontal,
    isRequired,
    dropDownIcon,
    error,
    touched,
    isClearable,
    refs,
    onChange,
    getOptionLabel,
    getOptionValue,
    disabled,
    value,
    onInputChange,
    positionMenu,
    placeholder,
    width40,
    onBlur,
    ...remainProps
  } = props;

  // const customStyles = {
  //   // Nếu có ...provider thì sẽ mặc định style cũ
  //   control: (provided, state) => ({
  //     ...provided,
  //     borderRadius: 5,
  //     // khi bấm
  //     // "&:hover": {
  //     //   borderColor: state.isFocused ? "red" : provided.borderColor,
  //     // }, //
  //     // border: "1px solid lightgray", // default border color
  //     border: "none",
  //     boxShadow: "none",
  //   }),

  //   valueContainer: (provided, state) => {
  //     return {
  //       ...provided,
  //       height: "25px",
  //       padding: "0 6px",
  //       // borderBottom: "1px solid #bfbfbf",
  //     };
  //   },
  //   menu: (provided, state) => ({
  //     ...provided,
  //     zIndex: 200,
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //   }),
  //   input: (provided, state) => ({
  //     ...provided,
  //     margin: "0px",
  //     width: "auto",
  //   }),
  //   indicatorSeparator: (provided, state) => ({
  //     // Thanh phân cách giữa input và nút xuống
  //     display: "none",
  //   }),
  //   indicatorsContainer: (provided, state) => ({
  //     ...provided,
  //   }),
  // };

  const customStyles = {
    // Nếu có ...provider thì sẽ mặc định style cũ
    control: (provided, state) => ({
      ...provided,
      borderColor: "#f8f8f8",
      minHeight: "30px",
      height: "30px",
      boxShadow: state.isFocused
        ? `0 0 0 0.2rem rgba(0, 123, 255, 0.25)`
        : null,
      border: "none",
      background: "#f8f8f8",
      borderRadius: 0,
      borderBottom: "1px solid #bfbfbf",
    }),

    valueContainer: (provided, state) => {
      return {
        ...provided,
        height: "30px",
        padding: "0 6px",
        background: "#f8f8f8",
        // borderBottom: "1px solid #bfbfbf",
        borderBottom: state.isDisabled ? 0 : "1px solid #bfbfbf",
      };
    },
    menu: (provided, state) => ({
      ...provided,
      zIndex: 200,
    }),
    option: (provided, state) => ({
      ...provided,
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      width: "auto",
    }),
    indicatorSeparator: (provided, state) => ({
      // Thanh phân cách giữa input và nút xuống
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      background: "#f8f8f8",
      borderBottom: state.isDisabled ? 0 : "1px solid #bfbfbf",
    }),
    dropdownIndicator: (state) => ({
      // Mũi tên trỏ xuống
      // display: dropDownIcon ? "none" : "block",
      margin: "6px",
      background: "#f8f8f8",
    }),
    loadingIndicator: (provided, state) => ({
      // loading style
      ...provided,
    }),
    singleValue: (provided, state) => ({
      ...provided,
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={logoDown} width="8px" alt="..." />
      </components.DropdownIndicator>
    );
  };
  return (
    <div
      className={`app-select-wrap ${horizontal ? "horizontal" : ""}`}
      style={{ width: width40 ? "40%" : "" }}
    >
      {title ? (
        <label>
          {title} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
      ) : (
        <div style={{ marginTop: "10px" }}></div>
      )}
      <div className="cccd-custom-select">
        <Select
          {...remainProps}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          ref={refs && refs}
          placeholder={placeholder || ""}
          options={options || []}
          isClearable={isClearable === false ? isClearable : true}
          noOptionsMessage={() => "Không có dữ liệu"}
          loadingMessage={() => "Đang tải dữ liệu"}
          menuPosition={positionMenu}
          styles={customStyles}
          onChange={onChange}
          onBlur={onBlur}
          isDisabled={disabled}
          onInputChange={onInputChange}
          value={value}
          components={{ DropdownIndicator }}
        />
        {error && touched && <div className="error">{error}</div>}
      </div>
    </div>
    // <div style={{}}>
    //   {/* {title && (
    //     <label className="mt-1">
    //       {title} {isRequired && <span className="required">*</span>}
    //     </label>
    //   )} */}
    //   {title && (
    //     <Label className="form-label mt-1 title-label">
    //       {title} {isRequired && <span className="error">*</span>}
    //     </Label>
    //   )}

    //   <div
    //     style={{
    //       marginTop: !title ? "33px" : "auto",
    //       borderColor: "coral",
    //       backgroundColor: error ? "#ff715b" : "#ced4da",
    //       borderRadius: 5,
    //       padding: "1px",
    //       position: "relative",
    //       bottom: "1px",
    //     }}
    //   >
    //     <Select
    //       getOptionLabel={getOptionLabel}
    //       getOptionValue={getOptionValue}
    //       ref={refs && refs}
    //       placeholder={placeholder || ""}
    //       options={options || []}
    //       isClearable={isClearable === false ? isClearable : true}
    //       noOptionsMessage={() => "Không có dữ liệu"}
    //       loadingMessage={() => "Đang tải dữ liệu"}
    //       menuPosition={positionMenu}
    //       styles={customStyles}
    //       onChange={onChange}
    //       isDisabled={disabled}
    //       onInputChange={onInputChange}
    //       value={value}
    //     />
    //   </div>
    //   {error && <div className="error">{error}</div>}
    // </div>
  );
});
