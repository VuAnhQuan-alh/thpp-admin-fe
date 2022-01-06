import React from 'react'
import { Row } from 'reactstrap'

export default () => {
  return (
    <React.Fragment>
      <div className="page-content" style={{ maxWidth: "1440px", margin: "10px auto" }}>
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">&nbsp;</h4>
            </div>
          </div>
        </Row>
        Bạn không có quyền truy cập vào trang này
      </div>
    </React.Fragment>
  )
}


