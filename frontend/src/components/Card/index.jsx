import React from 'react';
import { Card, Container } from 'react-bootstrap';

const Box = ({
  cardTitle, children,
}) => (
  <Container className="cardContainer">
    <Card>
      <Card.Header>{cardTitle}</Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  </Container>
);

export default Box;
