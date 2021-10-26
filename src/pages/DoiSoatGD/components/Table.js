import React, { useState } from "react";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import { CardBody, CardTitle, Row, Card } from "reactstrap";
import { ArrayMessageInvoice } from "../../../common/data/message-invoice";
import PaginationRes from "../../../components/PaginationRes"
export default ({ data, setPageSize, pageSize }) => {
  // const [modalDetail, setModalDetail] = useState(false);
  const [totalPage, setTotalPage] = React.useState(0)
  const checkStatus = (sys) => {
    const result = ArrayMessageInvoice.find(i => {
      for (const [key, value] of Object.entries(i)) {
        if (sys === value) return true
        return false
      }
    })
    return result['MESS']
  }
  React.useEffect(() => {
    setTotalPage(0)
    if (data?.total > 0) {
      setTotalPage(Math.ceil(data.total / pageSize.size))
    }
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
                  <Th data-priority="1">STT</Th>
                  <Th data-priority="1" style={{ minWidth: "200px" }}>Bệnh viện/Phòng khám</Th>
                  <Th data-priority="3" style={{ minWidth: "180px" }}>Khách hàng</Th>
                  <Th data-priority="3" style={{ minWidth: "140px" }}>Số điện thoại</Th>
                  <Th data-priority="6" style={{ minWidth: "160px" }}>Dịch vụ</Th>
                  <Th data-priority="6" style={{ minWidth: "140px" }}>Tổng tiền(vnđ)</Th>
                  <Th data-priority="6" style={{ minWidth: "140px" }}>Kênh giao dịch</Th>
                  <Th data-priority="3" style={{ minWidth: "180px" }}>Ngày giao dịch</Th>
                  <Th data-priority="6" style={{ minWidth: "160px" }}>Trang thái giao dịch </Th>
                  <Th data-priority="6" style={{ minWidth: "160px" }}>Cổng Thanh toán</Th>
                  <Th data-priority="1" style={{ minWidth: "140px" }}>Mã Giao dịch</Th>
                  <Th data-priority="3" style={{ minWidth: "130px" }}>Mã tham chiếu</Th>
                  <Th data-priority="6" style={{ minWidth: "120px" }}>Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data && data.data.map((item, index) => (
                  <Tr key={index}>
                    <Th data-priority="1">{index}</Th>
                    <Th data-priority="1">{item?.hospitalName}</Th>
                    <Th data-priority="1">{item?.transactionNo}</Th>
                    <Th data-priority="3">{item?.gatewayCode}</Th>
                    <Th data-priority="3">{item?.customerName}</Th>
                    <Th data-priority="3">{item?.phone}</Th>
                    <Th data-priority="6">{item?.serviceName}</Th>
                    <Th data-priority="6">{item?.amount}</Th>
                    <Th data-priority="6">{item?.gatewayName}</Th>
                    <Th data-priority="3">{item?.transactionDate}</Th>
                    <Th data-priority="6">{item?.statusSys}</Th>
                    <Th data-priority="6">{item?.statusSys}</Th>
                    <Th data-priority="6">Thao tác</Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </CardBody>
      <PaginationRes
        totalItems={data?.total || 0}
        totalPages={totalPage}
        onChangePage={(e) => setPageSize({ ...pageSize, page: e })}
        currentPage={pageSize?.page}
      />
    </Card>
  )
}