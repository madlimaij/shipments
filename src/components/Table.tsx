import React, { useMemo } from 'react';
import { Row, usePagination, useTable } from 'react-table';
import { Shipment, useShipments } from '../views/ShipmentsProvider';
import PageNav from './PageNav';
import './table.css';
import { TableRow } from './TableRow';

const Table: React.FC = () => {
  const { shipments, deleteShipment } = useShipments();
  console.log(shipments);

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
      {shipments.length > 0 ? (
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
                return (
                  <TableRow
                    row={row}
                    removeRow={() => deleteShipment(row.original.orderNo)}
                    key={row.original.orderNo}
                  />
                ); //change id?
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
