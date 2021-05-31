import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteAccount() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Delete Account</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ color: "red" }}>Are you sure you want to <bold>delete your account?</bold></h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteAccount;