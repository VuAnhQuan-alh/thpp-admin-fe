export const URL = "http://54.251.216.104:8080"
export const STATUS = {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400],
}

//
export const signin = `${URL}/api/auth`;

export const profile = `${URL}/sprs/api/user`;
//
export const timKiemDanhSachGD = `${URL}/api/history/search`;
//
export const chiTietHoaDon = `${URL}/api/history/get-invoice/`;
//
export const dsBenhVien = `${URL}/api/hospital/get-all`;
//
export const dvBenhVien = `${URL}/api/hospital-sv/get-all`;

