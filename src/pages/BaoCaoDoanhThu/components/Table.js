import React, { useState } from "react";
import { withRouter } from "react-router";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import PaginationRes from "../../../components/PaginationRes";


export const TableData = (props) => {
    const { data, history } = props
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
                                    <th>Dịch vụ</th>
                                    <th>Tổng tiền</th>
                                    <th>Bác sĩ</th>
                                    <th>Ngày giao dịch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data && data.data.map((item, index) => (
                                    <tr>
                                        <th>STT</th>
                                        <th>Bệnh viện/Phòng khám</th>
                                        <th>Kênh thực hiện</th>
                                        <th>Dịch vụ</th>
                                        <th>Tổng tiền</th>
                                        <th>Bác sĩ</th>
                                        <th>Ngày giao dịch</th>
                                    </tr>
                                ))}
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