export const URL = 'https://b354-54-251-216-104.ap.ngrok.io';
export const STATUS = {
  success: [200, 201, 204],
  auth: [401],
  notFound: [404],
  error: [500, 400],
};

// Users, Authentication
export const signin = `${URL}/api/auth-user/authenticate`;
export const profile = `${URL}/sprs/api/user`;

// Categories
export const dsBenhVien = `${URL}/api/hospital/get-all`;
export const dvBenhVien = `${URL}/api/hospital-sv/get-all`;

// List transactions
export const timKiemDanhSachGD = `${URL}/api/history/search`;
export const chiTietHoaDon = `${URL}/api/history/get-invoice/`;

// Export xlsx
export const apiExportReport = `${URL}/api/report/export-transaction`;
export const apiExportTrans = `${URL}/api/history/export-lst-transactions`;
export const apiExportTransactionControl = `${URL}/api/history/export`;

// User management
export const userSearch = `${URL}/api/user/search`;
export const userUpdate = `${URL}/api/user/update/multiple`;
export const userSync = `${URL}/api/user/sync/true-hope`;

// Report
export const transSearch = `${URL}/api/report/search`;
