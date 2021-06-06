import React, { useState, useRef } from 'react';
import { Card, Button, Modal, Container } from 'react-bootstrap';
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
        }).catch(()=>{
            clearInterval(countRef.current);
            setIsActive(false);
            setShowFail(true);
            setTimer(0);
        });
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
                <Card.Body className="justify-content-center">
                    <Card.Text>
                    Mining is gaining cryptocurrencies by solving cryptographic equations through the use of computers. This process involves validating data blocks and adding transaction records to a public record (ledger) known as a blockchain. Your machine will automatically attempt to solve the equation, if correct, the reward is yours. To start, click the Start Mine button below.
                    </Card.Text>
                    {!isActive 
                    ? (<Button variant="dark" style={{width: '25%'}} onClick={() => handleStart()}>Start Mining</Button>) 
                    : <Container className="timerWrap">
                        <p className="timer">{formatTime()}</p>
                      </Container>}
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
                    <strong><h3>Sucess!</h3></strong>
                    <p>A mining reward of <strong>100 Cryptocoins</strong> was credited to your account.</p>
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