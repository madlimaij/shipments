import React, { useState } from 'react';
import { Row } from 'react-table';
import { Shipment, useShipments } from '../views/ShipmentsProvider';
import DetailsBox from './DetailsBox';
import ModalComponent from './ModalComponent';

type TableRowProps = {
  row: Row<Shipment>;
};

export const TableRow: React.FC<TableRowProps> = ({ row }) => {
  const [showConfirmPropmt, setShowConfirmPropmt] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { deleteShipment } = useShipments();

  const handleDetailView = () => {
    setShowDetails(true);
  };

  const handleModalClose = () => {
    setShowDetails(false);
  };

  return (
    <>
      {showConfirmPropmt && (
        <ModalComponent
          modalTitle={'Delete shipment'}
          secondButton={'Yes'}
          onConfirm={() => {
            deleteShipment(row.original.orderNo);
            setShowConfirmPropmt(false);
          }}
          onClose={() => setShowConfirmPropmt(false)}
        >
          Are You sure You want to delete this shipment?
        </ModalComponent>
      )}
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()} key={`${cell.column.id}-${row.id}`}>
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
            <button
              onClick={() => {
                setShowConfirmPropmt(true);
              }}
              className="btn btn-dark btn-sm"
            >
              X
            </button>
          </div>
          {showDetails && <DetailsBox row={row} onClose={handleModalClose} />}
        </td>
      </tr>
    </>
  );
};
