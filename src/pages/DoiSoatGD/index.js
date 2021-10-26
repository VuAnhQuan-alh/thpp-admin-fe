import React, { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";
import SelectBenhVien from "../../components/SelectBenhVien";
import { callAPIPaging, checkCallAPI, checkKeyNull, seo } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DoisoatGDVNPay";
import Table from "./components/Table";
import { isEmpty } from "lodash";
import { CardBody, Col, Row, Card, Button } from "reactstrap";
import SelectDV from "../../components/SelectDV";
import SelectChanel from "../../components/SelectChanel";

const DoiSoatGD = () => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 10 });
  const [params, setParams] = useState({});
  const [data, setData] = useState([])
  const CallDanhSachGD = () => {
    const paramSearch = { ...params, page: pageSize.page, size: pageSize.size };
    apiSearch(checkKeyNull(paramSearch)).then((res) => {
      setData(res?.data)
    })
  }

  React.useEffect(() => {
    seo({
      title: "Danh Sách Đối Soát Giao Dịch",
      metaDescription: "True Hope Admin"
    })
  }, [])

  useEffect(() => {
    CallDanhSachGD();
  }, [pageSize])

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
                  gatewayCode: null,
                  startDate: "",
                  enDate: "",
                  searchText: "",
                  serviceCode: null,
                  statusSys: null,
                }}
                onSubmit={(values) => {
                  console.log("value", values);
                  setParams(values);
                  setPageSize({ ...pageSize, page: 0, size: 2 })
                }}
              >
                {() => (
                  <Form>
                    <div className="d-flex justify-content-between align-items-end">
                      <div style={{ width: "100%", marginBottom: "-5px" }}>
                        <Field
                          name="searchText"
                          component={InputField}
                          label="Tìm kiếm theo mã, hóa đơn"
                        />
                      </div>
                      <div style={{ margin: "0px 20px", width: "100%" }}>
                        <Field
                          name="chanelType"
                          component={SelectChanel}
                          title="Kênh thực hiện"
                        />
                      </div>
                      <div style={{ width: "100%" }}>
                        <Field
                          name="serviceCode"
                          component={SelectDV}
                          title="Dịch vụ"
                        />
                      </div>
                      <div style={{ width: "100%", marginLeft: "20px" }}>
                        <Field
                          name="statusSys"
                          component={SelectDV}
                          title="Trạng thái giao dịch"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end mt-3">
                      <div style={{ width: "100%" }}>
                        <Field
                          name="hospitalType"
                          component={SelectBenhVien}
                          title="Bệnh viện/phòng khám"
                        />
                      </div>
                      <div style={{ margin: "0px 20px", width: "100%" }}>
                        <Field
                          name="startDate"
                          component={DatePicker}
                          title="Từ ngày"
                        />
                      </div>
                      <div style={{ width: "100%" }}>
                        <Field
                          name="endDate"
                          component={DatePicker}
                          title="Đến ngày"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mt-3" >
                      <Button
                        color="primary"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                        style={{ marginRight: "20px" }}
                      >
                        <i className="fas fa-search "></i> Tìm kiếm
                      </Button>
                      <Button
                        color="primary"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                      >
                        <i className="fas fa-print"></i>Xuất excel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Table data={data} />
        </Row>
      </div>
    </React.Fragment>
  )
}

export default DoiSoatGD