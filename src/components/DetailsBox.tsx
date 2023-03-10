import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Row } from 'react-table';
import { updateShipment } from '../services/api';
import { capFirstLetter } from '../utils/helpers';
import { dRow } from './Table';

type DetailsBoxProps = {
  row: Row<dRow>;
  onClose: () => void;
};

const DetailsBox: React.FC<DetailsBoxProps> = ({ row, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any, e: any) => { //@Todo: Test it!
    //Todo:any!!
    updateShipment(row.original.orderNo, data);
    console.log(e, data, 'e and data');
  };

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shipment details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            {row.cells.map((cell) => (
              <div className="mb-3" key={`${cell.column.id}-${row.id}`}>
                <label htmlFor={cell.value} className="form-label">
                  {capFirstLetter(cell.column.id)}
                </label>
                <input
                  id={cell.value}
                  className="form-control"
                  defaultValue={cell.value}
                  {...register}
                ></input>
              </div>
            ))}
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



//Draft
/*     <div
      className="modal fade show"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Shipment details
            </h5>
            <button
              type="button"
              className="btn-close"
            //   data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=>onClose}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {row.cells.map((cell) => (
                <div className="mb-3" key={`${cell.column.id}-${row.id}`}>
                  <label htmlFor={cell.value} className="form-label">
                    {capFirstLetter(cell.column.id)}
                  </label>
                  <input
                    id={cell.value}
                    className="form-control"
                    defaultValue={cell.value}
                    {...register}
                  ></input>
                </div>
              ))}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                //   data-bs-dismiss="modal"
                  onClick={()=>onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> */
