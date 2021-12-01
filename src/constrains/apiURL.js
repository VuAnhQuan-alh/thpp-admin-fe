export const URL = "http://54.251.216.104:8080"
export const STATUS = {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400],
}
//
export const signin = `${URL}/api/auth-user/authenticate`;
export const profile = `${URL}/sprs/api/user`;
export const dsBenhVien = `${URL}/api/hospital/get-all`;
export const dvBenhVien = `${URL}/api/hospital-sv/get-all`;
// 
// Danh sách giao dịch
export const timKiemDanhSachGD = `${URL}/api/history/search`;
export const chiTietHoaDon = `${URL}/api/history/get-invoice/`;

// Export file xlsx
export const apiExportReport = `${URL}/api/report/export-transaction`
export const apiExportTrans = `${URL}/api/history/export-lst-transactions`

// Quan tri user
export const userSearch = `${URL}/api/user/search`;
export const userUpdate = `${URL}/api/user/update`;

// Bao cao doanh thu
export const transSearch = `${URL}/api/report/search`