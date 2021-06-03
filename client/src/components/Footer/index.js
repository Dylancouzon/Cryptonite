import React from 'react';
import { Card, } from 'react-bootstrap';
import './style.css';

function Footer() {
    return (
        <div>
            <Card id="footer"
            className="text-center" bg="dark" text="white">
                <Card.Body>
                    <Card.Text>
                        Coin Name created by : 
                        <a href="https://github.com/cheng21tang" target="blank"> Cheng Tang </a> | 
                        <a href="https://github.com/Dylancouzon" target="blank"> Dylan Couzon </a> |
                        <a href="https://github.com/dnovelli1" target="blank"> Jake Novelli</a> |
                        <a href= "https://github.com/LiamStewart8" target="blank"> Liam Stewart</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Footer;