import React, { useState, useEffect, useRef } from 'react';
import PayInfo from '../PayInfo';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import API from "../../utils/api";

function BuyForm() {
    const cost = useRef(0);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [coinVal, setCoinVal] = useState(0);
    const [coinAmount, setCoinAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [usdVal, setUSDVal] = useState(0);
    const [usdAmount, setUSDAmount] = useState(0);
    const [fees, setFees] = useState(0);
    const [total, setTotal] = useState(0);
    const [invalid, setInvalid] = useState({});
    const [invalid2, setInvalid2] = useState({});
    const [hideButton, setHide] = useState(false);

    useEffect(() => {
        API.getUSD()
            .then(res => {
                setCoinVal(res.data);
                const div = 1 / res.data;
                setUSDVal(div);
            })
    })
    //Input is coins
    const getValue = (amount) => {
        if (isNaN(amount)) {
            setInvalid2({ isInvalid: "isInvalid" })
            setHide(true);
        } else {
            setHide(false);
            const value = amount * coinVal;

            setUSDAmount(value.toFixed(2));


            const fee = value / 100;
            setFees(fee.toFixed(2));
            const total = parseFloat(value) + parseFloat(fee);
            setTotal(total.toFixed(2));
        }
    }

    //Input is USD
    const getUSD = (usd) => {

        if (isNaN(usd)) {
            setInvalid({ isInvalid: "isInvalid" })
            setHide(true);
        } else {
            setHide(false);
            setInvalid({})
            const value = usd * usdVal;
            setCoinAmount(value);

            const fee = usd / 100;
            setFees(fee.toFixed(2));
            const total = parseFloat(usd) + parseFloat(fee);
            setTotal(total.toFixed(2));
        }



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

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setData({ total: e.target[3].value, coins: e.target[0].value, show: true })
        setShow(true);
    }

    return (
        <>
            <Card style={{
                backgroundColor: 'gainsboro',
                color: 'rgb(53, 53, 53)',
                width: '100%',
                paddingTop: '45px',
                paddingLeft: '55px',
                paddingRight: '55px',
                alignContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '20px',
            }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Amount of Coins:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            {toggle
                                ? <Form.Control ref={cost} type="text" onChange={(e) => getValue(e.target.value)} {...invalid2}/>
                                : <Form.Control ref={cost} type="text" onFocus={(e) => toggleListener(true, e.target.value)} value={coinAmount} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextCost">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Cost USD:
                    </Form.Label>

                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            {toggle
                                ? <Form.Control type="text" onFocus={(e) => toggleListener(false, e.target.value)} value={usdAmount} />
                                : <Form.Control type="text" onChange={(e) => getUSD(e.target.value)} {...invalid} />
                            }
                        </Col>
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTransFees">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Trans Fees (1% USD):
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control readOnly value={fees} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Total (USD):
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control type="number" readOnly value={(total)} />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{ marginTop: 5 }} as={Row}>
                        <Col style={{ marginTop: 5 }} md={{ span: 10, offset: 5 }}>
                            {hideButton ? null : <Button type="submit" onClick={() => setShow(true)}>Continue</Button>}
                        </Col>
                    </Form.Group>
                </Form>
            </Card>
            <PayInfo data={data} />
        </>

    )
}

export default BuyForm;