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
import SelectChanel from "../../components/SelectChanel";
import { printFile } from "../../services/apiFunction/printFile";
import { apiExportFile } from "../../constrains/apiURL";

const DanhSachGD = () => {
  const [pageSize, setPageSize] = useState({ page: 0, size: 10 });
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);
  const CallDanhSachGD = () => {
    if (isEmpty(params)) return
    const paramSearch = { ...params, page: pageSize.page, size: pageSize.size };
    apiSearch(checkKeyNull(paramSearch)).then((res) => {
      callAPIPaging({
        size: pageSize.size,
        onError: (e) => {
          setData({ data: [], meta: { totalPage: 1 } });
        },
        onSuccess: (response) => {
          setData({ data: response.data.data, meta: response.meta });
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
      <div className="page-content">
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
                  startDate: "",
                  enDate: "",
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
                          component={SelectChanel}
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
                            const paramExport = { ...params, ...pageSize }
                            printFile({
                              url: `${apiExportFile}${convertParamsToQuery(checkKeyNull(paramExport))}`,
                              type: "xlsx",
                              method: "GET",
                              name: "DSDoiSoatGiaoDich"
                            })
                          }}

                        >
                          <i className="fas fa-print"></i>&nbsp;In trang
                        </Button>
                        <Button
                          color="info"
                          className="btn btn-primary waves-effect waves-light mt-2"
                          type="submit"
                          id="btn-tra-cuuDC"
                        >
                          <i className="fas fa-print"></i>&nbsp;In tất cả
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
          <Table data={data} />
        </Row>
      </div>
    </React.Fragment>
  )
}

export default DanhSachGD