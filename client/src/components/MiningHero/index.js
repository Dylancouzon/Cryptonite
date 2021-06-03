import React, { useState, useRef } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import API from "../../utils/api";
import "./style.css";

function MiningHero() {
const [timer, setTimer] = useState(0)
const [isActive, setIsActive] = useState(false)
const countRef = useRef(null)
const [show, setShow] = useState(false);
const [showFail, setShowFail] = useState(false);

    const handleClose = () => setShow(false);
    const handleCloseFail = () => setShowFail(false);

    const handleStart = () => {
        setIsActive(true);
        countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
        }, 1000)
        API.startMining()
        .then(res => {
            clearInterval(countRef.current);
            setIsActive(false);
            setShow(true);
            setTimer(0);
            console.log(res.data);
        })
    }
    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
    
        return `${getMinutes} : ${getSeconds}`
    }
    
    return (
        <>
            {/* Need to change size of image/card */}
            <Card.Img variant="" src='./assets/MiningGif.gif' />
            <Card className="text-center">
                <Card.Body>
                    <Card.Text>
                        Information about mining: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Etiam non quam lacus suspendisse. Facilisis magna etiam tempor orci eu. Id porta nibh venenatis cras sed felis eget velit. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. 
                        Tristique magna sit amet purus. Etiam dignissim diam quis enim lobortis. 
                        Cursus vitae congue mauris rhoncus. Aenean pharetra magna ac placerat. Scelerisque purus semper eget duis at.
                    </Card.Text>
                    {!isActive ? (<Button variant="dark" style={{width: '25%'}} onClick={() => handleStart()}>Start Mining</Button>) : <p>{formatTime()}</p>}
                </Card.Body>
            </Card>
            {/* Successfully Mined modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>Mining Success!</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="mineIcon">⛏️</h3>
                    <p>Your mining reward of <strong>100 Cryptocoins</strong> was added to the pending transactions and will be awarded when it is mined.</p>
                    <p>Thanks for mining!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Failed Mined modal */}
            <Modal
                show={showFail}
                onHide={handleCloseFail}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>Mining unsuccessful!</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="mineIcon">⛏️</h3>
                    <p>Someone else mined the transaction.</p>
                    <p>Thanks for mining. Please, try again!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseFail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}


export default MiningHero;