import React, { useState } from "react";
import { withRouter } from "react-router";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes";

const styleTH = {
  overflow: "hidden",
  whiteSpace: "nowrap"
}
export const TableData = (props) => {
  const { data, history } = props
  const [itemSelected, setItemSelected] = useState({});
  const [onChange, setOnChange] = React.useState(false)
  const iptEl = React.useRef(null)
  const [statusUser, setStatusUser] = useState(false)

  return (
    <Card>
      <CardBody>
        <CardTitle className="h4">Danh sách nhân viên</CardTitle>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered"
            >
              <thead className="text-center">
                <tr>
                  <th style={styleTH}></th>
                  <th style={styleTH}>Nhân viên</th>
                  <th style={styleTH}>Email</th>
                  <th style={styleTH}>Username</th>
                  <th style={styleTH}>First sync</th>
                  <th style={styleTH}>Đối soát giao dịch</th>
                  <th style={styleTH}>Danh sách giao dịch</th>
                  <th style={styleTH}>Báo cáo doanh thu</th>
                  <th style={styleTH}>Quản trị</th>
                  <th style={styleTH}>Hoạt động</th>
                  <th style={styleTH}>Số điện thoại</th>
                  <th style={styleTH}>Cmnd/cccd</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <th>
                    <div style={{ width: "70px", textAlign: "center" }}>
                      <button
                        className={onChange ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}
                        onClick={() => setOnChange(!onChange)}>
                        {onChange ? "Update" : "Edit"}
                      </button>
                    </div>
                  </th>
                  <td style={styleTH}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "max-content" }}>
                      <i className="fas fa-user-tie"></i>
                      <div style={{ marginLeft: "10px" }}>Nguyen Hoang Tung</div>
                    </div>
                  </td>
                  <td style={styleTH}>tungnh@sphinxjsc.com</td>
                  <td style={styleTH}>tungSphinxJSC</td>
                  <td style={styleTH}>True</td>
                  <td>
                    <input
                      type="checkbox"
                      name="fControl"
                      id="fControl"
                      disabled={!onChange}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="invoice"
                      id="invoice"
                      disabled={!onChange}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="sales"
                      id="sales"
                      disabled={!onChange}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="admin"
                      id="admin"
                      disabled={!onChange}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        ref={iptEl}
                        type="checkbox"
                        name="sta"
                        id="sta"
                        role="switch"
                        disabled={!onChange}
                        className="form-check-input"
                        onClick={() => setStatusUser(!statusUser)}
                      />
                      <div style={{ width: "70px", textAlign: "right" }}>{statusUser ? "Active" : "Inactive"}</div>
                    </div>
                  </td>
                  <td style={styleTH}>0383072806</td>
                  <td style={styleTH}>187925792</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </CardBody>
      <PaginationRes
        totalItems={data?.meta?.totalItems | 0}
        totalPages={data?.meta?.totalPage | 1}
      />
    </Card>
  )
}

export default withRouter(TableData)