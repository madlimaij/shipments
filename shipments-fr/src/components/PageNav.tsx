import React, { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PageNav = ({
  pageCount,
  pageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
}: any) => {
  const paginationItems = useMemo(() => {
    const items = [];

    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pageIndex + 1}
          onClick={() => {
            window.scrollTo(0, 0);
            gotoPage(i - 1);
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  }, [gotoPage, pageIndex, pageCount]);

  return (
    <div className="d-flex justify-content-center my-3">
      <Pagination className="justify-content-center">
        <Pagination.Prev
          disabled={!canPreviousPage}
          onClick={() => {
            window.scrollTo(0, 0);
            previousPage();
          }}
        />
        {paginationItems}
        <Pagination.Next
          disabled={!canNextPage}
          onClick={() => {
            window.scrollTo(0, 0);
            nextPage();
          }}
        />
      </Pagination>
    </div>
  );
};

export default PageNav;
