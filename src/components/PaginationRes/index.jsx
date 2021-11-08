import React, { useState, useEffect } from "react";
import Pagination from "react-responsive-pagination";
import { Col, Row, Button } from "reactstrap";

interface Props {
  totalPages?: number;
  onChangePage?: (page: number) => void;
  currentPage?: number;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (props: Props) => {
  const { totalPages, currentPage, onChangePage, totalItems } = props;
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    onChangePage && onChangePage(page);
  };

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
              <div>
                <Pagination
                  total={totalPages || 100}
                  current={currentPage || page}
                  onPageChange={(page) => handlePageChange(page)}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
