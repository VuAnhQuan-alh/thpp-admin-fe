import React, { useState } from "react";
import { withRouter } from "react-router";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import { CardBody, CardTitle, Card } from "reactstrap";
import { ArrayMessageInvoice } from "../../../common/data/message-invoice";
import PaginationRes from "../../../components/PaginationRes"
import { checkStatusSys } from "../../../helpers/functions";
import ModalChiTietHoaDon from "./ModalChiTietHoaDon";

const styleTH = {
  overflow: "hidden",
  whiteSpace: "nowrap"
}
export const TableData = ({ data, history, setPageSize, pageSize }) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [totalPage, setTotalPage] = useState(0)

  React.useEffect(() => {
    setTotalPage(0)
    if (data?.total > 0) {
      setTotalPage(Math.ceil(data.total / pageSize.size))
    }
  }, [data])

  return (
    <Card>
      <CardBody>
        <CardTitle className="h4">thông tin đối soát </CardTitle>
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
                  <Th style={styleTH}>STT</Th>
                  <Th style={styleTH}>mã giao dịch</Th>
                  <Th style={styleTH}>Bệnh viện/Phòng khám</Th>
                  <Th style={styleTH}>Kênh thực hiện</Th>
                  <Th style={styleTH}>Cổng thanh toán</Th>
                  <Th style={styleTH}>Mã hóa đơn</Th>
                  <Th style={styleTH}>Khách hàng</Th>
                  <Th style={styleTH}>Số điện thoại</Th>
                  <Th style={styleTH}>Dịch vụ</Th>
                  <Th style={styleTH}>Tổng tiền (đ)</Th>
                  <Th style={styleTH}>Ngày giao dịch</Th>
                  <Th style={styleTH}>Trang thái </Th>
                </Tr>
              </Thead>
              <Tbody style={{ textAlign: "center" }}>
                {data?.data && data.data.map((item, index) => (
                  <Tr key={index}>
                    <Th style={styleTH}>{++index}</Th>
                    <Th style={styleTH}>
                      <a
                        style={{ textDecorationLine: "underline" }}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          // history.push(`/Doi-soat-giao-dich/${item?.transactionNo}`)
                          history.push("/Doi-soat-giao-dich")
                        }}
                      >
                        {item?.transactionNo}
                      </a>
                    </Th>
                    <Th style={styleTH}>{item?.hospitalName}</Th>
                    <Th style={styleTH}>{item?.chanelType === 1 ? "Mobile" : item?.chanelType === 2 ? "Website" : null}</Th>
                    <Th style={styleTH}>{item?.gatewayName}</Th>
                    <Th style={styleTH}>
                      <a
                        style={{ textDecorationLine: "underline" }}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setItemSelected(item);
                          setModalDetail(true);
                        }} >
                        {item?.orderInfo}
                      </a>
                    </Th>
                    <Th style={styleTH}>{item?.customerName}</Th>
                    <Th style={styleTH}>{item?.phone}</Th>
                    <Th style={styleTH}>{item?.serviceName}</Th>
                    <Th style={styleTH}>{item?.amount}</Th>
                    <Th style={styleTH}>{item?.transactionDate ? `${item?.transactionDate.substring(6, 8)}/${item?.transactionDate.substring(4, 6)}/${item?.transactionDate.substring(0, 4)}` : "Null"}</Th>
                    <Th style={styleTH}>{item?.statusSys ? checkStatusSys(item?.statusSys) : "Null"}</Th>
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

      <div style={{ position: "relative" }}>
        <ModalChiTietHoaDon modalDetail={modalDetail} setModalDetail={setModalDetail} item={itemSelected} />
      </div>
    </Card>
  )
}

export default withRouter(TableData)