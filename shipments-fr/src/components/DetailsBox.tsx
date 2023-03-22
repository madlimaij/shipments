import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Row } from 'react-table';
import { capFirstLetter } from '../utils/helpers';
import { Shipment, useShipments } from '../views/ShipmentsProvider';

type DetailsBoxProps = {
  row: Row<Shipment>;
  onClose: () => void;
};

const DetailsBox: React.FC<DetailsBoxProps> = ({ row, onClose }) => {
  const { error, updateShipments } = useShipments();

  const {
    register,
    formState: { errors }, // @Todo: validation!
    handleSubmit,
  } = useForm<Shipment>();

  const onSubmit = (data: Shipment) => {
    updateShipments(row.original.orderNo, data);
    onClose();
  };

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shipment details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant={'warning'}>Something went wrong...</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            {row.cells.map((cell) => {
              return (
                <div className="mb-3" key={`${cell.column.id}-${row.id}`}>
                  <label htmlFor={cell.value} className="form-label">
                    {capFirstLetter(cell.column.id)}
                  </label>
                  <input
                    id={cell.value}
                    readOnly={cell.column.id === "orderNo" && true}
                    className="form-control"
                    defaultValue={cell.value}
                    {...register(
                      cell.column.id as
                        | 'consignee'
                        | 'customer'
                        | 'date'
                        | 'orderNo'
                        | 'status'
                        | 'trackingNo'
                    )}
                  ></input>
                </div>
              );
            })}
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailsBox;

