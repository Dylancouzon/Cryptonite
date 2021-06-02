import React, { useState } from 'react';
import { Form, Button, Modal, Col, Row } from "react-bootstrap";

import Alert from 'react-bootstrap/Alert'
import API from "../../utils/api";

// STILL NEEDS STYLING


function SignUpForm() {
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState(false);
    const [private_key, setPrivate] = useState("");

    // Alert states and functions
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState("");
    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlertMessage("");
    }
    const handleAlertMessage = (message) => {
        if(message) {
            setShowAlert(true);
            setShowAlertMessage(message);
        }
    }

    const handleShow = () => setShow(true);

    const handleClose = () => {
        if (copied === true) {
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
                // console.log(res);
                if (res.status === 200) {
                    setPrivate(res.data.message);
                    handleShow();
                };
            })
            .catch((err) => {
                // console.log(err.response);
                switch (err.response.data.message) {
                    case "Your Username should be at least 6 characters.":
                        handleAlertMessage(err.response.data.message);
                        break;
                    case "Your Password should be at least 6 characters.":
                        handleAlertMessage(err.response.data.message);
                        break;
                    case "Your password does not match.":
                        handleAlertMessage(err.response.data.message);
                        break;
                    case "Email already in use.":
                        handleAlertMessage(err.response.data.message);
                        break;
                    case "Username already in use.":
                        handleAlertMessage(err.response.data.message);
                        break;
                    // edge case server error
                    case "MongoDB error":
                        handleAlertMessage("Oops something went wrong. Please try again later.");
                        break;
                    default:
                        handleAlertMessage("Please try, again!");
                }
            });
    }

    return (
        <>
            <Alert 
                show={showAlert}
                variant="warning"
                dismissible="true"
                onClose={() => {handleCloseAlert()}}
            >
                <p>{showAlertMessage}</p>
            </Alert>
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