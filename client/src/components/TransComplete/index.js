import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

// Use state on the page using the modal, then pass the props generated to the component here.
// Styling not complete.
// Find animations for success.

function TransComplete({showState}) {
    const [show, setShow] = useState(showState || false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            {!showState &&
            <Button variant="primary" onClick={handleShow}>
                Continue
            </Button>
            }
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>Transaction Complete</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                    <Col style={{ marginTop: 5 }} md={{ span: 3, offset: 4 }}>
                    <h4 style={{color: "green"}}>Success!</h4>
                    </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Back
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TransComplete;