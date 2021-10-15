import React from 'react'
import { CardBody, Col, Card, Row, Button } from 'reactstrap'

const styleMain = {
  position: "fixed",
  top: "0px",
  left: "0px",
  background: "#4f50507a",
  zIndex: '9999',
  minHeight: "100vh",
  transitionDuration: "300ms",
  transitionDelay: "500ms",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
const mr10 = { marginRight: "10px" }

const InvoiceInfo = () => {
  const screenHeight = window.screen.height

  return (
    <>
      <section style={styleMain}>
        <Row style={{ maxWidth: "768px", width: "100%" }}>
          <Card className="p-4">
            <Row>
              <Row>
                <Col className="fw-bold fs-3">Thông tin hóa đơn</Col>
              </Row>
              <CardBody>
                <Row>
                  <Col className="d-flex justify-content-start mb-1">
                    <div style={mr10}>Khách hàng:</div>
                    <div className="fw-bold ml-5">Alexander Vu</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-6">
                    <div className="d-flex justify-content-start mb-1">
                      <div style={mr10}>Mã Hóa Đơn:</div>
                      <div className="fw-bold">TH00251021</div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <div style={mr10}>Sản phẩm/ Dịch vụ:</div>
                      <div className="fw-bold">Tiêm chủng</div>
                    </div>
                  </Col>
                  <Col className="col-md-6">
                    <div className="d-flex mb-1">
                      <div style={mr10}>Ngày hóa đơn:</div>
                      <div className="fw-bold">25/10/2021</div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <div style={mr10}>Tổng tiền thanh:</div>
                      <div className="fw-bold">900.000 VNĐ</div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Row>
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
                        <th scope="col" style={{ width: "120px" }}>Đơn giá</th>
                        <th scope="col" style={{ width: "120px" }}>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ height: "48px", visibility: "hidden" }}>
                        <th scope="row"></th>
                        <td style={{ width: "100px" }}></td>
                        <td style={{ width: "120px" }}></td>
                        <td style={{ width: "120px" }}></td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">Vaccine AstraZeneca</th>
                        <td>01</td>
                        <td>300.000</td>
                        <td>300.000</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">Vaccine Sinopharm</th>
                        <td>02</td>
                        <td>700.000</td>
                        <td>700.000</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">Vaccine Pfizer 01</th>
                        <td>01</td>
                        <td>900.000</td>
                        <td>900.000</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">Vaccine Pfizer 02</th>
                        <td>01</td>
                        <td>900.000</td>
                        <td>900.000</td>
                      </tr>
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
                    <div className="fw-bold my-1">ALEXVu</div>
                    <div className="my-1">1.900.000 VNĐ</div>
                    <div className="my-1">200.000 VNĐ</div>
                    <div className="fw-bold my-1">1.700.000 VNĐ</div>
                  </Col>
                </Row>
              </CardBody>
              <Row className="d-flex justify-content-end">
                <Button className="btn btn-primary text-center" style={{ width: "78px" }}>Đóng</Button>
              </Row>
            </Row>
          </Card>
        </Row>
      </section>
    </>
  )
}

export default InvoiceInfo
