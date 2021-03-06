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

export default ({ modal, setModal, item, setItem }) => {
  const initialValues = {
    discountAmount: 0,
    discountCode: "",
    services: [],
    id: ""
  }
  const screenHeight = window.screen.height
  const [invoice, setInvoice] = React.useState([])
  const [priceTotal, setPriceTotal] = React.useState(0)
  const [payTotal, setPayTotal] = React.useState(0)
  const callChiTietHoaDon = () => {
    apiChiTietGD(item?.txnRef).then((res) => {
      setInvoice(initialValues)
      if (res?.data?.data?.data) {
        const result = { ...initialValues, ...res?.data?.data?.data }
        setInvoice(result)
      }
    });
  };
  useEffect(() => {
    if (modal && !isEmpty(item) && item?.txnRef) {
      callChiTietHoaDon();
    }
  }, [modal]);
  useEffect(() => {
    if (invoice?.services?.length > 0) {
      const result = invoice.services.reduce((acc, curr) => acc + parseInt(curr?.amount), 0)
      setPriceTotal(result)
      setPayTotal(result - parseInt(invoice?.discountAmount))
    }
  }, [invoice])

  return (
    <>
      <Modal isOpen={modal} style={styleMain} toggle={() => { setModal(!modal) }}>
        <Card style={{ padding: "20px", maxHeight: `${screenHeight - 50}px`, overflowY: "auto" }}>
          <Row>
            <Col className="fw-bold fs-3">Th??ng tin h??a ????n</Col>
          </Row>
          <CardBody>
            <Row>
              <Col style={{ padding: "0px" }} className="d-flex justify-content-start mb-1">
                <div style={mr10}>Kh??ch h??ng:</div>
                <div className="fw-bold ml-5">{item?.customerName}</div>
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: "0px" }} className="col-md-6">
                <div className="d-flex justify-content-start mb-1">
                  <div style={mr10}>M?? H??a ????n:</div>
                  <div className="fw-bold">{item?.orderInfo}</div>
                </div>
                <div className="d-flex justify-content-start">
                  <div style={mr10}>S???n ph???m/ D???ch v???:</div>
                  <div className="fw-bold">{item?.serviceName}</div>
                </div>
              </Col>
              <Col className="col-md-6">
                <div className="d-flex mb-1">
                  <div style={mr10}>Ng??y h??a ????n:</div>
                  <div className="fw-bold">{item?.transactionDate ? `${item?.transactionDate.substring(6, 8)}/${item?.transactionDate.substring(4, 6)}/${item?.transactionDate.substring(0, 4)}` : ""}</div>
                </div>
                <div className="d-flex justify-content-start">
                  <div style={mr10}>T???ng ti???n thanh:</div>
                  <div className="fw-bold">{new Intl.NumberFormat().format(payTotal)} VN??</div>
                </div>
              </Col>
            </Row>
          </CardBody>
          <Row>
            <Row>
              <Col className="fw-bold fs-3">Chi ti???t h??a ????n</Col>
            </Row>
            <CardBody style={{ padding: "0px auto", margin: "16px", }}>
              <Row style={{ overflow: "auto", display: "block", width: "100%", margin: "0px" }}>
                <div className="table-rep-plugin" style={{ padding: "0px" }}>
                  <div className="table-responsive table-scroll-horizontal" data-pattern="priority-columns">
                    <Table className="table table-hover">
                      <Thead className="table-primary" style={{}}>
                        <Tr className="text-center">
                          <Th style={styleTH} className="text-start">S???n ph???m/ D???ch v???</Th>
                          <Th style={styleTH}>S??? l?????ng</Th>
                          <Th style={styleTH}>????n gi?? (??)</Th>
                          <Th style={styleTH}>Th??nh ti???n (??)</Th>
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
                  <div className="text-end my-1">Th??nh ti???n:</div>
                  <div className="text-end my-1">M?? gi???m gi??:</div>
                  <div className="text-end my-1">Gi???m gi??:</div>
                  <div className="text-end my-1">T???ng ti???n thanh to??n:</div>
                </Col>
                <Col className="col-3">
                  <div className="my-1">{new Intl.NumberFormat().format(priceTotal)} VN??</div>
                  <div className="fw-bold my-1">{invoice?.discountCode || <>&nbsp;</>}</div>
                  <div className="my-1">{new Intl.NumberFormat().format(invoice?.discountAmount) + " VN??" || "0 VN??"}</div>
                  <div className="fw-bold my-1">{new Intl.NumberFormat().format(payTotal)} VN??</div>
                </Col>
              </Row>
            </CardBody>
            <Row className="d-flex justify-content-end">
              <Button
                className="btn btn-primary text-center"
                style={{ width: "78px" }}
                onClick={() => {
                  setModal(!modal)
                  setItem({})
                }}
              >????ng</Button>
            </Row>
          </Row>
        </Card>
      </Modal>
    </>
  );
};
