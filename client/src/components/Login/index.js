import React, { useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import API from "../../utils/api";
import SessionContext from "../../utils/sessionContext";

function SignUpForm() {

    const { setSession } = useContext(SessionContext);
    function handleSubmit(e) {
        e.preventDefault();

        const submitData = {
            username: e.target[0].value,
            password: e.target[1].value,
        }
        API.logIn(submitData)
        .then((res) => {
            var username = req.data.user[0].username;
             var publicKey = req.data.user[0].public_key;
             var logged_in = true;
             setSession({username, publicKey, logged_in});
            console.log(res);
        })
        .catch((err) => {
            // Error message, needs to be put inside an <Alert />
            console.log(err.response.data.message);
        });
    }


        return (
            <>
                <div className="sidebar-header">
                    <h3>Login</h3>
                </div>

                <Form onSubmit={(e) => handleSubmit(e)}>
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

export default SignUpForm;