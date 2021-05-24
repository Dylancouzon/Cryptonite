import React from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';

function BuyForm() {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Amount of Coins:
                        </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextCost">
                    <Form.Label column sm="2">
                        Cost USD:
                        </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextTransFees">
                    <Form.Label column sm="2">
                        Trans Fees:
                        </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="$5.00" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextTotal">
                    <Form.Label column sm="2">
                        Total:
                        </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="$27.50" />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default BuyForm;