import React, { memo, useEffect, useState } from "react";
import SelectComponents from "../SelectComponents";
import { OptionTypeBase, Props as SelectProps } from "react-select";

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
}

export default memo((props: Props) => {
  const {
    title,
    defaultValue,
    isFormik,
    form,
    field,
    disabled,
    ...remainProps
  } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dmDV = async () => {
    setData([
      { code: 1, name: "Mobile" },
      { code: 2, name: "Website" }
    ]);
  };

  useEffect(() => {
    dmDV();
  }, []);

  const selectedOption =
    field && data?.find((option) => option?.code === field?.value);
  const selectedDefault = data?.find(
    (option) => option?.values === defaultValue
  );

  const patchedOnChange = (selectedOption) => {
    //
    const selectedValue = selectedOption ? selectedOption.code : selectedOption;

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
            id={field.name}
            isLoading={loading}
            title={title}
            value={selectedOption || ""}
            onChange={patchedOnChange}
            options={data}
            getOptionLabel={(item) => `${item.name}`}
            getOptionValue={(item) => item.code}
            error={form.errors[field.name]}
            {...remainProps}
            disabled={disabled}
          />
        </>
      );
    }

    return (
      <SelectComponents
        isLoading={loading}
        options={data}
        title={props.title}
        value={selectedDefault}
        getOptionLabel={(item) => `${item.tenDayDu}`}
        getOptionValue={(item) => item.id}
        {...remainProps}
      />
    );
  };
  return renderSelectType();
});
