import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import "./style.css";

const title = "Learn More";

const body = (
  <Row>
    <Col md={6}><img src={'https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_960_720.jpg'} className="image" alt='Learn More' /></Col>
    <Col md={6} className="cardBody" id="learnCard"> <h1>{title}</h1>
      <p>Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible (a house, car, cash, land) or intangible (intellectual property, patents, copyrights, branding). Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved.</p>
    </Col>

  </Row>
);

function LearnMore() {
  if (isMobile) {
    return (
      <Card>
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