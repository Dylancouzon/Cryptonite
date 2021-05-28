import React from "react";
import { Container, Card, Button } from "react-bootstrap";


function BuySendBtn() {
    return (
        <Container>
            <Card body style={{textAlign: 'center'}}>
                <Button style={{margin: 10}} href="/buy">Buy</Button>
                <Button style={{margin: 10}} href="/send">Send</Button>
            </Card>
        </Container>
    )
}

export default BuySendBtn;