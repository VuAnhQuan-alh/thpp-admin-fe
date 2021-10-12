import React, { useState } from "react";
import { withRouter } from "react-router";
import { CardBody, CardTitle, Card, Table } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes"
import ModalChiTietHoaDon from "./ModalChiTietHoaDon";


export const TableData = (props) => {
    const { data, history } = props
    const [modalDetail, setModalDetail] = useState(false);
    const [itemSelected, setItemSelected] = useState({});
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
                                    <th>STT</th>
                                    <th>Bệnh viện/Phòng khám</th>
                                    <th>Kênh thực hiện</th>
                                    <th>Mã hóa đơn</th>
                                    <th>Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Dịch vụ</th>
                                    <th>Mã giao dịch</th>
                                    <th>Tổng tiền</th>
                                    <th>Ngày giao dịch</th>
                                    <th>Trang thái </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data && data.data.map((item, index) => (
                                    <tr>
                                        <th>{index}</th>
                                        <th>{item?.hospitalName}</th>
                                        <th>{item?.gatewayCode}</th>
                                        <th>
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
                                        </th>
                                        <th>{item?.customerName}</th>
                                        <th>{item?.phone}</th>
                                        <th>{item?.serviceName}</th>
                                        <th>
                                            <a
                                                style={{ textDecorationLine: "underline" }}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    history.push("/Doi-soat-giao-dich-VNPay")
                                                }}
                                            >
                                                {item?.transactionNo}
                                            </a>
                                        </th>
                                        <th>{item?.amount}</th>
                                        <th>{item?.transactionDate}</th>
                                        <th>{item?.statusSys}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </CardBody>
            <PaginationRes
                totalItems={data?.meta?.totalItems | 10}
                totalPages={data?.meta?.totalPage | 2}

            // onChangePage={(e) => setPageSize({ ...pageSize, page: e })}
            // currentPage={pageSize?.page}
            />
            <ModalChiTietHoaDon modalDetail={modalDetail} setModalDetail={setModalDetail} item={itemSelected} />
        </Card>
    )
}

export default withRouter(TableData)