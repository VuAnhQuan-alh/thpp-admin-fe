import { profile, signin, signup } from "../../constrains/apiURL";
import httpServices from "../httpServices";

export const apiSignin = async (body) => {
    return await httpServices.post(
        `${signin}`, body
    );
};

export const apiGetProfile = async () => {
    return await httpServices.get(`${profile}`);
};
