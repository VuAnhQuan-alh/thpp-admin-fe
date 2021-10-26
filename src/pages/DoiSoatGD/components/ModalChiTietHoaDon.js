import { Form, Formik } from "formik";
import React from "react";
import { Card, CardBody, Col, Modal, Row } from "reactstrap";

export default (props) => {
  const { modalDetail, setModalDetail, item } = props

  return (
    <Modal isOpen={modalDetail} size="xl" centered toggle={() => { setModalDetail(!modalDetail) }}>
      <Card>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Chi Tiết Hóa Đơn
          </h5>
        </div>
        <CardBody>
          <div className="">
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={item}
              enableReinitialize
              onSubmit={(values, { resetForm }) => { }}
            >
              {({ values }) => {
                return (
                  <Form>
                    <Row>
                      <Col md="12">
                      </Col>
                      <Col md="12">
                        <div className="flex-box-column">
                        </div>
                      </Col>
                      <Col md="12">
                        <div className="flex-box-column">
                        </div>
                      </Col>

                      {/* <Col md="12">
                        <div className="flex-box-column">
                          <FormBt values={values} />
                          <hr />
                        </div>
                      </Col> */}
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </CardBody>
        <div class="d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-danger" onClick={() => { setModalDetail(!modalDetail) }}>
            <i className=" fas fa-window-close"></i>
            <span style={{ paddingLeft: 10 }}>
              Đóng
            </span>
          </button>
        </div>
      </Card>
    </Modal>
  )
}