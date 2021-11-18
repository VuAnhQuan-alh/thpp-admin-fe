/*
 * /api/danh-muc-dan-toc
 * danh mục đơn vị
 */
import React, { memo, useEffect, useState } from "react";
import SelectComponents from "../SelectComponents";
import { OptionTypeBase, Props as SelectProps } from "react-select";

import { toString } from "lodash";

interface Props extends SelectProps<OptionTypeBase> {
  title?: string;
  horizontal?: boolean;
  options?: Array<{
    label: string,
    value: any,
  }>;
  dropDownIcon?: boolean;
  isFormik?: boolean;
  defaultValue?: any;
  disabled?: any;
  form?: any;
  field?: any;
  placeholder?: string;
  width40?: string;
}
export default memo((props: Props) => {
  const {
    title,
    defaultValue,
    isFormik,
    form,
    field,
    options,
    disabled,
    placeholder,
    width40,
    ...remainProps
  } = props;

  const { name, value } = field;
  const { errors, touched } = form;

  const selectedOption =
    field &&
    options.find((option) => toString(option?.value) === toString(value));

  const patchedOnChange = (selectedOption) => {
    //
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;

    const changeEvent = {
      target: {
        name: field.name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };

  const renderSelectType = () => {
    if (field) {
      return (
        <>
          <SelectComponents
            {...field}
            title={title}
            value={selectedOption || ""}
            width40={width40}
            placeholder={placeholder || ""}
            onChange={patchedOnChange}
            disabled={disabled}
            error={form.touched[field.name] && form.errors[field.name]}
            options={options}
            {...remainProps}
          />
        </>
      );
    }
  };
  return renderSelectType();
});
