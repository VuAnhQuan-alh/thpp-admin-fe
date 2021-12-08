import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";
import DatePicker from "../../components/DatePicker";
import SelectBenhVien from "../../components/SelectBenhVien";
import { checkKeyNull, convertParamsToQuery, seo } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DoisoatGDVNPay";
import Table from "./components/Table";
import { CardBody, Row, Card, Button } from "reactstrap";
import SelectStatusSys from "../../components/SelectStatusSys";
import SelectCTT from "../../components/SelectCTT";
import { apiExportTrans } from "../../constrains/apiURL";
import exportFile from "../../services/apiFunction/exportFile";
import moment from "moment";

const DoiSoatGD = () => {
  React.useEffect(() => {
    setParams(initialValues)
  }, [])
  const [pageSize, setPageSize] = useState({ page: 1, size: 10 });
  const [params, setParams] = useState({});
  const [data, setData] = useState([])
  const trans = window.localStorage.getItem("txnRef")
  const initialValues = {
    hospitalType: null,
    customerName: "",
    startDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    txnRef: trans,
    gatewayCode: null,
    statusSys: null,
  }

  React.useEffect(() => {
    if (trans !== null) {
      apiSearch(checkKeyNull({ txnRef: trans, page: 1, size: 10 }))
        .then(res => {
          window.localStorage.removeItem("txnRef")
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
        <ToastContainer />
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
                initialValues={initialValues}
                onSubmit={(values) => {
                  if (!values?.startDate || !values?.endDate) {
                    toast.error('Từ ngày và Đến ngày không được bỏ trống', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    setParams(checkKeyNull(values));
                    setPageSize({ ...pageSize, page: 1 })
                  }
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
                          maxDate={moment(propsFormik?.values?.endDate, "YYYY-MM-DD").toDate()}
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="endDate"
                          component={DatePicker}
                          title="Đến ngày"
                          minDate={moment(propsFormik?.values?.startDate, "YYYY-MM-DD").toDate()}
                          maxDate={moment(new Date(), "YYYY-MM-DD").toDate()}
                        />
                      </div>
                    </Row>
                    <Row className="d-flex justify-content-between align-items-end mt-3">
                      <div className="col-md-3" style={{ marginBottom: "-5px" }}>
                        <Field
                          name="txnRef"
                          component={InputField}
                          label="Tìm kiếm theo mã giao dịch"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="gatewayCode"
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
                        style={{ marginRight: "20px" }}
                        onClick={() => {
                          const paramExport = checkKeyNull({ ...params, export: "PAGE" })
                          const url = `${apiExportTrans}${convertParamsToQuery({ page: pageSize.page, size: pageSize.size })}`
                          if (paramExport?.endDate === undefined || paramExport?.startDate === undefined) {
                            toast.error('Từ ngày và Đến ngày không được bỏ trống', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          } else {
                            exportFile({
                              url: url,
                              type: "xlsx",
                              method: "POST",
                              body: paramExport,
                              name: "BaoCaoDoanhThu"
                            })
                          }
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
                          const paramExport = checkKeyNull({ ...params, export: "N0_PAGE" })
                          if (paramExport?.endDate === undefined || paramExport?.startDate === undefined) {
                            toast.error('Từ ngày và Đến ngày không được bỏ trống', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          } else {
                            exportFile({
                              url: `${apiExportTrans}`,
                              type: "xlsx",
                              method: "POST",
                              body: paramExport,
                              name: "BaoCaoDoanhThu"
                            })
                          }
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
          <Table data={data} pageSize={pageSize} setPageSize={setPageSize} />
        </Row>
      </div>
    </React.Fragment>
  )
}

export default DoiSoatGD