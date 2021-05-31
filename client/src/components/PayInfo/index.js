import React from 'react';
import './style.css';
import { Form, Button } from 'react-bootstrap';
import TransComplete from '../TransComplete';
import axios from 'axios';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';

const PayInfo = ({success}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = React.useState("ready");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
        });
        if (!error) {
            const { id } = paymentMethod;
            console.log(paymentMethod);
            try {
                const { data } = await axios.post("/api/stripe/charge", { id, amount: 1000});
                console.log(data);
                success();
            }   catch (error) {
                console.log("hello---------------->")
                console.log(error.response);
            }
        }
    };
    


    if (status === "success") {
        console.log(status);
        return (
            <div>Transaction complete</div>
        )
    }


    return (
        <div style={{ 
            border: '1px solid #ccc',
            textAlign: 'center',
            padding: '10px',
            paddingTop: '20px',
            paddingLeft: '10px',
            paddingRight: '10px'
            }}>
                <Form success={() => {setStatus("success")}} onSubmit={handleSubmit} >
                    <Form.Group className="input-box">
                        <CardNumberElement />
                    </Form.Group>
                    <Form.Group className="input-box">
                        <CardExpiryElement />
                    </Form.Group>
                    <Form.Group className="input-box">
                        <CardCvcElement />
                    </Form.Group>
                    <Button variant="primary" style={{ width: '50%' }} type="submit" disabled={!stripe}> Submit Payment</Button>
                </Form>
        </div>
    );
    
};

export default PayInfo;