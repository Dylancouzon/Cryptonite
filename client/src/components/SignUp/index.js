import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert'
import API from "../../utils/api";
import { googleLoginUrl, privateKey } from '../../utils/googleOauth';
import "./style.css";



function SignUpForm() {
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState(false);
    const [private_key, setPrivate] = useState("");

    // Alert states and functions
    const [showCopyAlert, setCopyAlert] = useState(false);
    const [showCopyAlertMessage, setShowCopyAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState("");
    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlertMessage("");
    }

    const handleCopyClose = () => {
        setCopyAlert(false);
    }


    const handleAlertMessage = (message) => {
        if (message) {
            setShowAlert(true);
            setShowAlertMessage(message);
        }
    }
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        if (privateKey) {

            setPrivate(privateKey);
            handleShow();
        }
    }, []);



    const handleClose = () => {
        if (copied === true) {
            setShow(false);
            document.location.replace("/profile");
            setPrivate("");
        } else {
            setCopyAlert(true);
            setShowCopyAlertMessage("Please Copy your key!");
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(private_key);
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
                if (res.status === 200) {
                    setPrivate(res.data.message);
                    handleShow();
                };
            })
            .catch((err) => {
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
                onClose={() => { handleCloseAlert() }}
            >
                <p>{showAlertMessage}</p>
            </Alert>

            <div className="sidebar-header" style={{ marginTop: 20, marginBottom: 30, color: "whitesmoke" }}>
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
                <Button
                    type="submit"
                    value="Submit"
                    className="sidebutton"
                    block
                    variant="outline-light"
                >Sign-Up
                </Button>
            </Form>

            <div>
                <h3>--- Or ---</h3>
            </div>

            {/* Need to add a type for button */}
            <Button
                href={googleLoginUrl}
                type="submit"
                value="Submit"
                className="sidebutton"
                block
                variant="outline-light"
            >Sign-Up with Google
                </Button>


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
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Please keep your private key safe. This is the only time we will be showing your private key.</h5>
                    <Form.Group controlId="formPlaintextTotal">
                        <Form.Label><p id="privateKey">Private Key:</p></Form.Label>
                        <InputGroup>
                            <Form.Control className="something" readOnly value={private_key} />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={copyToClipboard}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Alert 
                        variant="warning"
                        dismissible="true"
                        onClose={handleCopyClose}
                        show={showCopyAlert}
                        >
                        <p>{showCopyAlertMessage}</p>
                        </Alert>
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