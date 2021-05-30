import React, { useContext, useRef } from 'react';
import { Form, Col, Row, Container, Button, Card } from 'react-bootstrap';
import SessionContext from "../../utils/sessionContext";
import API from "../../utils/api";


function SendForm() {
    const formHandle = useRef();
    const { publicKey } = useContext(SessionContext);

    const submitForm = (e) => {
        e.preventDefault();
        const data = [...formHandle.current].reduce((obj, input) => {
            obj[input.getAttribute('id')] = input.value
            return obj;
        }, {})
        data.fromAddress = publicKey;
        console.log(data);
        console.log(Object.values(data).reduce((a, c) => a && !!c, true));
        if (!Object.values(data).reduce((result, value) => result && !!value, true)) {
            alert("Fill out the entire form");
            return;
        }
        console.log(formHandle.current);
        console.log(formHandle.current[0].value);
        API.sendTransaction(data)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <Container>
            <Card>
                <Form ref={formHandle}>
                    <Form.Group as={Row} controlId="toAddress">
                        <Col style={{ marginTop: 5 }} md={{ span: 7, offset: 2 }}>
                            <Form.Control type="text" placeholder="Recipient (Public Key)" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="private">
                        <Col style={{ marginTop: 5 }} md={{ span: 7, offset: 2 }}>
                            <Form.Control type="text" placeholder="Private Key" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="label">
                        <Col style={{ marginTop: 5 }} md={{ span: 7, offset: 2 }}>
                            <Form.Control type="text" placeholder="Label" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="amount">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Amount of Coins:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="cost">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Cost USD:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTransFees">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Trans Fees:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control plaintext readOnly defaultValue="5.00" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Total:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control plaintext readOnly defaultValue="27.50" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col style={{ marginTop: 5 }} md={{ span: 10, offset: 5 }}>
                        </Col>
                    </Form.Group>
                </Form>
                <Button type="button" onClick={submitForm}>Continue</Button>
            </Card>
        </Container>
    )
}

export default SendForm;