import React, { useState, useEffect } from 'react';
import './style.css';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';

const PayInfo = (info) => {
    const stripe = useStripe();
    const elements = useElements();

    // displays payinfo modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        info.data.show = false;
    };
    const handleShow = () => setShow(true);

    // displays successful transaction modal
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => setShowSuccess(false);
    const handleShowSuccess = () => setShowSuccess(true);

    // displays failed transaction modal
    const [showFailed, setShowFailed] = useState(false);
    const handleCloseFailed = () => setShowFailed(false);
    const handleShowFailed = () => setShowFailed(true);

    useEffect(() => {
        if (info.data.show === true) {
            setShow(true);
        } else {
            setShow(false)
        }
    }, [info.data.show]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
        });
        if (!error) {
            const { id } = paymentMethod;
            console.log(paymentMethod);
            console.log(info.data.total*100)
            try {
                const { data } = await axios.post("/api/stripe/charge", { id, amount: info.data.total*100});
                console.log(data);
                handleClose();
                handleShowSuccess();
            } catch (error) {
                handleClose();
                handleShowFailed();
                console.log(error);
            }
        }
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            textAlign: 'center',
            padding: '10px',
            paddingTop: '20px',
            paddingLeft: '10px',
            paddingRight: '10px'
        }}>
            {/* payment modal */}
            <Modal
                show={show}
                backdrop="static"
                onHide={handleClose}
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>Payment Information</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="input-box">
                            <CardNumberElement />
                        </Form.Group>
                        <Form.Group className="input-box">
                            <CardExpiryElement />
                        </Form.Group>
                        <Form.Group className="input-box">
                            <CardCvcElement />
                        </Form.Group>
                        <Button style={{ width: '50%', textAlign: 'center' }} type="submit" disabled={!stripe}> Submit Payment</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* success modal */}
            <Modal
                show={showSuccess}
                onHide={handleCloseSuccess}
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
                            <h4 style={{ color: "green" }}>Success!</h4>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseSuccess()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* fail modal*/}
            <Modal
                show={showFailed}
                onHide={handleShow}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>Error</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Col style={{ marginTop: 5 }} md={{ span: 6, offset: 3 }}>
                            <h4 style={{ color: "red" }}>Transaction Failed</h4>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleCloseFailed();
                        handleShow();
                    }
                    }>
                        Back
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

};

export default PayInfo;