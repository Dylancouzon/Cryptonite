import React, { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import API from "../../utils/api";
import SessionContext from "../../utils/sessionContext";
import { googleLoginUrl } from '../../utils/googleOauth';

function SignUpForm() {
    const { setSession } = useContext(SessionContext);

    // Alert states and functions
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState("");
    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlertMessage("");
    }
    const handleAlertMessage = (message) => {
        if(message) {
            setShowAlert(true);
            setShowAlertMessage(message);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const submitData = {
            username: e.target[0].value,
            password: e.target[1].value,
        }
        API.logIn(submitData)
        .then((res) => {
            console.log(res) //use to debug
            var username = res.data.user[0].username; 
            var publicKey = res.data.user[0].public_key;
            var logged_in = true;
            setSession({username, publicKey, logged_in});
            document.location.replace("/");
        })
        .catch((err) => {
            console.log(err.response)
            // console.log(err.response.data.message); //use to debug
            switch(err.response.data.message) {
                case "Server Error, Please try Again.":
                    handleAlertMessage("Oops something went wrong. Please try again later.");
                    break;
                default:
                    handleAlertMessage("Please check your username or password");
            }
        });
    }


        return (
            <>
                <Alert
                    show={showAlert}
                    variant="warning"
                    dismissible="true"
                    onClose={() => {handleCloseAlert()}}
                >
                    <p>{showAlertMessage}</p>
                </Alert>

                <div className="sidebar-header" style={{ marginTop: 20, marginBottom: 30, color: "whitesmoke" }}>
                    <h3>Login</h3>
                </div>

                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control type="text" placeholder="Enter username or email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Pasword" />
                    </Form.Group>
                    <Button 
                        type="submit"
                        className="sidebutton"
                        block
                        variant="outline-light"
                    >Login
                    </Button>
                </Form>

                <div>
                    <h3>--- Or ---</h3>
                </div>
                
                {/* Need to add a type for button */}
                <Button
                href={googleLoginUrl}
                type="submit"
                value="Submit"
                className="sidebutton"
                block
                variant="outline-light"
            >Login with Google
                </Button>
            </>
        )
}

export default SignUpForm;