import React, { useState } from "react"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";

import { callAPIPaging, checkCallAPI, checkKeyNull, convertParamsToQuery, seo } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DanhSachGD";
import Table from "./components/Table";
// import { isEmpty } from "lodash";
import { CardBody, Col, Row, Card, Button } from "reactstrap";
import SelectBenhVien from "../../components/SelectBenhVien";
import SelectDV from "../../components/SelectDV";
// import SelectCTT from "../../components/SelectCTT";
import SelectChannel from "../../components/SelectChannel";
import SelectStatusSys from "../../components/SelectStatusSys";
import { printFile } from "../../services/apiFunction/printFile";
import { apiExportFile, apiExportTrans } from "../../constrains/apiURL";
import exportFile from "../../services/apiFunction/exportFile";
import moment from "moment";

const DanhSachGD = () => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 10 });
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);

  const CallDanhSachGD = () => {
    const paramSearch = { ...params, page: pageSize.page, size: pageSize.size };
    apiSearch(checkKeyNull(paramSearch)).then((res) => {
      setData(res?.data);
    })
  }


  React.useEffect(() => {
    seo({
      title: "Danh Sách Giao Dịch",
      metaDescription: "True Hope Admin"
    })
  }, [])

  React.useEffect(() => {
    CallDanhSachGD();
  }, [pageSize, params])

  return (
    <React.Fragment>
      <div className="page-content" style={{ maxWidth: "1440px", margin: "10px auto" }}>
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Danh Sách Giao Dịch</h4>
            </div>
          </div>
        </Row>
        <Row>
          <Card>
            <CardBody style={{ backgroundColor: "#FFF" }}>
              <Formik
                initialValues={{
                  hospitalType: null,
                  channelType: null,
                  serviceCode: null,
                  orderInfo: "",
                  startDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
                  endDate: moment().format("YYYY-MM-DD"),
                  statusSys: ""
                }}
                onSubmit={(values) => {
                  setParams(values);
                  setPageSize({ ...pageSize, page: 1 })
                }}
              >
                {(propsFormik) => (
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
                          name="orderInfo"
                          component={InputField}
                          label="Tìm kiếm theo mã hóa đơn"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="serviceCode"
                          component={SelectDV}
                          title="Dịch vụ"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="channelType"
                          component={SelectChannel}
                          title="Kênh thực hiện"
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
                    <div className="d-flex justify-content-end align-items-center mt-3">
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
                        onClick={() => {
                          const paramExport = checkKeyNull({ ...params, export: "PAGE", startDate: propsFormik.values.startDate, endDate: propsFormik.values.endDate })
                          const url = `${apiExportTrans}${convertParamsToQuery({ page: pageSize.page, size: pageSize.size })}`
                          exportFile({
                            url: url,
                            type: "xlsx",
                            method: "POST",
                            body: paramExport,
                            name: "DanhSachGiaoDich"
                          })
                        }}
                        style={{ marginRight: "20px" }}
                      >
                        <i className="fas fa-print"></i>&nbsp;Xuất dữ liệu hiện tại
                      </Button>
                      <Button
                        color="info"
                        className="btn btn-primary waves-effect waves-light mt-2"
                        type="submit"
                        id="btn-tra-cuuDC"
                        onClick={() => {
                          const paramExport = checkKeyNull({ ...params, export: "N0_PAGE", startDate: propsFormik.values.startDate, endDate: propsFormik.values.endDate })
                          exportFile({
                            url: `${apiExportTrans}`,
                            type: "xlsx",
                            method: "POST",
                            body: paramExport,
                            name: "DanhSachGiaoDichAll"
                          })
                        }}
                      >
                        <i className="fas fa-print"></i>&nbsp;Xuất dữ liệu
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Table data={data || []} pageSize={pageSize} setPageSize={setPageSize} />
        </Row>
      </div>
    </React.Fragment>
  )
}

export default DanhSachGD