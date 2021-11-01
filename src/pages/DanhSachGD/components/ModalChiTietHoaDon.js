import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { Card, CardBody, Col, Modal, Row, Button } from "reactstrap";
import { apiChiTietGD } from "../../../services/apiFunction/DanhSachGD";

const styleMain = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  marginTop: "-5px",
  zIndex: '9999',
  maxWidth: "768px",
  width: "100%",
  minHeight: "80vh",
  transitionDuration: "300ms",
  transitionDelay: "500ms",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
const mr10 = { marginRight: "10px" }

export default ({ modalDetail, setModalDetail, item }) => {
  const initialValues = [{
    quantity: 0,
    price: 0,
    subTotal: 0,
    productName: null
  }]
  const screenHeight = window.screen.height
  const [invoice, setInvoice] = React.useState([])
  const [payTotal, setPayTotal] = React.useState(0)
  const callChiTietHoaDon = () => {
    apiChiTietGD(item?.txnRef).then((res) => {
      setInvoice(initialValues)
      if (res?.data?.data?.data) {
        setInvoice(res?.data?.data?.data)
      }
    });
  };
  useEffect(() => {
    if (modalDetail && !isEmpty(item) && item?.txnRef) {
      callChiTietHoaDon();
    }
  }, [modalDetail]);
  React.useEffect(() => {
    if (invoice.length > 0) {
      const result = invoice.reduce((acc, curr) => curr.subTotal + acc, 0)
      setPayTotal(result)
    }
  }, [invoice])
  return (
    <>
      <Modal isOpen={modalDetail} style={styleMain} toggle={() => { setModalDetail(!modalDetail) }}>
        <Card className="p-4">
          <Row>
            <Col className="fw-bold fs-3">Thông tin hóa đơn</Col>
          </Row>
          <CardBody>
            <Row>
              <Col className="d-flex justify-content-start mb-1">
                <div style={mr10}>Khách hàng:</div>
                <div className="fw-bold ml-5">{item?.customerName}</div>
              </Col>
            </Row>
            <Row>
              <Col className="col-md-6">
                <div className="d-flex justify-content-start mb-1">
                  <div style={mr10}>Mã Hóa Đơn:</div>
                  <div className="fw-bold">{item?.orderInfo}</div>
                </div>
                <div className="d-flex justify-content-start">
                  <div style={mr10}>Sản phẩm/ Dịch vụ:</div>
                  <div className="fw-bold">{item?.serviceName || "Khám bệnh"}</div>
                </div>
              </Col>
              <Col className="col-md-6">
                <div className="d-flex mb-1">
                  <div style={mr10}>Ngày hóa đơn:</div>
                  <div className="fw-bold">{item?.transactionDate ? `${item?.transactionDate.substring(6, 8)}/${item?.transactionDate.substring(4, 6)}/${item?.transactionDate.substring(0, 4)}` : "Null"}</div>
                </div>
                <div className="d-flex justify-content-start">
                  <div style={mr10}>Tổng tiền thanh:</div>
                  <div className="fw-bold">{new Intl.NumberFormat().format(payTotal)} VNĐ</div>
                </div>
              </Col>
            </Row>
          </CardBody>
          <Row>
            <Row>
              <Col className="fw-bold fs-3">Chi tiết hóa đơn</Col>
            </Row>
            <CardBody>
              <Row style={{ position: "relative", height: screenHeight * 0.24, overflow: "auto", display: "block", width: "100%", margin: "0px" }}>
                <table className="table table-hover text-center">
                  <thead className="table-primary" style={{ position: "fixed" }}>
                    <tr>
                      <th scope="col" style={{ width: "354px", textAlign: "start" }}>Sản phẩm/ Dịch vụ</th>
                      <th scope="col" style={{ width: "100px" }}>Số lượng</th>
                      <th scope="col" style={{ width: "120px" }}>Đơn giá (đ)</th>
                      <th scope="col" style={{ width: "120px" }}>Thành tiền (đ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ height: "48px", visibility: "hidden" }}>
                      <th scope="row"></th>
                      <td style={{ width: "100px" }}></td>
                      <td style={{ width: "120px" }}></td>
                      <td style={{ width: "120px" }}></td>
                    </tr>
                    {invoice.map((inv, index) => (
                      <tr key={index}>
                        <th scope="row" className="text-start">{inv?.productName}</th>
                        <td>{inv?.quantity}</td>
                        <td>{new Intl.NumberFormat().format(inv?.price)}</td>
                        <td>{new Intl.NumberFormat().format(inv?.subTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>
              <Row className="d-flex justify-content-end mt-3">
                <Col className="col-3">
                  <div className="text-end my-1">Mã giảm giá:</div>
                  <div className="text-end my-1">Thành tiền:</div>
                  <div className="text-end my-1">Giảm giá:</div>
                  <div className="text-end my-1">Tổng tiền thanh toán:</div>
                </Col>
                <Col className="col-3">
                  <div className="fw-bold my-1">Null</div>
                  <div className="my-1">{new Intl.NumberFormat().format(payTotal)} VNĐ</div>
                  <div className="my-1">0 VNĐ</div>
                  <div className="fw-bold my-1">{new Intl.NumberFormat().format(payTotal)} VNĐ</div>
                </Col>
              </Row>
            </CardBody>
            <Row className="d-flex justify-content-end">
              <Button
                className="btn btn-primary text-center"
                style={{ width: "78px" }}
                onClick={() => setModalDetail(!modalDetail)}
              >Đóng</Button>
            </Row>
          </Row>
        </Card>
      </Modal>
    </>
  );
};
