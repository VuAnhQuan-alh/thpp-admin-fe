import { transSearch } from "../../constrains/apiURL";
import { convertParamsToQuery } from "../../helpers/functions";
import httpServices from "../httpServices"

export const apiBaoCaoDT = async (params, body) => {
  return await httpServices.post(`${transSearch}${convertParamsToQuery(params)}`, { ...body });
}