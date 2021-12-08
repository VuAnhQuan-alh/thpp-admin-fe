import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

const Detail = () => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="h4">Thông tin chi tiết doanh thu</CardTitle>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div className="d-flex justify-content-start">
                <div style={{ marginRight: "10px" }}>Bệnh viện/ Phòng khám:</div>
                <div>Bệnh viện True Hope</div>
              </div>
              <div className="d-flex justify-content-start">
                <div style={{ marginRight: "10px" }}>Thời gian:</div>
                <div>2021-11-02 / 2021-12-02</div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-start">
                <div style={{ marginRight: "10px" }}>Dịch Vụ:</div>
                <div>Khám tổng thể</div>
              </div>
              <div className="d-flex justify-content-start">
                <div style={{ marginRight: "10px" }}>Kênh thực hiện:</div>
                <div>Mobile</div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-end">Tổng tiền</div>
              <div className="d-flex justify-content-end" style={{ color: "#324FC4" }}>100.000.000 vnd</div>
            </div>
          </div>

        </CardBody>
      </Card>
    </>
  )
}

export default Detail
