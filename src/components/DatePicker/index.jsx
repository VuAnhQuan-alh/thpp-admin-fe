import enGB from "date-fns/locale/en-GB";
import vi from "date-fns/locale/vi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import MaskedTextInput from "react-text-mask";
import dateLogo from "../../assets/images/date.svg";
import 'react-datepicker/dist/react-datepicker.css';

// interface Props extends ReactDatePickerProps {
//   title?: string;
//   horizontal?: boolean;
//   defaultDate?: any;
//   isRequired?: any;
//   noLabel?: any;
//   field?: any;
//   form?: any;
//   disabled?: boolean;
// }

const DATE_FORMAT = "DD_MM_YYYY";

export default React.memo((props) => {
  const {
    title,
    noLabel,
    isRequired,
    horizontal,
    defaultDate,
    field,
    form,
    disabled,
    className,
    placeholder,
    style,
    currentLanguage,
    ...remainProps
  } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultDate);
  }, [defaultDate]);

  useEffect(() => {
    setValue(field?.value || "");
  }, [field?.value]);

  const onChangeCalendarSelected = (dateSelected) => {
    if (field) {
      form.setFieldValue(
        field?.name,
        dateSelected ? moment(dateSelected).format("YYYY-MM-DD") : ""
      );
    }
    setValue(moment(dateSelected).format("YYYY-MM-DD"));
    setOpen(false);
  };

  const processDateInput = (value) => {
    if (value && value.length === 10 && !value.includes("_")) {
      const dateInput = moment(value, DATE_FORMAT);
      if (dateInput.isValid()) {
        if (remainProps.minDate && dateInput.isBefore(remainProps.minDate)) {
          return moment(remainProps.minDate).format("YYYYMMDD");
        }
        if (remainProps.maxDate && dateInput.isAfter(remainProps.maxDate)) {
          return moment(remainProps.maxDate).format("YYYYMMDD");
        }
        return value;
      } else {
        return "";
      }
    }
    return value;
  };

  const onBlurCheckDate = (value) => {
    if (value.includes("_")) {
      return "";
    }
    return value;
  };

  return (
    <div className="date-picker-container" style={style}>
      <div className="app-date-picker-wrap">
        {title ? (
          <label>
            {title || ""}{" "}
            {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
        ) : (
          <div style={{ marginTop: "10px" }}> </div>
        )}
        <div className="datepicker-content">
          <MaskedTextInput
            {...field}
            name={field.name}
            placeholder={placeholder || ""}
            disabled={disabled}
            type="text"
            autoComplete="off"
            value={field.value}
            maxLength={11}
            className={`${
              form.errors[field.name] &&
              form.touched[field.name] &&
              "is-invalid"
            }`}
            mask={[/\d/, /\d/, /\d/, /\d/,"-", /\d/, /\d/, "-",/\d/, /\d/ ]}
            onChange={(e) => {
              form.setFieldValue(field.name, processDateInput(e.target.value));
              setValue(processDateInput(e.target.value));
              setOpen(false);
            }}
            onBlur={(e) => {
              form.setFieldValue(field.name, onBlurCheckDate(e.target.value));
              setValue(onBlurCheckDate(e.target.value));
            }}
            onClick={() => {
              setOpen(true);
            }}
          />
          <label>
            <span
              className="calender-icon"
              onClick={() => !disabled && setOpen(true)}
            >
              <img src={dateLogo} height="12px" width="12px" alt="" />
            </span>
          </label>

          {form?.errors[field.name] && form.touched[field.name] && (
            <div className="error">{form.errors[field.name]}</div>
          )}
        </div>
      </div>

      <DatePicker
        {...field}
        {...remainProps}
        dateFormat="yyyy-MM-dd"
        onClickOutside={() => setOpen(false)}
        open={open}
        selected={
          !moment(value, "YYYY-MM-DD").isValid()
            ? null
            : moment(value, "YYYY-MM-DD").toDate()
        }
        className="datePicker-input"
        disabled={disabled}
        autoComplete="off"
        onChange={onChangeCalendarSelected}
        // popperPlacement="bottom-end"
        // popperContainer={Portal}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        locale={currentLanguage == "en" ? enGB : vi}

        // popupStyle={{
        //   position: "inherit !solid",
        //   left: "0px",
        //   transform: "translate(130px, 0px)",
        // }}
      />
    </div>
  );
});
