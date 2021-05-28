import React, {useContext, useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SessionContext from "../../utils/sessionContext";
import API from "../../utils/api";

// Passprops to the wallet coins in order to render the amount associated to the public key.


function WalletCoins() {

    const { publicKey, username } = useContext(SessionContext);
    const [coin, setCoin] = useState();

    useEffect(() => {
        getUserBalance();
    })

    const getUserBalance = () => {
        API.getAddressBalance(publicKey)
        .then(res => {
            setCoin(res.data)
        })
      }
    return(
        <Container>
            <Card body style={{textAlign: 'center'}}><h3>Welcome, {username} !</h3></Card>
            <Card body style={{textAlign: 'center'}}><h3>Coin: {coin} | USD: $(USD Amount Here)</h3></Card>
            <Card body style={{textAlign: 'center'}}><h3>This is your Public Key: </h3></Card>
            <Card body style={{textAlign: 'center'}}><h3>{publicKey}</h3></Card>
        </Container>
    )
}

export default WalletCoins;