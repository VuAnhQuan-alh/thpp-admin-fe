import React, { useEffect, useState } from "react"
import { Field, Form, Formik } from "formik";
import InputField from "../../components/InputField";

import { callAPIPaging, checkKeyNull, seo } from "../../helpers/functions";
import { apiSearch } from "../../services/apiFunction/DanhSachGD";
import Table from "./components/Table";
import { isEmpty } from "lodash";
import { CardBody, Row, Card, Button } from "reactstrap";
import SelectBenhVien from "../../components/SelectBenhVien";
import { apiGetUsers } from "../../services/apiFunction/Authen";
import CustomSelect from "../../components/CustomSelect";

export default () => {
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
  const CallListUser = () => {
    console.log("params: ", checkKeyNull(params))
    apiGetUsers(checkKeyNull(params)).then(res => {
      setData(res?.data?.data)
    })
  }

  React.useEffect(() => {
    seo({
      title: "Quản Trị",
      metaDescription: "True Hope Admin"
    })
  }, [])

  useEffect(() => {
    CallListUser()
  }, [params])
  // console.log(data)

  return (
    <React.Fragment>
      <div className="page-content" style={{ maxWidth: "1440px", margin: "10px auto" }}>
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Quản trị</h4>
            </div>
          </div>
        </Row>
        <Row>
          <Card>
            <CardBody style={{ backgroundColor: "#FFF" }}>
              <Formik
                initialValues={{
                  name: "",
                  phoneNumber: "",
                  cmndcccd: "",
                  email: "",
                  username: "",
                  firstSync: "",

                }}
                onSubmit={(values) => {
                  setParams(values);
                }}
              >
                {() => (
                  <Form>
                    <Row className="d-flex justify-content-between align-items-center space-x-2">
                      <div className="col-sm-3">
                        <Field
                          name="name"
                          component={InputField}
                          label="Họ tên"
                        />
                      </div>
                      <div className="col-sm-3">
                        <Field
                          name="phoneNumber"
                          component={InputField}
                          label="Số điện thoại"
                        />
                      </div>
                      <div className="col-sm-3">
                        <Field
                          name="cmndcccd"
                          component={InputField}
                          label="CMND/CCCD"
                        />
                      </div>
                      <div className="col-sm-3">
                        <Field
                          name="email"
                          component={InputField}
                          label="Email"
                        />
                      </div>
                    </Row>

                    <Row className="d-flex justify-content-between align-items-center space-x-2">
                      <div className="col-sm-3">
                        <Field
                          name="username"
                          component={InputField}
                          label="Username"
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginBottom: "5px" }}>
                        <Field
                          name="firstSync"
                          component={CustomSelect}
                          options={[
                            { value: true, label: "True" },
                            { value: false, label: "False" }
                          ]}
                          title="First sync"
                        />
                      </div>
                      <div className="col-sm-6 d-flex justify-content-end align-items-end">
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
                        >
                          <i className="fas fa-sync-alt"></i>&nbsp;First Sync
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
