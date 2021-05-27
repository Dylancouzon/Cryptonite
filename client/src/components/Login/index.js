import React from 'react';
import { Form, Button } from "react-bootstrap";

function LoginForm() {
    return(
        <div style={{ padding: "0 100px"}}>
            <div className="sidebar-header">
                <h3>Login</h3>
            </div>

            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control type="text" placeholder="Enter username or email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Pasword" />
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>

            <div>
                <h3>--- Or ---</h3>
            </div>
            {/* Need to add a type for button */}
            <Button>Sign-up with Google</Button>
        </div>
    )
}

export default LoginForm;