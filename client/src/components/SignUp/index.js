import React, { useState } from 'react';
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import API from "../../utils/api";

// STILL NEEDS STYLING


function SignUpForm() {
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState(false);
    const [private_key, setPrivate] = useState("");

    const handleShow = () => setShow(true);

    const handleClose = () => {
        if(copied === true) {
            setShow(false);
            document.location.replace("/profile");
        } else {
            alert("Please copy your Private Key");
        }
    }
    
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.value);
        setCopied(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = {
            username: e.target[1].value,
            password: e.target[2].value,
            confirm_password: e.target[3].value,
            email: e.target[0].value,
            public_key: "123456788999"
        }
        API.signUp(submitData)
            .then((res) => {
                console.log(res.data.message);
                console.log(res.status);
                if(res.status === 200) {
                    setPrivate(res.data.message);
                    handleShow();
                };
            })
            .catch((err) => {
                //Error message, need to be put in an <Alert />
                alert(err.response.data.message);
            });

    }

        return (
            <>
                <div className="sidebar-header">
                    <h3>Sign-up</h3>
                </div>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Pasword" />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirm">
                        <Form.Control type="password" placeholder="Confirm password" />
                    </Form.Group>
                    <Button type="submit" value="Submit">Sign-Up</Button>
                </Form>

                <div>
                    <h3>--- Or ---</h3>
                </div>
                {/* Need to add a type for button */}
                <Button>Sign-up with Google</Button>

                <Modal
                copied={copied}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>Thank you for Signing Up!</h3>
                        <h3 style={{ color: 'red' }}>WE WILL ONLY SHOW THIS ONCE</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Private Key:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 5, offset: 4 }}>
                            <Button variant="primary" onClick={copyToClipboard}>
                            <Form.Control plaintext readOnly value={private_key} />
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
            </>
        )

}

export default SignUpForm;