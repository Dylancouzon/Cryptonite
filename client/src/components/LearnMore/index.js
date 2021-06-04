import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import "./style.css";

const title = "Learn More";

const body = (
  <Row>
    <Col md={6}><img src={'https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_960_720.jpg'} className="image" alt='Learn More' /></Col>
    <Col md={6} className="cardBody" id="learnCard"> <h1>{title}</h1>
      <p>Cryptocurrency -- aka crypto -- is a digital currency designed to work as a medium of exchange. It uses cryptography (the practice of securing communication under a third party) to secure and verify transactions, as well as to control the creation of new units of a particular cryptocurrency. The best feature of a cryptocurrency is the fact that it is not controlled by any central authority. The decentralized nature of the  blockchain makes cryptocurrency theoretically immune to the old ways of government control and interference. Cryptocurrencies can be traded between two parties using public and private keys.</p>
    </Col>

  </Row>
);

function LearnMore() {
  if (isMobile) {
    return (
      <Card className="mobileView">
        <Accordion.Toggle as={Card.Header} eventKey="1">
          {title}
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="1">
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

export default LearnMore;