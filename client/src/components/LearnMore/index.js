import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import { isMobile } from 'react-device-detect';

const title = "Learn More";

const body = (
  <Row>
    <Col md={6}><img src={'https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_960_720.jpg'} className="image" alt='Learn More' /></Col>
    <Col md={6} className="cardBody"> <h1>{title}</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
     Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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