/*
 * /api/danh-muc-dan-toc
 * danh mục đơn vị
 */
import React, { memo, useEffect, useState } from "react";
import SelectComponents from "../SelectComponents";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import { apiBenhVien, apiDichVu } from "../../services/apiFunction/DanhMuc";
import { checkCallAPI } from "../../helpers/functions";

// import { API_URL, get } from "../../helpers/api_helper";

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
    donViId,
    phongBanId,
    disabled,
    ...remainProps
  } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dmDV = async () => {
    setLoading(true);
    apiDichVu().then((res)=>{
      if(res?.status==200){
        setData(res.data.data)
      }else{
      console.log("ERR",res)
        setData([])
      }
    }).finally(()=>{setLoading(false)})
  };

  useEffect(() => {
    dmDV();
  }, []);

  const selectedOption =
    field&& data?.find((option) => option?.code === field?.value);
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
