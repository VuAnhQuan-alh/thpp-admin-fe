import React, { useState } from "react";
import { withRouter } from "react-router";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes";

export const TableData = (props) => {
  const { data, history } = props
  const [itemSelected, setItemSelected] = useState({});
  const [onChange, setOnChange] = React.useState(false)
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
                  <th style={{ minWidth: "90px" }}></th>
                  <th>Nhân viên</th>
                  <th style={{ minWidth: "150px" }}>Đối soát giao dịch</th>
                  <th style={{ minWidth: "170px" }}>Danh sách giao dịch</th>
                  <th style={{ minWidth: "160px" }}>Báo cáo doanh thu</th>
                  <th style={{ minWidth: "90px" }}>Quản trị</th>
                  <th style={{ minWidth: "100px" }}>Hoạt động</th>
                  <th style={{ minWidth: "130px" }}>Số điện thoại</th>
                  <th style={{ minWidth: "110px" }}>Cmnd/cccd</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <th>
                    <button
                      className={onChange ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}
                      onClick={() => setOnChange(!onChange)}>{onChange ? "Update" : "Edit"}</button>
                  </th>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "max-content" }}>
                      <i class="fas fa-user-tie"></i>
                      <div style={{ marginLeft: "10px" }}>Nguyen Hoang Tung</div>
                    </div>
                  </td>
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
                        type="checkbox"
                        name="sta"
                        id="sta"
                        role="switch"
                        disabled={!onChange}
                        className="form-check-input"
                      />
                    </div>
                  </td>
                  <td>0383072806</td>
                  <td>187925792</td>
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