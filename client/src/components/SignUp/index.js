import React from 'react';
import { Form, Button } from "react-bootstrap";

function SignUpForm() {
    return (
        <>
            <div className="sidebar-header">
                <h3>Sign-up</h3>
            </div>
            <Form>
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
                <Button type="submit">Sign-Up</Button>
            </Form>

            <div>
                <h3>--- Or ---</h3>
            </div>
            {/* Need to add a type for button */}
            <Button>Sign-up with Google</Button>
        </>
    )
}

export default SignUpForm;