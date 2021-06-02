import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Col, Row, Container, Button, Card, Alert } from 'react-bootstrap';
import SessionContext from "../../utils/sessionContext";
import API from "../../utils/api";


function SendForm() {
    const formHandle = useRef();
    const cost = useRef(0);
    const { publicKey } = useContext(SessionContext);
    const [coinVal, setCoinVal] = useState(0);
    const [coinAmount, setCoinAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [usdVal, setUSDVal] = useState(0);
    const [usdAmount, setUSDAmount] = useState(0);
    const [fees, setFees] = useState(0);
    const [total, setTotal] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState("");
    const [showAlertVariant, setShowAlertVariant] = useState("danger");

    useEffect(() => {
        API.getUSD()
            .then(res => {
                setCoinVal(res.data);
                const div = 1 / res.data;
                setUSDVal(div);
            })
    })

    const handleAlertMessage = (message, variant) => {
        if (message) {
            setShowAlert(true);
            setShowAlertMessage(message);
            setShowAlertVariant(variant);
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlertMessage("");
    }
    //Input is coins
    const getValue = (amount) => {
        const value = amount * coinVal;
        const fee = amount / 100;

        setUSDAmount(value.toFixed(2));
        setFees(fee);
        const total = parseInt(amount) + parseInt(fee);
        setTotal(total);
    }

    //Input is USD
    const getUSD = (usd) => {
        const value = usd * usdVal;
        setCoinAmount(value);
        const fee = value / 100;
        setFees(fee);
        const total = parseInt(value) + parseInt(fee);
        setTotal(total);
    }

    const toggleListener = (boolean, val = 0) => {
        if (boolean) {
            setToggle(true)
            getValue(val);
        } else {
            setToggle(false)
            getUSD(val);
        }
    }


    const submitForm = (e) => {
        e.preventDefault();
        const data = [...formHandle.current].reduce((obj, input) => {
            obj[input.getAttribute('id')] = input.value
            return obj;
        }, {})
        data.from = publicKey;
        console.log(data);
        console.log(Object.values(data).reduce((a, c) => a && !!c, true));
        if (!Object.values(data).reduce((result, value) => result && !!value, true)) {
            handleAlertMessage("Fill out the entire form", "danger");
            return;
        }
        console.log(formHandle.current);
        console.log(formHandle.current[0].value);
        API.sendTransaction(data)
            .then(res => {
                handleAlertMessage("Transaction successful.", "success");
            }).catch(err =>{
                handleAlertMessage(err.response.data.message, "danger");
            });
    }

    return (
        <Container >
            <Card style={{padding: 50}}>
                <Alert
                    show={showAlert}
                    variant={showAlertVariant}
                    onClose={() => { handleCloseAlert() }}
                >
                    <p>{showAlertMessage}</p>
                </Alert>
                <h2>Send Coins</h2>
                <Form ref={formHandle}>
                    <Form.Group as={Row} controlId="to">
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
                            <Form.Control type="text" placeholder="Label"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="amount">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Amount of Coins:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            {toggle
                                ? <Form.Control ref={cost} type="text" onChange={(e) => getValue(e.target.value)} />
                                : <Form.Control ref={cost} type="text" onFocus={(e) => toggleListener(true, e.target.value)} value={coinAmount} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="cost">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Cost USD:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            {toggle
                                ? <Form.Control type="text" onFocus={(e) => toggleListener(false, e.target.value)} value={usdAmount} />
                                : <Form.Control type="text" onChange={(e) => getUSD(e.target.value)} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTransFees">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Trans Fees 1%:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control plaintext readOnly value={fees} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Total(coins):
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control plaintext readOnly value={(total)} />
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