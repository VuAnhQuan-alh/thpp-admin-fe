/*
 * /api/danh-muc-dan-toc
 * danh mục đơn vị
 */
import React, { memo, useEffect, useState } from "react";
import SelectComponents from "../SelectComponents";
import { OptionTypeBase, Props as SelectProps } from "react-select";

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
const dataDummy = [
  {
    label: "Chưa trả",
    value: "0",
  },
  {
    label: "Đã trả",
    value: "1",
  },
];
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

  const dmDiaChinh = async () => {
    // setLoading(true);
    // await get(`${API_URL}dm/api/quoc-gia`)
    //   .then((res) => {
    //     setData(res?.data);
    //   })
    //   .catch((err) => setData([]))
    //   .finally(() => setLoading(false));
  };

  useEffect(() => {
    dmDiaChinh();
  }, []);

  const selectedOption =
    (isFormik || field) && data?.find((option) => option?.id === field?.value);
  const selectedDefault = data?.find(
    (option) => option?.values === defaultValue
  );

  const patchedOnChange = (selectedOption) => {
    //
    const selectedValue = selectedOption ? selectedOption.id : selectedOption;

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
            getOptionLabel={(item) => `${item.tenDayDu}`}
            getOptionValue={(item) => item.id}
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
