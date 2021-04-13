import React from 'react';
import { Card } from 'react-bootstrap';

const Box = ({
  cardTitle, children,
}) => (
  <Card>
    <Card.Header>{cardTitle}</Card.Header>
    <Card.Body>
      {children}
    </Card.Body>
  </Card>
);

export default Box;
