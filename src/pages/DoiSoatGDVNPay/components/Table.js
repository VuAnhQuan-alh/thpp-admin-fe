import React, { useState } from "react";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import { CardBody, CardTitle, Row, Card } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes"
export default (props) => {
    const { data } = props
    const [modalDetail, setModalDetail] = useState(false);
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
                                    <Th data-priority="1">Mã Giao dịch</Th>
                                    <Th data-priority="3">Mã tham chiếu VNPay</Th>
                                    <Th data-priority="1">Bệnh viện/Phòng khám</Th>
                                    <Th data-priority="3">Khách hàng</Th>
                                    <Th data-priority="3">Số điện thoại</Th>
                                    <Th data-priority="6">Dịch vụ</Th>
                                    <Th data-priority="6">Tổng tiền(vnđ)</Th>
                                    <Th data-priority="6">Kênh giao dịch</Th>
                                    <Th data-priority="3">Ngày giao dịch</Th>
                                    <Th data-priority="6">Trang thái giao dịch </Th>
                                    <Th data-priority="6">Trạn thái VNPay</Th>
                                    <Th data-priority="6">Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data && data.data.map((item, index) => (
                                    <Tr>
                                        <Th data-priority="1">{index}</Th>
                                        <Th data-priority="1">{item?.transactionNo}</Th>
                                        <Th data-priority="3">{item?.gatewayCode}</Th>
                                        <Th data-priority="1">{item?.hospitalName}</Th>
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
                totalItems={data?.meta?.totalItems | 10}
                totalPages={data?.meta?.totalPage | 2}
            // onChangePage={(e) => setPageSize({ ...pageSize, page: e })}
            // currentPage={pageSize?.page}
            />
        </Card>
    )
}