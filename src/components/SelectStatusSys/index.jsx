import React, { memo, useEffect, useState } from "react";
import SelectComponents from "../SelectComponents";
import { apiBenhVien, apiDichVu } from "../../services/apiFunction/DanhMuc";
import { ArrayMessageInvoice } from "../../common/data/message-invoice";

export default memo((props) => {
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
    setLoading(true);
    const result = ArrayMessageInvoice.reduce((pre, curr) => {
      const nObj = {}
      for (let [key, value] of Object.entries(curr)) {
        if (key !== "MESS") {
          Object.assign(nObj, { ["code"]: value })
          Object.assign(nObj, { ["name"]: key })
        } else {
          Object.assign(nObj, { ["MESS"]: value })
        }
      }
      return [...pre, nObj]
    }, [])
    setData(result)
    setLoading(false)
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
            getOptionLabel={(item) => `${item.MESS}`}
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
