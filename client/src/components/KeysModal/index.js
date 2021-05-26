import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

// Testing Purposes Only! We will need to include the change of state on the Page we are using this modal.
// Needs to still have a Copy To Clipboard Button for the READONLY TEXT


function KeysModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.value);
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Continue
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>Your Keys</h3>
                        <h3 style={{ color: 'red' }}>WE WILL ONLY SHOW THIS ONCE</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Public Key:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 5, offset: 4 }}>
                            <Form.Control plaintext readOnly defaultValue="0fds2134012#@!#10156" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Private Key:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 5, offset: 4 }}>
                            <Button variant="primary" onClick={copyToClipboard}>
                            <Form.Control plaintext readOnly defaultValue="0fds" />
                            </Button>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default KeysModal;