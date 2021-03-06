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
                  <Th className="text-center">STT</Th>
                  <Th style={styleTH}>Bệnh viện/Phòng khám</Th>
                  <Th style={styleTH}>Sản phẩm/Dịch vụ</Th>
                  <Th className="text-center" style={styleTH}>Kênh thực hiện</Th>
                  <Th style={styleTH} className="text-end">Tổng tiền (vnđ)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data && data.data.map((item, index) => (
                  <tr key={index}>
                    <th className="text-center">{++index}</th>
                    <th>{item?.hospitalName}</th>
                    <th>{item?.serviceName}</th>
                    <th className="text-center">{item?.channelType ? item.channelType === 0 ? "Mobile" : "Website" : ""}</th>
                    <th className="text-end">{new Intl.NumberFormat().format(item?.amount)} ₫</th>
                  </tr>
                ))}
                {data?.data && data?.data.length === 0 && <Tr><Th colSpan="13" className="text-center">Không tìm thấy kết quả thỏa mãn điều kiện</Th></Tr>}
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
          setPageSize({ ...pageSize, size: e, page: 1 })
        }}
        currentPage={pageSize?.page}
      />
    </Card>
  )
}

export default withRouter(TableData)