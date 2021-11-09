import React, { useState, useEffect } from "react";
import Pagination from "react-responsive-pagination";
import { Col, Row, Button } from "reactstrap";

interface Props {
  totalPages?: number;
  onChangePage?: (page: number) => void;
  onChangeSize?: (size: number) => void;
  currentPage?: number;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (props: Props) => {
  const { totalPages, currentPage, onChangePage, onChangeSize, totalItems } = props;
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10)

  const handlePageChange = (page) => {
    setPage(page);
    onChangePage && onChangePage(page);
  };
  const handleSizeChange = (size) => {
    console.log(size)
    setSize(size)
    onChangeSize && onChangeSize(size)
  }

  return (
    <div className="p-2">
      <Row>
        {window.innerWidth > 768 && <Col md="5" />}
        <Col
          md={`${window.innerWidth > 768 ? "7" : "12"}`}
          className={`d-flex ${totalItems ? "justify-content-between" : "justify-content-end"} align-items-center`}
        >
          {totalPages > 1 && (
            <>
              {totalItems && (
                <div>
                  <b>Tổng số bản ghi: </b>
                  <span>{totalItems || 0}</span>
                </div>
              )}

              <div className="d-flex align-items-center space-x-2">
                <div style={{ margin: "0px 16px 6px 0px" }}>
                  <select value={size} onChange={(e) => handleSizeChange(parseInt(e.target.value))} className="form-select form-select-sm" style={{ maxWidth: "60px" }}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div>
                  <Pagination
                    total={totalPages || 100}
                    current={currentPage || page}
                    onPageChange={(page) => handlePageChange(page)}
                  />
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
