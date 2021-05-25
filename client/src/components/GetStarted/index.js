import React from "react";
import { Accordion, Card, Row, Col, Button } from "react-bootstrap";
import { isMobile } from 'react-device-detect';


const title = "Get Started";

const body = (
  <Row>
    <Col md={7} className="cardBody"> <h1>{title}</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
     Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <Button variant="dark">Sign Up !</Button>
    </Col>
    <Col md={5}><img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg'} className="image" alt='Started' /></Col>
  </Row>
);

function GetStarted() {

  if (isMobile) {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          {title}
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="2">
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

export default GetStarted;