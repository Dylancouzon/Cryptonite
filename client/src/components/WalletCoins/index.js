import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import SessionContext from "../../utils/sessionContext";
import API from "../../utils/api";
import "./style.css";

// Passprops to the wallet coins in order to render the amount associated to the public key.


function WalletCoins() {

    const { publicKey, username } = useContext(SessionContext);
    const [coin, setCoin] = useState();
    const [USD, setUSD] = useState();

    useEffect(() => {
        getUserBalance();
    })

    const getUserBalance = () => {
        API.getAddressBalance(publicKey)
            .then(res => {
                setCoin(res.data)
                getUSD();
            })
    }
    const getUSD = () => {
        API.getUSD()
            .then(res => {
                const value = res.data * coin;
                setUSD(value.toFixed(2));
            })
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicKey);
    }
    return (
        <Container>
            <Card body className="walletCoin" style={{ textAlign: 'center' }}>
                <h3>Welcome, {username}!</h3>
                <h3 style={{float: 'left'}}>Coin: {coin}</h3> <h3 style={{float: 'right'}}> USD: ${USD}</h3>
            </Card>
            <Card body className="walletCoin" style={{ textAlign: 'center' }}>
                <Form.Label><h3>Public Key:</h3></Form.Label>
                <InputGroup className="mb-3">
                    <FormControl
                        readOnly
                        value={publicKey}
                    />
                    <InputGroup.Append>
                        <Button onClick={copyToClipboard} variant="outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Card>
        </Container>
    )
}

export default WalletCoins;