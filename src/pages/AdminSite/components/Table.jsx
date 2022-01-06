import React, { useState } from "react";
import { withRouter } from "react-router";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes";
import Item from "./Item";

const styleTH = {
  overflow: "hidden",
  whiteSpace: "nowrap"
}
export const TableData = (props) => {
  const { data, history } = props
  const [itemSelected, setItemSelected] = useState({});

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
                  <th style={styleTH}>Username</th>
                  <th style={styleTH}>Email</th>
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
                {data && data?.map((item, index) => <Item key={index} data={item} styleTH={styleTH} />)}
                {data && data.length === 0 && <tr><th colSpan="12" className="text-center">Không tìm thấy kết quả thỏa mãn điều kiện</th></tr>}
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