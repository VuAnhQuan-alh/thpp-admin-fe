import { dsBenhVien, dvBenhVien } from "../../constrains/apiURL";
import httpServices from "../httpServices";

export const apiBenhVien = async () => {
  return await httpServices.get(`${dsBenhVien}`);
};

export const apiDichVu = async () => {
  return await httpServices.get(`${dvBenhVien}`);
};
