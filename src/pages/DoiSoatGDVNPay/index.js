import React from "react"
import { Row, CardBody, Col, Button, Card, CardTitle } from "reactstrap"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";
import SelectDC from "../../components/SelectDC";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
// import DatePicker from "react-datepicker";
//Import Components
const DoiSoatGDVNPay = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Đối Soát Giao Dịch VNPay</h4>
            </div>
          </div>
        </Row>

        <Row>
          <Card>
            <CardBody style={{ backgroundColor: "#FFF" }}>
              <Formik
                initialValues={{
                  benhVien: "",
                  tuNgay: "",
                  denNgay: "",
                  trangThaiGD: "",
                  trangThaiVNPay: "",
                  keySearch: "",

                }}
                onSubmit={(values) => { console.log("value", values) }}
              >
                {() => (
                  <Row>
                    <Col md={2}>
                      <Field
                        name="benhVien"
                        component={SelectDC}
                        title="Bệnh viện/phòng khám"
                      />
                    </Col>
                    <Col md={1}>
                      <Field
                        name="tuNgay"
                        component={DatePicker}
                        title="Từ ngày"
                      />
                    </Col>
                    <Col md={1}>
                      <Field
                        name="denNgay"
                        component={DatePicker}
                        title="Đến ngày"
                      />
                    </Col>
                    <Col md={2}>
                      <Field
                        name="benhVien"
                        component={InputField}
                        label="Bệnh viện/phòng khám"
                      />
                    </Col>
                    <Col md={2}>
                      <Field
                        name="benhVien"
                        component={InputField}
                        label="Bệnh viện/phòng khám"
                      />
                    </Col>
                    <Col md={2}>
                      <Field
                        name="benhVien"
                        component={InputField}
                        label="Bệnh viện/phòng khám"
                      />
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                      <Button
                        color="secondery"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                      >
                        <i className="fas fa-search "></i> Tìm kiếm
                      </Button>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                      <Button
                        color="secondery"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                      >
                        <i class="fas fa-print"></i>Xuất excel
                      </Button>
                    </Col>
                  </Row>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Row>
        <Row>
          {/* <Col className="col-12"> */}
          <Card>
            <CardBody>
              <CardTitle className="h4">Thông tin đối soát </CardTitle>
              <div className="table-rep-plugin">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <Table
                    id="tech-companies-1"
                    className="table table-striped table-bordered"
                  >
                    <Thead>
                      <Tr>
                        <Th data-priority="1">Mã Giao dịch</Th>
                        <Th data-priority="1">Mã Giao dịch</Th>
                        <Th data-priority="3">Mã tham chiếu VNPay</Th>
                        <Th data-priority="1">Bệnh viện/Phòng khám</Th>
                        <Th data-priority="3">Khách hàng</Th>
                        <Th data-priority="3">Số điện thoại</Th>
                        <Th data-priority="6">Dịch vụ</Th>
                        <Th data-priority="6">Tổng tiền(vnđ)</Th>
                        <Th data-priority="6">Kênh giao dịch</Th>
                        <Th data-priority="3">Ngày giao dịch</Th>
                        <Th data-priority="6">Trang thái giao dịch </Th>
                        <Th data-priority="6">Trạn thái VNPay</Th>
                        <Th data-priority="6">Thao tác</Th>
                      </Tr>
                    </Thead>
                    <Tbody>

                      <Tr>
                        <Th data-priority="1">Mã Giao dịch</Th>
                        <Th data-priority="1">Mã Giao dịch</Th>
                        <Th data-priority="3">Mã tham chiếu VNPay</Th>
                        <Th data-priority="1">Bệnh viện/Phòng khám</Th>
                        <Th data-priority="3">Khách hàng</Th>
                        <Th data-priority="3">Số điện thoại</Th>
                        <Th data-priority="6">Dịch vụ</Th>
                        <Th data-priority="6">Tổng tiền(vnđ)</Th>
                        <Th data-priority="6">Kênh giao dịch</Th>
                        <Th data-priority="3">Ngày giao dịch</Th>
                        <Th data-priority="6">Trang thái giao dịch </Th>
                        <Th data-priority="6">Trạn thái VNPay</Th>
                        <Th data-priority="6">Thao tác</Th>
                      </Tr>
                      <Tr>
                        <Th data-priority="1">Mã Giao dịch</Th>
                        <Th data-priority="1">Mã Giao dịch</Th>
                        <Th data-priority="3">Mã tham chiếu VNPay</Th>
                        <Th data-priority="1">Bệnh viện/Phòng khám</Th>
                        <Th data-priority="3">Khách hàng</Th>
                        <Th data-priority="3">Số điện thoại</Th>
                        <Th data-priority="6">Dịch vụ</Th>
                        <Th data-priority="6">Tổng tiền(vnđ)</Th>
                        <Th data-priority="6">Kênh giao dịch</Th>
                        <Th data-priority="3">Ngày giao dịch</Th>
                        <Th data-priority="6">Trang thái giao dịch </Th>
                        <Th data-priority="6">Trạn thái VNPay</Th>
                        <Th data-priority="6">Thao tác</Th>
                      </Tr>
                    </Tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>
          {/* </Col> */}
        </Row>
      </div>
    </React.Fragment>
  )
}

export default DoiSoatGDVNPay