import { profile, signin, signup, userSearch, userSync, userUpdate } from "../../constrains/apiURL";
import httpServices from "../httpServices";

export const apiSignin = async (body) => {
  return await httpServices.post(
    `${signin}`, body
  );
};

export const apiGetProfile = async () => {
  return await httpServices.get(`${profile}`);
};

export const apiGetUsers = async (body = {}) => {
  return await httpServices.post(`${userSearch}`, body);
};

export const apiUpdateUser = async (body = {}) => {
  return await httpServices.put(`${userUpdate}`, body, {});
}

export const apiSyncUser = async () => {
  return await httpServices.get(`${userSync}`, {}, {})
}