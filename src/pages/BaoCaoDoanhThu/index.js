import React, { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";

import { callAPIPaging, checkCallAPI, checkKeyNull, convertParamsToQuery, seo } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DanhSachGD";
import Table from "./components/Table";
import { isEmpty } from "lodash";
import { CardBody, Col, Row, Card, Button } from "reactstrap";
import SelectBenhVien from "../../components/SelectBenhVien";
import SelectDV from "../../components/SelectDV";
import SelectChannel from "../../components/SelectChannel";
import { apiExportReport } from "../../constrains/apiURL";
import { apiBaoCaoDT } from "../../services/apiFunction/BaoCaoDT";
import moment from "moment";
import exportFile from "../../services/apiFunction/exportFile";

const DanhSachGD = () => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 10 });
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);
  const CallDanhSachGD = () => {
    if (isEmpty(params)) return;
    apiBaoCaoDT({ page: pageSize.page, size: pageSize.size }, params).then((res) => {
      callAPIPaging({
        size: pageSize.size,
        onError: (e) => {
          setData({ data: [], meta: { totalPage: 1 } });
        },
        onSuccess: (response) => {
          setData({ data: response.data.data, meta: response.data.data[0].totalElement });
        },
        response: res,
      })
    })
  }

  React.useEffect(() => {
    seo({
      title: "Báo Cáo Doanh Thu",
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
              <h4 className="page-title mb-0 font-size-18">Báo cáo doanh thu</h4>
            </div>
          </div>
        </Row>
        <Row>
          <Card>
            <CardBody style={{ backgroundColor: "#FFF" }}>
              <Formik
                initialValues={{
                  hospitalType: null,
                  fromDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
                  toDate: moment().format("YYYY-MM-DD"),
                  channelType: null,
                  serviceCode: null,
                }}
                onSubmit={(values) => {
                  setParams(values);
                  setPageSize({ ...pageSize, page: 1, size: 10 })
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
                          name="fromDate"
                          component={DatePicker}
                          title="Từ ngày"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="toDate"
                          component={DatePicker}
                          title="Đến ngày"
                        />
                      </div>
                    </Row>
                    <Row className="d-flex justify-content-start align-items-end space-x-2">
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
                      <div className="col-md-6 d-flex justify-content-end">
                        <Button
                          color="primary"
                          className="btn btn-primary waves-effect waves-light mt-2"
                          type="submit"
                          id="btn-tra-cuuDC"
                          style={{ marginRight: 10 }}
                        >
                          <i className="fas fa-search "></i>&nbsp;Tìm kiếm
                        </Button>
                        <Button
                          color="info"
                          className="btn btn-primary waves-effect waves-light mt-2"
                          type="submit"
                          id="btn-tra-cuuDC"
                          style={{ marginRight: 10 }}
                          onClick={() => {
                            const paramExport = checkKeyNull({ ...params, export: "PAGE" })
                            const url = `${apiExportReport}${convertParamsToQuery({ page: pageSize.page, size: pageSize.size })}`
                            exportFile({
                              url: url,
                              type: "xlsx",
                              method: "POST",
                              body: paramExport,
                              name: "BaoCaoDoanhThu"
                            })
                          }}

                        >
                          <i className="fas fa-print"></i>&nbsp;Xuất dữ liệu hiện tại
                        </Button>
                        <Button
                          color="info"
                          className="btn btn-primary waves-effect waves-light mt-2"
                          type="submit"
                          id="btn-tra-cuuDC"
                          onClick={() => {
                            const paramExport = { ...params, export: "N0_PAGE" }
                            exportFile({
                              url: `${apiExportReport}`,
                              type: "xlsx",
                              method: "POST",
                              body: paramExport,
                              name: "BaoCaoDoanhThu"
                            })
                          }}
                        >
                          <i className="fas fa-print"></i>&nbsp;Xuất dữ liệu
                        </Button>
                      </div>
                    </Row>
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

export default DanhSachGD