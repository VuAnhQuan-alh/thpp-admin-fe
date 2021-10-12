import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { createUltimatePagination } from "react-ultimate-pagination";
import { Col, Row } from "reactstrap";
// import { createUltimatePagination } from "react-ultimate-pagination-bootstrap-4";

interface Option {
  value: number;
  label: string;
}

const arr: Option[] = [
  { value: 3, label: "3" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: 300, label: "300" },
  { value: 500, label: "500" },
];

const customStyles = {
  // Nếu có ...provider thì sẽ mặc định style cũ
  control: (provided, state) => ({
    ...provided,
    // borderColor: "#fff",
    minHeight: "30px",
    height: "30px",
    boxShadow: state.isFocused ? null : null,
    // border: "none",
    // background: "#fff",
    width: "65px",
    // border: "1px"
    borderColor: "#d5d5d5",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 4px",
    textAlign: "center",
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    textAlign: "center",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    textAlign: "center",
  }),
  indicatorSeparator: (provided, state) => ({
    // Thanh phân cách giữa input và nút xuống
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
  dropdownIndicator: (state) => ({
    // Mũi tên trỏ xuống
    // display: dropDownIcon ? "none" : "block",
    margin: "5px",
  }),
  loadingIndicator: (provided, state) => ({
    // loading style
    ...provided,
  }),
};

interface Props {
  totalPages?: number;
  select?: boolean;
  onChangeSize?: (value: Option) => void;
  onChangePage?: (page: number) => void;
  currentPage?: number;
  total: any;
  currentSize?: number;
  totalHandle?: any;
  titleTotal?: any;
  titleHandle?: any;
  cantChangeSize?: boolean;
  styleCustom?: any;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: Props) => {
  const { totalPages, onChangePage, currentSize, cantChangeSize } = props;
  const findSize = () => {
    return (
      arr.find((elm: Option) => elm.value === Number(currentSize)) || arr[0]
    );
  };

  const [page, setPage] = useState(1);
  const [pageSize, setSize] = useState(currentSize ? findSize() : arr[0]);

  const onChangePageState = (currentPage: number) => {
    setPage(currentPage);
    !cantChangeSize && onChangePage && onChangePage(currentPage);
  };

  useEffect(() => {
    if (currentSize) {
      setSize(findSize());
    }
  }, [currentSize]);

  function Page(props) {
    return (
      <button
        type="button"
        style={
          props.isActive
            ? { background: "#8c8c8c", color: "#fff" }
            : { background: "#fff", color: "#8c8c8c" }
        }
        onClick={props.onClick}
        disabled={props.disabled}
        className="customs-btn-border-page"
      >
        {props.value}
      </button>
    );
  }

  function Ellipsis(props) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        className="customs-btn-border-page"
      >
        ...
      </button>
    );
  }

  function FirstPageLink(props) {
    return (
      <button
        onClick={props.onClick}
        disabled={page === 1}
        style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}
        className="customs-btn-border-page"
      >
        <i className="mdi  mdi-arrow-collapse-left" />
      </button>
    );
  }

  function PreviousPageLink(props) {
    return (
      <button
        onClick={props.onClick}
        disabled={page === 1}
        className="customs-btn-disabled-page customs-btn-border-page"
      >
        <i className="mdi  mdi-page-first" />
      </button>
    );
  }

  function NextPageLink(props) {
    return (
      <button
        onClick={props.onClick}
        disabled={page === totalPages}
        className="customs-btn-disabled-page customs-btn-border-page"
      >
        <i className="mdi mdi-page-last" />
      </button>
    );
  }

  function LastPageLink(props) {
    return (
      <button
        onClick={props.onClick}
        disabled={page === totalPages}
        className="customs-btn-disabled-page-page customs-btn-border-page"
        style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
      >
        <i className="mdi mdi-arrow-collapse-right" />
      </button>
    );
  }

  function Wrapper(props) {
    return <div className="pagination">{props.children}</div>;
  }
  const PaginatedPage = createUltimatePagination({
    itemTypeToComponent: {
      PAGE: Page,
      ELLIPSIS: Ellipsis,
      FIRST_PAGE_LINK: FirstPageLink,
      PREVIOUS_PAGE_LINK: PreviousPageLink,
      NEXT_PAGE_LINK: NextPageLink,
      LAST_PAGE_LINK: LastPageLink,
    },
    WrapperComponent: Wrapper,
  });

  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col md={12} className="d-flex justify-content-end align-items-end">
          {Number(totalPages) > 1 && (
            <PaginatedPage
              totalPages={totalPages || 100}
              currentPage={props.currentPage || page}
              onChange={onChangePageState}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};
