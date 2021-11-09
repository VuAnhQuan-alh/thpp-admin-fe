import React, { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";
import SelectBenhVien from "../../components/SelectBenhVien";
import { checkKeyNull, seo } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DoisoatGDVNPay";
import Table from "./components/Table";
import { CardBody, Col, Row, Card, Button } from "reactstrap";
import SelectStatusSys from "../../components/SelectStatusSys";
import SelectCTT from "../../components/SelectCTT";

const DoiSoatGD = () => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 10 });
  const [params, setParams] = useState({});
  const [data, setData] = useState([])
  const trans = window.localStorage.getItem("transNo")

  React.useEffect(() => {
    if (trans !== null) {
      apiSearch(checkKeyNull({ page: 1, size: 1, transactionNo: trans }))
        .then(res => {
          window.localStorage.removeItem("transNo")
          setData(res?.data)
        })
    } else {
      const paramSearch = { ...params, page: pageSize.page, size: pageSize.size };
      apiSearch(checkKeyNull(paramSearch)).then((res) => {
        setData(res?.data)
      })
    }
  }, [pageSize, params])

  React.useEffect(() => {
    seo({
      title: "Danh Sách Đối Soát Giao Dịch",
      metaDescription: "True Hope Admin"
    })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content" style={{ maxWidth: "1440px", margin: "10px auto" }}>
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Đối Soát Giao Dịch</h4>
            </div>
          </div>
        </Row>

        <Row>
          <Card>
            <CardBody style={{ backgroundColor: "#FFF" }}>
              <Formik
                initialValues={{
                  hospitalType: null,
                  customerName: "",
                  startDate: "",
                  enDate: "",
                  transactionNo: `${trans || ""}`,
                  chanelType: null,
                  statusSys: null,
                }}
                onSubmit={(values) => {
                  setParams(values);
                  setPageSize({ ...pageSize, page: 1 })
                }}
              >
                {() => (
                  <Form>
                    <Row className="d-flex justify-content-between align-items-end space-x-2">
                      <div className="col-md-6">
                        <Field
                          name="hospitalType"
                          component={SelectBenhVien}
                          title="Bệnh viện/phòng khám"
                        /></div>
                      <div className="col-md-3">
                        <Field
                          name="startDate"
                          component={DatePicker}
                          title="Từ ngày"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="endDate"
                          component={DatePicker}
                          title="Đến ngày"
                        />
                      </div>
                    </Row>
                    <Row className="d-flex justify-content-between align-items-end mt-3">
                      <div className="col-md-3" style={{ marginBottom: "-5px" }}>
                        <Field
                          name="transactionNo"
                          component={InputField}
                          label="Tìm kiếm theo mã giao dịch"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="chanelType"
                          component={SelectCTT}
                          title="Cổng thanh toán"
                        />
                      </div>
                      <div className="col-md-3" style={{ marginBottom: "-5px" }}>
                        <Field
                          name="customerName"
                          component={InputField}
                          label="Khách hàng Thanh toán"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="statusSys"
                          component={SelectStatusSys}
                          title="Trạng thái giao dịch"
                        />
                      </div>
                    </Row>
                    <div className="d-flex justify-content-end align-items-center mt-3" >
                      <Button
                        color="primary"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                        style={{ marginRight: "20px" }}
                      >
                        <i className="fas fa-search "></i>&nbsp;Tìm kiếm
                      </Button>
                      <Button
                        color="info"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                      >
                        <i className="fas fa-print"></i>&nbsp;Xuất excel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Table data={data} pageSize={pageSize} setPageSize={setPageSize} />
        </Row>
      </div>
    </React.Fragment>
  )
}

export default DoiSoatGD