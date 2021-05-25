import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import { isMobile } from 'react-device-detect';


const title = "About";

const body = (
  <Row>
    <Col md={8} className="cardBody"> <h1>{title}</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
     Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </Col>
    <Col md={4}><img src={'./assets/images/coin.jpeg'} className="image round" alt='Coin' /></Col>
  </Row>
);

function About() {

  if (isMobile) {
    return (
      <Card>
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