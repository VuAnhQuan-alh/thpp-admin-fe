import React, { useState } from "react";
import { withRouter } from "react-router";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import { Card, CardBody, CardTitle } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes";

const styleTH = {
  overflow: "hidden",
  whiteSpace: "nowrap"
}

export const TableData = ({ data, setPageSize, pageSize }) => {
  const [itemSelected, setItemSelected] = useState({});
  React.useEffect(() => {

  }, [data])

  return (
    <Card>
      <CardBody>
        <CardTitle className="h4">Thông tin đối soát </CardTitle>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered"
            >
              <Thead>
                <Tr>
                  <Th style={styleTH}>Bệnh viện/Phòng khám</Th>
                  <Th style={styleTH}>Sản phẩm/Dịch vụ</Th>
                  <Th style={styleTH}>Kênh thực hiện</Th>
                  <Th style={styleTH}>Tổng tiền</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data && data.data.map((item, index) => (
                  <tr>
                    <th>Bệnh viện/Phòng khám</th>
                    <th>Kênh thực hiện</th>
                    <th>Dịch vụ</th>
                    <th>Tổng tiền</th>
                    <th>Bác sĩ</th>
                    <th>Ngày giao dịch</th>
                  </tr>
                ))}
              </Tbody>
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