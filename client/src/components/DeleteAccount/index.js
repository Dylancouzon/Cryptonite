import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import API from "../../utils/api";

function DeleteAccount() {
  // displays Delete Account modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // displays Confirm Delete Account modal
  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  // displays Delete Successful modal
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    document.location.replace('/');
  }
  const handleShowSuccess = () => setShowSuccess(true);

  // display Delete Unsuccessful modal
  const [showFailure, setShowFailure] = useState(false);
  const handleCloseFailure = () => setShowFailure(false);
  const handleShowFailure = () => setShowFailure(true);

  // Handle private key and compare
  const handleSubmit = e => {
    e.preventDefault()
    const privateKey = e.target[0].value
    console.log(privateKey) // test for what is entered
    // Once API is completed on the backend this needs to send over private key and check before deletion
    API.checkPrivateKeyMatch(privateKey)
      .then((res) => {
        if (res.status === 200) {
          // User Account successfully deleted
          console.log(res.data)
          handleShowSuccess();
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response)
          handleShowFailure();
        }
      })
    // Close Confirm modal
    handleCloseConfirm();
  }

  return (
    <>
      {/* Delete Account Button on Sidebar */}
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

      {/* Delete Account modal */}
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
          <h4 style={{ color: "red" }}>Are you sure you want to delete your account?</h4>
        </Modal.Body>
        <Modal.Footer>
          {/* Confirmation modal */}
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // handle closing Delete Account modal and opening Confirm modal
              handleClose();
              handleShowConfirm();
            }
            }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Confirm Delete Account modal */}
      <Modal
        show={showConfirm}
        onHide={handleCloseConfirm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Confirm Delete Account</h3>
          </Modal.Title>
        </Modal.Header>
        <Form id="privateKey" onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <Form.Group>
              <Form.Control type="text" placeholder="Private Key" />
              <Form.Text style={{ color: "red" }}>Please note! This cannot be undone</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="danger" type="submit">Confirm</Button>
          </Modal.Footer>
        </Form>
      </Modal>


      {/* Successful Account Delete */}
      <Modal
        show={showSuccess}
        onHide={handleCloseSuccess}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Your Account has been deleted.</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for using CryptoCoin</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccess}>Close</Button>
        </Modal.Footer>
      </Modal>


      {/* Failure Account Delete */}
      <Modal
        show={showFailure}
        onHide={handleCloseFailure}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Your account could not be deleted at this time. Please try again, later.</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sorry for the inconveinence.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseFailure}>Close</Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default DeleteAccount;