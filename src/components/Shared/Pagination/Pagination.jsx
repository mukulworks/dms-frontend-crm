import React from "react";
import Pagination from "react-js-pagination";

const GridPagination = ({
  activePage,
  itemsCountPerPage,
  recordCount,
  handlePageChange,
}) => {
  return (
    <>
      <nav className="text-center d-flex justify-content-between align-items-center pt-2">
        <span></span>
        <Pagination
          activePage={activePage + 1}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={recordCount}
          // pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          activeClass="active"
          disabledClass="disabled"
        />
        <span className="pr-2">{activePage + 1} - {itemsCountPerPage} of {recordCount} Items</span>
      </nav>
    </>
  );
};
export default GridPagination;
