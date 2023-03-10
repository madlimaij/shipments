import React, { useMemo } from 'react';
import { Row, usePagination, useTable } from 'react-table';
import { deleteRow } from '../services/api';
import Pagination from './PageNav';
import './table.css';
import { TableRow } from './TableRow';

export type dRow = {
  id: string;
  consignee: string;
  customer: string;
  date: string;
  orderNo: string;
  status: string;
  trackingNo: string;
};

type TableProps = {
  data: dRow[];
  setTableData: React.Dispatch<React.SetStateAction<dRow[]>>;
};

const Table: React.FC<TableProps> = ({ data, setTableData }) => {
  const columns = useMemo(() => {
    return Object.keys(data[0]).map((header) => ({
      header: header.toUpperCase(),
      accessor: header,
    }));
  }, [data]);

  const tableData = useMemo(() => {
    return data
    /*     return data.map((row: dRow) => ({
      ...row,
      id: row.orderNo,
    })); */
  }, [data]);

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

  const removeRow = (id: string) => {
    const newData = [...data];
    setTableData(newData.filter((row) => row.orderNo !== id));
    deleteRow(id);
  };

  return (
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
          {page.map((row: Row<dRow>) => {
            prepareRow(row);
            return (
              <TableRow
                row={row}
                removeRow={() => removeRow(row.original.orderNo)}
                key={row.original.orderNo}
              />
            ); //change id?
          })}
        </tbody>
      </table>
      <Pagination
        pageCount={pageCount}
        pageIndex={pageIndex}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
      />
    </div>
  );
};

export default Table;
