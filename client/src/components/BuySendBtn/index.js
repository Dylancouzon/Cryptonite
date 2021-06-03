import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./style.css";


function BuySendBtn() {
    return (
        <Container>
            <Card body style={{textAlign: 'center', backgroundColor: '#D9D9D9', color: '#353535'}}>
                <Button className="profBut" style={{margin: 10}} href="/buy">Buy</Button>
                <Button className="profBut" style={{margin: 10}} href="/send">Send</Button>
                <Button className="profBut" style={{margin: 10}} href="/mining">Mine</Button>
            </Card>
        </Container>
    )
}

export default BuySendBtn;