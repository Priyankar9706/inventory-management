import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ showModal,showModalFunction, hideModalFunction, deleteAllCart}) => {
    return (
        <Modal show={showModal} onHide={hideModalFunction}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">Do you want to clear the cart?</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModalFunction}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteAllCart() }>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;