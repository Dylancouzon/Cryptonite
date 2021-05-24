import React from 'react';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';

function SendForm() {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formPlaintextRecipient">
                    <Col style={{marginTop: 5}} md={{ span: 7, offset: 2 }}>
                        <Form.Control type="text" placeholder="Recipient (Public Key)" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPrivate">
                    <Col style={{marginTop: 5}} md={{ span: 7, offset: 2 }}>
                        <Form.Control type="text" placeholder="Private Key"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextLabel">
                    <Col style={{marginTop: 5}} md={{ span: 7, offset: 2 }}>
                        <Form.Control type="text" placeholder="Label" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label style={{marginTop: 5}} column md={4}>
                        Amount of Coins:
                        </Form.Label>
                    <Col style={{marginTop: 5}} md={{ span: 4, offset: 4 }}>
                        <Form.Control type="text" />
                    </Col>
                </Form.Group>
                <Form.Group  as={Row} controlId="formPlaintextCost">
                    <Form.Label style={{marginTop: 5}} column md={4}>
                        Cost USD:
                        </Form.Label>
                    <Col style={{marginTop: 5}} md={{ span: 4, offset: 4 }}>
                        <Form.Control type="text" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextTransFees">
                    <Form.Label style={{marginTop: 5}} column md={4}>
                        Trans Fees:
                        </Form.Label>
                    <Col style={{marginTop: 5}} md={{ span: 4, offset: 4 }}>
                        <Form.Control plaintext readOnly defaultValue="$5.00" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextTotal">
                    <Form.Label style={{marginTop: 5}} column md={4}>
                        Total:
                        </Form.Label>
                    <Col style={{marginTop: 5}} md={{ span: 4, offset: 4 }}>
                        <Form.Control plaintext readOnly defaultValue="$27.50" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col style={{marginTop: 5}} md={{ span: 10, offset: 5 }}>
                        <Button type="submit">Continue</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default SendForm;