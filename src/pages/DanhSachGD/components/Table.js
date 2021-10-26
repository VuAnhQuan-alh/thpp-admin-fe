import React, { useState } from "react";
import { withRouter } from "react-router";
import { CardBody, CardTitle, Card, Table } from "reactstrap";
import { ArrayMessageInvoice } from "../../../common/data/message-invoice";
import PaginationRes from "../../../components/PaginationRes"
import ModalChiTietHoaDon from "./ModalChiTietHoaDon";


export const TableData = ({ data, history, setPageSize, pageSize }) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [totalPage, setTotalPage] = useState(0)
  const checkStatus = (sys) => {
    const result = ArrayMessageInvoice.find(i => {
      for (const [key, value] of Object.entries(i)) {
        if (sys === value) return true;
        return false;
      }
    });
    return result["MESS"];
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
              <thead>
                <tr>
                  <th style={{ minWidth: "54px" }}>STT</th>
                  <th style={{ minWidth: "110px" }}>Mã đối soát</th>
                  <th style={{ width: "max-content", minWidth: "187px" }}>Bệnh viện/Phòng khám</th>
                  <th style={{ minWidth: "130px" }}>Kênh thực hiện</th>
                  <th style={{ width: "max-content", minWidth: "140px" }}>Cổng thanh toán</th>
                  <th style={{ minWidth: "108px" }}>Mã hóa đơn</th>
                  <th style={{ width: "max-content", minWidth: "140px" }}>Khách hàng</th>
                  <th style={{ minWidth: "120px" }}>Số điện thoại</th>
                  <th style={{ width: "max-content", minWidth: "100px" }}>Dịch vụ</th>
                  <th style={{ minWidth: "120px" }}>Tổng tiền (đ)</th>
                  <th style={{ minWidth: "140px" }}>Ngày giao dịch</th>
                  <th style={{ width: "max-content", minWidth: "140px" }}>Trang thái </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {data?.data && data.data.map((item, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>
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
                    </td>
                    <td style={{ minWidth: "max-content", display: "block", textAlign: "left" }}>{item?.hospitalName}</td>
                    <td>{item?.chanelType === 1 ? "Mobile" : item?.chanelType === 2 ? "Website" : null}</td>
                    <td style={{ minWidth: "max-content", display: "block" }}>{item?.gatewayName}</td>
                    <td>
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
                    </td>
                    <td style={{ minWidth: "max-content", display: "block", textAlign: "left" }}>{item?.customerName}</td>
                    <td style={{ textAlign: "left" }}>{item?.phone}</td>
                    <td style={{ minWidth: "max-content", display: "block", textAlign: "left" }}>{item?.serviceName}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.transactionDate ? `${item?.transactionDate.substring(6, 8)}/${item?.transactionDate.substring(4, 6)}/${item?.transactionDate.substring(0, 4)}` : "Null"}</td>
                    <td style={{ minWidth: "max-content", display: "block", textAlign: "left" }}>{item?.statusSys ? checkStatus(item?.statusSys) : "Null"}</td>
                  </tr>
                ))}
              </tbody>
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