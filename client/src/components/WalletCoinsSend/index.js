import React, { useContext, useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SessionContext from "../../utils/sessionContext";
import API from "../../utils/api";
import "./style.css";

// Passprops to the wallet coins in order to render the amount associated to the public key.


function WalletCoinsUser() {

    const { publicKey } = useContext(SessionContext);
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
            <Card className="walletCard" body style={{ textAlign: 'center' }}>
                <h2>Send Coins</h2>
                <h3 style={{float: 'left'}}>Coin: {coin} </h3>
                <h3 style={{float: 'right'}}>USD: ${USD}</h3>
            </Card>
        </Container>
    )
}

export default WalletCoinsUser;