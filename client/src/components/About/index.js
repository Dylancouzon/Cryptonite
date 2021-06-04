import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import "./style.css";


const title = "About";

const body = (
  <Row>
    <Col md={8} className="cardBody"> <h1>{title}</h1>
      <p>Welcome to Cryptonite!</p>
      <p>As developers we present to you the newest Cryptocurrency! With cryptocurrency the transactions are fast, digital, secure and worldwide, which in essence allow the maintenance of records without risk of data being pirated. Fraud is, actually, minimized. Want to learn more? See the "Learn More" section below. Ready to get started? Click Sign Up!</p>
    </Col>
    <Col md={4}><img src={'./assets/images/coin.jpeg'} style={{width: 400, height: 275}}className="image round" alt='Coin' /></Col>
  </Row>
);

function About() {

  if (isMobile) {
    return (
      <Card className="aboutCard">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          {title}
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {body}
          </Card.Body>

        </Accordion.Collapse>

      </Card>
    )
  } else {
    return (
      <Card className="desktopCard">
        <Card.Body>
          {body}
        </Card.Body>
      </Card>
    )
  }
}

export default About;