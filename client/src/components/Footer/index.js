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
                        Cryptonite created by : 
                        <a href="https://github.com/cheng21tang" target="_blank" rel="noreferrer"> Cheng Tang </a> | 
                        <a href="https://github.com/Dylancouzon" target="_blank" rel="noreferrer"> Dylan Couzon </a> |
                        <a href="https://github.com/dnovelli1" target="_blank" rel="noreferrer"> Jake Novelli</a> |
                        <a href= "https://github.com/LiamStewart8" target="_blank" rel="noreferrer"> Liam Stewart</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Footer;