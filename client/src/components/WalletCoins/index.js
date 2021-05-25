import React from 'react';
import { Container, Card } from 'react-bootstrap';

// Passprops to the wallet coins in order to render the amount associated to the public key.

function WalletCoins() {
    return(
        <Container>
            <Card body style={{textAlign: 'center'}}><h3>Coin: (Coin Amount Here) | USD: $(USD Amount Here)</h3></Card>
        </Container>
    )
}

export default WalletCoins;