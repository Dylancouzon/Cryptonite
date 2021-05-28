import React from 'react';
import { Form, Button } from "react-bootstrap";
import API from "../../utils/api";
// import SessionContext from "../../utils/sessionContext";

class SignUpForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();


        const submitData = {
            username: e.target[0].value,
            password: e.target[1].value,
        }
        API.logIn(submitData)
        // .then((req, res) => {
        //     var username = req.session.username;
        //     var publicKey = req.session.publicKey;
            // this.setSession({username, publicKey});
        // })
        
    }

    render() {
        return (
            <>
                <div className="sidebar-header">
                    <h3>Login</h3>
                </div>

                <Form onSubmit={(e) => this.handleSubmit(e)}>
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
            </>
        )
    }
}

export default SignUpForm;