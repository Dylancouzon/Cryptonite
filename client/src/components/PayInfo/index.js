import React from 'react';
import './style.css';
import { Form, Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';



const PayInfo = () => {
    // const stripe = useStripe();
    // const elements = useElements();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement),
    //     });
    // };
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    return (
        <div style={{ 
            border: '1px solid #ccc',
            textAlign: 'center',
            padding: '10px',
            paddingTop: '20px',
            paddingLeft: '10px',
            paddingRight: '10px'
            }}>
            <Elements stripe={stripePromise}>
                <Form>
                    {/* <Form.Group style={{
                            padding: '10px',
                            border: '1px solid #ccc'
                        }}>
                        <Form.Control type="text" placeholder="Name"/>
                    </Form.Group> */}
                    <Form.Group className="input-box">
                        <CardNumberElement />
                    </Form.Group>
                    <Form.Group className="input-box">
                        <CardExpiryElement />
                    </Form.Group>
                    <Form.Group className="input-box">
                        <CardCvcElement />
                    </Form.Group>
                    <Button variant="primary" style={{ width: '50%' }}type="submit"> Submit Payment</Button>
                </Form>
            </Elements>
        </div>
    );
};

export default PayInfo;