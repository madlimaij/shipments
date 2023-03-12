//Currently unused
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
  children: React.ReactNode;
  backdrop?: boolean | 'static';
  keyboard?: boolean;
  modalTitle: string;
  close?: string;
  secondButton: string;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: () => void | ((arg: any) => void)
}

const MyModal: React.FC<ModalProps> = ({
  children,
  backdrop = false,
  keyboard = false,
  modalTitle,
  close = 'Close',
  secondButton,
  onConfirm,
  onClose,
}) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {close}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {secondButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
