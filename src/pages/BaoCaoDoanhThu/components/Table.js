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

  const [totalPage, setTotalPage] = useState(0)
  React.useEffect(() => {
    console.log(data)
  }, [data])
  React.useEffect(() => {
    setTotalPage(0)
    if (data?.meta > 0) {
      setTotalPage(Math.ceil(data.meta / pageSize.size))
    }
  }, [data, pageSize])

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
                  <Th style={styleTH}>Tổng tiền (vnđ)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data && data.data.map((item, index) => (
                  <tr>
                    <th>{item?.hospitalName || "Empty data"}</th>
                    <th>{item?.serviceName}</th>
                    <th>{item?.channelType ? item.channelType === 0 ? "Mobile" : "Website" : "Empty data"}</th>
                    <th>{item?.amount}</th>
                  </tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </CardBody>
      <PaginationRes
        totalItems={data?.meta || 0}
        totalPages={totalPage}
        onChangePage={(e) => {
          setPageSize({ ...pageSize, page: e })
        }}
        onChangeSize={(e) => {
          setPageSize({ ...pageSize, size: e })
        }}
        currentPage={pageSize?.page}
      />
    </Card>
  )
}

export default withRouter(TableData)