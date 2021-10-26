import { timKiemDanhSachGD } from "../../constrains/apiURL";
import { convertParamsToQuery } from "../../helpers/functions";
import httpServices from "../httpServices";

export const apiSearch = async (params) => {
  return await httpServices.get(
    `${timKiemDanhSachGD}${convertParamsToQuery(params)}`,
  );
};
