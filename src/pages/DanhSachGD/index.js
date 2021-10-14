import React, { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";

import { callAPIPaging, checkCallAPI, checkKeyNull } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DanhSachGD";
import Table from "./components/Table";
import { isEmpty } from "lodash";
import { CardBody, Col, Row, Card, Button } from "reactstrap";
import SelectBenhVien from "../../components/SelectBenhVien";
import SelectDV from "../../components/SelectDV";

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

          console.log("response")
          setData({ data: response.data.data, meta: response.meta });
        },
        response: res,
      })
      // console.log("response", res);
    })
  }

  useEffect(() => {
    CallDanhSachGD();
  }, [pageSize])

  return (
    <React.Fragment>
      <div className="page-content">
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
                  benhVien: "",
                  startDate: "2021-10-10",
                  enDate: "",
                  trangThaiGD: "",
                  trangThaiVNPay: "",
                  keySearch: "",

                }}
                onSubmit={(values) => {
                  setParams(values);
                  setPageSize({ ...pageSize, page: 0, size: 10 })
                }}
              >
                {() => (
                  <Form>
                    <div class="row">
                      <div class="col-sm-6 col-md-2 col-xs-6">
                        <Field
                          name="benhVien"
                          component={SelectBenhVien}
                          title="Bệnh viện/phòng khám"
                        /></div>
                      <div class="col-sm-6 col-md-2 col-xs-6">
                        <Field
                          name="startDate"
                          component={DatePicker}
                          title="Từ ngày"
                        />
                      </div>
                      <div class="col-sm-6 col-md-2 col-xs-6">
                        <Field
                          name="endDate"
                          component={DatePicker}
                          title="Đến ngày"
                        />
                      </div>
                      <div class="col-sm-6 col-md-2 col-xs-6">
                        <Field
                          name="benhVien"
                          component={InputField}
                          label="Kênh thực hiện"
                        />
                      </div>
                      <div class="col-sm-6 col-md-2 col-xs-6">
                        <Field
                          name="benhVien"
                          component={SelectDV}
                          title="Dịch vụ"
                        />
                      </div>
                      <div class="col-sm-6 col-md-2 col-xs-6">
                        <Field
                          name="benhVien"
                          component={InputField}
                          label="Tìm kiếm theo mã, hóa đơn"
                        />
                      </div>
                      <div class="col-sm-6 col-md-3 col-xs-6 justify-content-start  d-flex align-items-center" >
                        <Button
                          color="secondery"
                          className="btn btn-primary waves-effect waves-light mt-2"
                          type="submit"
                          id="btn-tra-cuuDC"
                          style={{ marginRight: 10 }}
                        >
                          <i className="fas fa-search "></i> Tìm kiếm
                        </Button>
                        <Button
                          color="secondery"
                          className="btn btn-primary waves-effect waves-light mt-2"
                          type="submit"
                          id="btn-tra-cuuDC"
                        >
                          <i class="fas fa-print"></i>Xuất excel
                        </Button>
                      </div>
                      {/* <div class="col-sm-6 col-md-1 col-xs-6 justify-content-center d-flex align-items-center">
                        
                      </div> */}
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

export default DanhSachGD