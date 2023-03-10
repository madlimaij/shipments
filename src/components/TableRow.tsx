import React, { MouseEventHandler, useState } from 'react';
import { Row } from 'react-table';
import DetailsBox from './DetailsBox';
import { dRow } from './Table';

type TableRowProps = {
  row: Row<dRow>;
  removeRow: MouseEventHandler<HTMLButtonElement>;
};

export const TableRow: React.FC<TableRowProps> = ({ row, removeRow }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailView = () => {
    setShowDetails(true);
  };

  const handleModalClose = () => {
    setShowDetails(false);
  };

  console.log(showDetails, 'tablerow row');

  return (
    <>
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()} key={`${cell.column.id}-${row.id}`}>
            {/* id??? */}
            {cell.render('Cell')}
          </td>
        ))}
        <td>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={handleDetailView}
            >
              Details
            </button>
            <button onClick={removeRow} className="btn btn-dark btn-sm">
              X
            </button>
          </div>
          {showDetails && <DetailsBox row={row} onClose={handleModalClose} />}
        </td>
      </tr>
    </>
  );
};
