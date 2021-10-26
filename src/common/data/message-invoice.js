export const ArrayMessageInvoice = [
  { WAIT_PAYMENT: "-1", MESS: "Chờ thanh toán" }, // CHờ thanh toán
  { SUCCESS: "0", MESS: "Thành công" }, // Thành công
  { ERROR_CUSTOMER_CANCEL: "1", MESS: "Khách hàng hủy giao dịch" }, // khách hành hủy giao dịch
  { ERROR_DENY_TRANSACTION: "2", MESS: "" }, // bị từ chối giao dịch
  { ERROR_MERCHANT_CODE: "3", MESS: "" }, // Mã merchant chưa được kết nối
  { ERROR_CHECK_SUM: "4", MESS: "" }, // Lỗi ký số
  { ERROR_AMOUNT: "5", MESS: "" }, // Lỗi sai số tiền
  { ERROR_CURRENCY: "6", MESS: "" }, // Lỗi mã tiền tệ không hợp lệ
  { ERROR_ACCOUNT_BANK: "7", MESS: "" }, // Lỗi với tài khoản ngân hàng
  { ERROR_CARD_NUMBER: "8", MESS: "" }, // LỖI thẻ ngân hàng
  { ERROR_UNDEFINED: "9", MESS: "" }, // lỗi không xác định
  { ERROR_CONNECT: "10", MESS: "" }, // LỖI KẾT NỐI
  { ERROR_CALL_BACK_URL: "11", MESS: "" }, // LỖI CALL BACK URL;
  { ERROR_IPN_URL: "12", MESS: "" }, // LỖI IPN URL
  { ERROR_ORDER_INFO: "13", MESS: "" }, // LỖI HÓA ĐƠN
  { ERROR_TRX_REF: "14", MESS: "" }, // LỖI TRX_REF
  { ERROR_MERCHANT: "15", MESS: "" }, // LỖI VỚI MERCHANT;
  { ERROR_TRANSACTION: "16", MESS: "" }, // LỖI TRANSACTION
  { ERROR_FEE_USER: "17", MESS: "" }, // LỖI CƯỚC PHÍ
  { ERROR_INFO_PAYMENT: "18", MESS: "" }, // LỖI THÔNG TIN THANH TOÁN
  { ERROR_CHECK_INFO: "19", MESS: "" }, // LỖI KIỂM TRA THÔNG TIN THANH TOÁN
  { ERROR_PAYMENT: "21", MESS: "" }, // LỖI THANH TOÁN
  { ERROR_SERVER: "22", MESS: "" }, // LỖI SERVER
  { ERROR_METHDO_PAYMENT: "23", MESS: "" }, // lỗi phương thức thanh toán
  { ERROR_TOKEN: "24", MESS: "" }, // LỖI TOKEN
  { ERROR_SUPPORT_TRANSACTION: "25", MESS: "" }, // LỖI KHÔNG HỖ TRỢ THANH TOÁN
  { ERROR_EFFECT_TIME: "26", MESS: "" }, // SAI THỜI GIAN HIỆU LỰC
  { ERROR_DATA: "27", MESS: "" }, // LỖI DỮ LIỆU
  { ERROR_QUERY: "28", MESS: "" }, // LỖI TRUY VẤN DỮ LIỆU
  { ERROR_PASSWORD: "29", MESS: "" }, // LỖI MẬT KHẨU
  { ERROR_OTP: "30", MESS: "" }, // LỖI OTP
  { ERROR_CONTRANCT: "31", MESS: "" }, // LỖI HỢP ĐỒNG
  { ERROR_TIME: "32", MESS: "" }, // LỖI QUÁ SỐ LẦN NHẬP
  { ERROR_FAKE: "33", MESS: "" }, // lỗi do nghi ngờ giao dịch gian lận
  { ERROR_EXPIRED: "34", MESS: "" }, // lỗi do giao dịch hết hạn
  { ERROR_OUT_OF_DATE: "35", MESS: "" }, // LỖI VƯỢT QUÁ SỐ LẦN GIAO DỊCH TRONG NGÀY
  { INPROCESS_PAYMENT: "36", MESS: "" }, // đang xử lý giao dịch
  { ERROR_QR: "37", MESS: "" }, // LỖI QR
  { ERROR_OPERATE: "38", MESS: "" }, // LỖI THAO TÁC
  { ERROR_GATEWAY_NOT_FOUND: "39", MESS: "" }, // LỖI KHÔNG TIM THẤY CỔNG THAY TOÁN
]