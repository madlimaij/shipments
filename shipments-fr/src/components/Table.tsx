import React, { useMemo } from 'react';
import { Alert } from 'react-bootstrap';
import { Row, usePagination, useTable } from 'react-table';
import { Shipment, useShipments } from '../views/ShipmentsProvider';
import PageNav from './PageNav';
import { TableRow } from './TableRow';

const Table: React.FC = () => {
  const { error, shipments, setError } = useShipments();

  // Should put columns and tableData to parent component
  const columns = useMemo(() => {
    return Object.keys(shipments[0]).map((header) => ({
      header: header.toUpperCase(),
      accessor: header,
    }));
  }, [shipments]);

  const tableData = useMemo(() => shipments, [shipments]);  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      // @ts-ignore
      columns,
      data: tableData,
      // @ts-ignore
      initialState: { pageIndex: 0 },
    },
    usePagination
  ) as any;

  return (
    <>
      {error && <Alert variant={'warning'}>Something went wrong...</Alert>}
      {shipments ? (
        <div className="table-responsive">
          <table {...getTableProps} className="table">
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps()} scope="col">
                      {column.render('header')}
                    </th>
                  ))}
                  <th scope="col"></th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: Row<Shipment>) => {
                prepareRow(row);
                return <TableRow row={row} key={row.original.orderNo} />;
              })}
            </tbody>
          </table>
          <PageNav
            pageCount={pageCount}
            pageIndex={pageIndex}
            previousPage={previousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            gotoPage={gotoPage}
          />
        </div>
      ) : (
        <div>No data to display</div>
      )}
    </>
  );
};

export default Table;
