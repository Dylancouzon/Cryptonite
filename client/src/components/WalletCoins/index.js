import React, { useContext, useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SessionContext from "../../utils/sessionContext";
import API from "../../utils/api";

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
    return (
        <Container>
            <Card body style={{ textAlign: 'center' }}><h3>Welcome, {username} !</h3></Card>
            <Card body style={{ textAlign: 'center' }}><h3>Coin: {coin} | USD: ${USD}</h3></Card>
            <Card body style={{ textAlign: 'center' }}><h3>This is your Public Key: </h3></Card>
            <Card body style={{ textAlign: 'center' }}><h3>{publicKey}</h3></Card>
        </Container>
    )
}

export default WalletCoins;