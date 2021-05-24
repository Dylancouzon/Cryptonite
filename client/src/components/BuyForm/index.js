import React from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';

function BuyForm() {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column md={4}>
                        Amount of Coins:
                        </Form.Label>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Control type="text" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextCost">
                    <Form.Label column md={4}>
                        Cost USD:
                        </Form.Label>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Control type="text" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextTransFees">
                    <Form.Label column md={4}>
                        Trans Fees:
                        </Form.Label>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Control plaintext readOnly defaultValue="$5.00" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextTotal">
                    <Form.Label column md={4}>
                        Total:
                        </Form.Label>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Control plaintext readOnly defaultValue="$27.50" />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default BuyForm;