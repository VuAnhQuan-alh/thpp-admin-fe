import { isEmpty } from "lodash";
import { Table, Tbody, Thead, Td, Th, Tr } from "react-super-responsive-table"
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
  maxWidth: `${window.screen.width > 768 ? 768 : window.screen.width - 50}px`,
  alignItems: "center"
}
const mr10 = { marginRight: "10px" }
const styleTH = {
  overflow: "hidden",
  whiteSpace: "nowrap"
}

export default ({ modalDetail, setModalDetail, item }) => {
  const initialValues = [{
    discountAmount: null,
    discountCode: null,
    services: [],
    id: null
  }]
  const screenHeight = window.screen.height
  const [invoice, setInvoice] = React.useState([])
  const [priceTotal, setPriceTotal] = React.useState(0)
  const [payTotal, setPayTotal] = React.useState(0)
  const callChiTietHoaDon = () => {
    apiChiTietGD(item?.txnRef).then((res) => {
      setInvoice(initialValues)
      if (res?.data?.data?.data) {
        setInvoice({ ...initialValues, ...res?.data?.data?.data })
      }
    });
  };
  useEffect(() => {
    if (modalDetail && !isEmpty(item) && item?.txnRef) {
      callChiTietHoaDon();
    }
  }, [modalDetail]);
  useEffect(() => {
    if (invoice?.services?.length > 0) {
      const result = invoice.services.reduce((acc, curr) => acc + parseInt(curr?.amount), 0)
      setPriceTotal(result)
      setPayTotal(result - parseInt(invoice?.discountAmount))
    }
  }, [invoice])

  return (
    <>
      <Modal isOpen={modalDetail} style={styleMain} toggle={() => { setModalDetail(!modalDetail) }}>
        <Card style={{ padding: "20px", maxHeight: `${screenHeight - 50}px`, overflowY: "auto" }}>
          <Row>
            <Col className="fw-bold fs-3">Thông tin hóa đơn</Col>
          </Row>
          <CardBody>
            <Row>
              <Col style={{ padding: "0px" }} className="d-flex justify-content-start mb-1">
                <div style={mr10}>Khách hàng:</div>
                <div className="fw-bold ml-5">{item?.customerName}</div>
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: "0px" }} className="col-md-6">
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
            <CardBody style={{ padding: "0px auto", margin: "16px", }}>
              <Row style={{ overflow: "auto", display: "block", width: "100%", margin: "0px" }}>
                <div className="table-rep-plugin" style={{ padding: "0px" }}>
                  <div className="table-responsive table-scroll-horizontal" data-pattern="priority-columns">
                    <Table className="table table-hover">
                      <Thead className="table-primary" style={{}}>
                        <Tr className="text-center">
                          <Th style={styleTH} className="text-start">Sản phẩm/ Dịch vụ</Th>
                          <Th style={styleTH}>Số lượng</Th>
                          <Th style={styleTH}>Đơn giá (đ)</Th>
                          <Th style={styleTH}>Thành tiền (đ)</Th>
                        </Tr>
                      </Thead>
                      <Tbody className="text-center">
                        {invoice?.services?.length > 0 && invoice?.services?.map((inv, index) => (
                          <tr key={index}>
                            <Td className="text-start" style={styleTH}>{inv?.serviceName}</Td>
                            <Td style={styleTH}>{inv?.count}</Td>
                            <Td style={styleTH}>{new Intl.NumberFormat().format(inv?.price)}</Td>
                            <Td style={styleTH}>{new Intl.NumberFormat().format(inv?.amount)}</Td>
                          </tr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                </div>
              </Row>
              <Row className="d-flex justify-content-end mt-3">
                <Col className="col-3">
                  <div className="text-end my-1">Mã giảm giá:</div>
                  <div className="text-end my-1">Thành tiền:</div>
                  <div className="text-end my-1">Giảm giá:</div>
                  <div className="text-end my-1">Tổng tiền thanh toán:</div>
                </Col>
                <Col className="col-3">
                  <div className="fw-bold my-1">{invoice?.discountCode || ""}</div>
                  <div className="my-1">{new Intl.NumberFormat().format(priceTotal)} VNĐ</div>
                  <div className="my-1">{new Intl.NumberFormat().format(invoice?.discountAmount) + " VNĐ" || "0 VNĐ"}</div>
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
      </Modal >
    </>
  );
};
